import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pub from 'App/Models/Pub'
import { PubValidatorCreate, PubValidatorUpdate } from 'App/Validators/PubValidator';
import crypto from "crypto";

export default class PubsController {
    public async index({ view, bouncer }: HttpContextContract) {
        await bouncer.with('PubPolicy').authorize('viewList')

        const pubs = await Pub.all()

        return view.render('videos/index', {
            length: pubs.length,
            pubs: pubs,
        })
    }

    public async store({ request, session, response, bouncer }: HttpContextContract) {
        await bouncer.with('PubPolicy').authorize('create')

        const data = await request.validate(PubValidatorCreate)
        const id = crypto.randomBytes(8).toString("hex");
        const videoFile = request.file('video')

        await videoFile?.move("public/pubs/", {
            name: `${id}.mp4`,
            overwrite: true,
        })

        await Pub.create({
            ...data,
            id: id,
        })

        session.flash({ success: 'La vidéo a bien été ajoutée' })

        return response.redirect('back')
    }

    public async show({ params, response, bouncer }: HttpContextContract) {
        await bouncer.with('PubPolicy').authorize('view')

        const pub = await Pub.query().where('id', params.id).firstOrFail()
        return response.send({ 
            pub: pub
        })
    }

    public async update({ params, request, response }: HttpContextContract) {
        const pub = await Pub.query().where('id', params.id).firstOrFail()
        const data = await request.validate(PubValidatorUpdate)

        const pubUpdate = await pub.merge(data).save()

        return response.send({
            status: 200,
            message: "Pub updated",
            pub: pubUpdate
        })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const pub = await Pub.query().where('id', params.id).firstOrFail()

        await pub.delete()

        return response.send("Pub deleted")
    }
}
