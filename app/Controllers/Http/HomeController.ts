import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Temoignage from 'App/Models/Temoignage'

export default class HomeController {
    public async index({ view }: HttpContextContract) {
        const temoignages = await Temoignage.query()
        const posts = await Post.query()

        return view.render('home', {
            temoignages: temoignages,
            posts: posts
        })
    }
}
