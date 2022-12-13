import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {rules, schema} from '@ioc:Adonis/Core/Validator'
import AuthValidator from 'App/Validators/AuthValidator'
export default class AuthController {

    public async modify({request, response, params}: HttpContextContract) {
        const user = await User.find(params.id)

        const permissions = request.input('permissions').split(', ')

        const data = await request.validate(AuthValidator)

        if(permissions.length > 0) {
            await user?.related('permissions').attach(permissions)
        }
        
        await user?.merge({
            ...data            
        }).save()

        return response.redirect('back')
    }

    public async modifyView({params, view}: HttpContextContract) {
        const user = await User.find(params.id)

        if (!user) return view.render('errors/404')

        return view.render('admin/user/modify', {
            user: user,
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const user = await User.find(params.id)

        if (!user) return response.send({
            status: 400,
            message: "Utilisateur inconnu"
        })

        await user?.delete()

        return response.redirect('back')
    }

    public async admin({view}: HttpContextContract) {
        const users = await User.query().orderBy('id', 'asc')

        return view.render('admin/user', {
            users: users,
            length: users.length,
        })
    }

    public async registerView({view}: HttpContextContract) {
        return view.render('auth/register')
    }

    public async register({request, response, auth, session}: HttpContextContract) {

        if(request.input('password') !== request.input('password_confirmation')) {
            session.flash('errors.password_confirmation', 'Les mots de passe ne correspondent pas')
            return response.redirect('back')
        }

        const validations = await schema.create({
            email: schema.string({}, [rules.email(), rules.unique({table: 'users', column: 'email'})]),
            password: schema.string({}, [rules.confirmed()]),
            username: schema.string({}, [rules.unique({table: 'users', column: 'username'}), rules.maxLength(16)]),
        })

        const data = await request.validate({
            schema: validations,
            messages: {
                required: 'Le champs {{ field }} est requis pour créer un compte',
                'email.email': 'Veuillez entrer une adresse email valide',
                'email.unique': 'Cette adresse email est déjà utilisée',
                'password.confirmed': 'Les mots de passe ne correspondent pas',
                'password_confirmation': 'Les mots de passe ne correspondent pas',
                'password': 'Le mot de passe doit contenir au moins 6 caractères',
                'username.unique': 'Ce nom d\'utilisateur est déjà utilisé',
                'username.maxLength': 'Le nom d\'utilisateur ne doit pas dépasser 16 caractères',
                'success': 'Votre compte a été créé avec succès',
            }
        })

        const user = await User.create(data)

        await auth.use('web').login(user)

        return response.redirect('back')
    }

    public async loginView({view}: HttpContextContract) {
        return view.render('auth/login')
    }

    public async login({request, response, auth, session}: HttpContextContract) {

        const email = request.input('email')
        const password = request.input('password')

        try {
            await auth.use('web').attempt(email, password)

            return response.redirect('/')
        } catch (error) {
            session.flash('notification', 'Email ou mot de passe incorrect')

            return response.redirect('back')
        }
    }

    public async logout({auth, response}: HttpContextContract) {
        await auth.logout()
        return response.redirect('/')
    }
}
