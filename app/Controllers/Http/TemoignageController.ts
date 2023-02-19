import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Temoignages from 'App/Models/Temoignage'
import { TemoignageStoreValidator, TemoignageUpdateValidator } from 'App/Validators/TemoignageValidator'

export default class DefController {

    public async index({ view }: HttpContextContract) {
        const temoignages = await Temoignages.query()

        return view.render('dashboards/admin/temoignage/index', {
            temoignages: temoignages
        })
    }

    public async create({ request, response, session }: HttpContextContract) {
        const data = await request.validate(TemoignageStoreValidator)

        await Temoignages.create(data)

        session.flash({
            success: "Cette définition a bien été enregistrée !"
        })

        return response.redirect().back()
    }

    public async update({ request, params, response, session }: HttpContextContract) {
        const data = await request.validate(TemoignageUpdateValidator)
        const temoignage = await Temoignages.query().where('id', params.id).first()

        await temoignage?.merge(data).save()

        session.flash({
            success: "Ce témoignage a bien été enregistré !"
        })

        return response.redirect().back()
    }

    public async updateView({ params, view }: HttpContextContract) {
        const temoignage = await Temoignages.query().where('id', params.id).first()

        return view.render('dashboards/admin/temoignage/modify', {
            temoignage: temoignage
        })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const temoignage = await Temoignages.find(params.id)
        
        await temoignage?.delete()
        return response.redirect().back()
    }
}

