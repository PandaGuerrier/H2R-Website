import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Definition from 'App/Models/Definition'
import Post from 'App/Models/Post'
import Temoignage from 'App/Models/Temoignage'

export default class HomeController {
    public async index({ view }: HttpContextContract) {
        const temoignages = await Temoignage.query()
        const posts = await Post.query()
        const definitions = await Definition.query()

        return view.render('home', {
            temoignages: temoignages,
            posts: posts,
            definitions: definitions,
        })
    }
}
