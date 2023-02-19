import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { PostStoreValidator, PostUpdateValidator } from 'App/Validators/PostValidator'

export default class PostsController {
    public async index({ view }: HttpContextContract) {
        const posts = await Post.query()

        return view.render('dashboards/admin/posts/index', {
            posts: posts
        })
    }

    public async create({ request, response, session }: HttpContextContract) {
        const data = await request.validate(PostStoreValidator)

        await Post.create(data)

        session.flash({
            success: "Ce post a bien été enregistré !"
        })

        return response.redirect().back()
    }

    public async update({ request, params, response, session }: HttpContextContract) {
        const data = await request.validate(PostUpdateValidator)
        const post = await Post.query().where('id', params.id).first()

        await post?.merge(data).save()

        session.flash({
            success: "Ce post a bien été enregistré !"
        })

        return response.redirect().back()
    }

    public async updateView({ params, view }: HttpContextContract) {
        const post = await Post.query().where('id', params.id).first()

        return view.render('dashboards/admin/posts/modify', {
            post: post
        })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const post = await Post.find(params.id)
        
        await post?.delete()
        return response.redirect().back()
    }

    public async show({ params, view }: HttpContextContract) {
        const post = await Post.find(params.id)

        return view.render('posts/show', {
            post: post
        })
    }
} 


