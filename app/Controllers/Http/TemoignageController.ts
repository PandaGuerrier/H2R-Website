import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Temoignages from 'App/Models/Temoignage'
import { TemoignageValidator } from 'App/Validators/TemoignageValidator'

export default class DefController {

    public async index({ view }: HttpContextContract) {
        const temoignages = await Temoignages.query()

        return view.render('dashboards/admin/temoignage/index', {
            temoignages: temoignages
        })
    }

    public async create({ request, response, session }: HttpContextContract) {
        const data = await request.validate(TemoignageValidator)

        await Temoignages.create(data)

        session.flash({
            success: "Cette définition a bien été enregistrée !"
        })

        return response.redirect().back()
    }

    public async destroy({ params, response }: HttpContextContract) {
        const temoignage = await Temoignages.find(params.id)
        
        await temoignage?.delete()
        return response.redirect().back()
    }
}

