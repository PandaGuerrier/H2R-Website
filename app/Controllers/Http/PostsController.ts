import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
    public async index({ view }: HttpContextContract) {
        const posts = await Post.query()

        return view.render('dashboards/admin/posts/index', {
            posts: posts
        })
    }

    public async create({ request, response, session }: HttpContextContract) {
        const data = await request.validate(PostValidator)

        await Post.create(data)

        session.flash({
            success: "Ce post a bien été enregistré !"
        })

        return response.redirect().back()
    }

    public async destroy({ params, response }: HttpContextContract) {
        const post = await Post.find(params.id)
        
        await post?.delete()
        return response.redirect().back()
    }
} 
