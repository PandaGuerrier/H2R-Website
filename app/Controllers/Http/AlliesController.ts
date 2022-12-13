import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import * as crypto from 'crypto'

export default class AlliesController {
    public async discord({ auth, ally, response }: HttpContextContract) {
        const discord = ally.use('discord')

        const discordUser = await discord.user()
        if(!discordUser.email) {
            return response.send('Invalid email provided')
        }

        const user = await User.query().where('email', discordUser.email).first()
        if(!user) {
            const password = crypto.randomBytes(32).toString("hex");
            const userCreated = await User.create({
                username: discordUser.nickName,
                email: discordUser.email,
                password: password
            })

            await auth.use('web').login(userCreated)
            return response.redirect('/')
        } else {
            await auth.use('web').login(user)
            return response.redirect('/')
        }
    }

    public async github({ auth, ally, response }: HttpContextContract) {
        const github = ally.use('github')

        const githubUser = await github.user()
        if(!githubUser.email) {
            return response.send('Invalid email provided')
        }

        const user = await User.query().where('email', githubUser.email).first()
        if(!user) {
            const password = crypto.randomBytes(32).toString("hex");

            const userCreated = await User.create({
                username: githubUser.original.login,
                email: githubUser.email,
                password: password
            })

            await auth.use('web').login(userCreated)
            return response.redirect('/')
        } else {
            await auth.use('web').login(user)
            return response.redirect('/')
        }
    }

    public async twitter({ auth, ally, response }: HttpContextContract) {
        const twitter = ally.use('twitter')

        const twitterUser = await twitter.user()
        if(!twitterUser.email) {
            return response.send('Invalid email provided')
        }

        const user = await User.query().where('email', twitterUser.email).first()
        if(!user) {
            const password = crypto.randomBytes(32).toString("hex");
            
            const userCreated = await User.create({
                username: twitterUser.name,
                email: twitterUser.email,
                password: password
            })

            await auth.use('web').login(userCreated)
            return response.redirect('/')
        } else {
            await auth.use('web').login(user)
            return response.redirect('/')
        }
    }
    public async google({ auth, ally, response }: HttpContextContract) {
        const google = ally.use('google')

        const googleUser = await google.user()
        if(!googleUser.email) {
            return response.send('Invalid email provided')
        }

        const user = await User.query().where('email', googleUser.email).first()

        if(!user) {
            const password = crypto.randomBytes(32).toString("hex");
            const userCreated = await User.create({
                username: googleUser.name,
                email: googleUser.email,
                password: password
            })

            await auth.use('web').login(userCreated)
            return response.redirect('/')
        } else {
            await auth.use('web').login(user)
            return response.redirect('/')
        }
    }
}