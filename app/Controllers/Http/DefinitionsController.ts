import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Definition from 'App/Models/Definition'
import { DefinitionStoreValidator, DefinitionUpdateValidator } from 'App/Validators/DefinitionValidator'

export default class DefinitionsController {
    public async index({ view }: HttpContextContract) {
        const definitions = await Definition.query()

        return view.render('dashboards/admin/definition/index', {
            definitions: definitions
        })
    }

    public async create({ request, response, session }: HttpContextContract) {
        const data = await request.validate(DefinitionStoreValidator)

        await Definition.create(data)

        session.flash({
            success: "Cette définition a bien été enregistré !"
        })

        return response.redirect().back()
    }

    public async update({ request, params, response, session }: HttpContextContract) {
        const data = await request.validate(DefinitionUpdateValidator)
        const definition = await Definition.query().where('id', params.id).first()

        await definition?.merge(data).save()

        session.flash({
            success: "Cette définition a bien été enregistré !"
        })

        return response.redirect().back()
    }

    public async updateView({ params, view }: HttpContextContract) {
        const definition = await Definition.query().where('id', params.id).first()

        return view.render('dashboards/admin/definition/modify', {
            definition: definition
        })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const definition = await Definition.find(params.id)
        
        await definition?.delete()
        return response.redirect().back()
    }
}
