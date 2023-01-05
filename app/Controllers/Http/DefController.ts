import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Def from 'App/Models/Def'
import { DefValidator } from 'App/Validators/DefValidator'

export default class DefController {
    public async create({ request, response, session }: HttpContextContract) {
        const data = await request.validate(DefValidator)

        const defCreated = await Def.create(data)

        session.flash({
            success: "Cette définition a bien été enregistrée !"
        })

        return response.redirect().back()
    }
}

