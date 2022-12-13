import crypto from "crypto";
import Video from "App/Models/Video";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { VideoValidatorCreate, VideoValidatorUpdate } from "App/Validators/VideoValidator";
import Pub from "App/Models/Pub";
import User from "App/Models/User";

export default class VideosController {
    public async index({ view, bouncer }: HttpContextContract) {
        await bouncer.with('VideosPolicy').authorize('viewList')

        const videos = await Video.all()

        return view.render('videos/index', {
            videos: videos,
        })
    }

    public async store({ request, auth, session, response, bouncer }: HttpContextContract) {
        await bouncer.with('VideosPolicy').authorize('create')

        const data = await request.validate(VideoValidatorCreate)

        const id = crypto.randomBytes(8).toString("hex");
        const tags = request.input('tags').split(', ')

        const videoFile = request.file('video')

        await videoFile?.move("public/videos/", {
            name: `${id}.mp4`,
            overwrite: true,
        })

        await Video.create({
            ...data,
            id: id,
            authorID: auth.user?.id ? auth.user?.id : "testttteeg",
            tags: tags,
            likes: "[]",
        })

        session.flash({ success: 'La vidéo a bien été ajoutée' })

        return response.redirect('back')
    }

    public async show({ params, view }: HttpContextContract) {
        const video = await Video.query().where('id', params.id).firstOrFail()
        const pub = await Pub.query().where('isActive', true).andWhere('verified', true).orderByRaw('RANDOM()').firstOrFail()
        const author = await User.query().where('id', video.authorID).firstOrFail()

        //if(!this.hasPermission(author, 'video.noads')) {
            return view.render('videos/show', {
                pub: pub,
                video: video,
                author: author,
                comments: JSON.parse(video.comments)
            })
       /* } else {
            return view.render('videos/show', {
                video: video,
                author: author,
                comments: JSON.parse(video.comments)
            })
        }*/

    }

    public async update({ params, request, response }: HttpContextContract) {
        const video = await Video.query().where('id', params.id).firstOrFail()
        const data = await request.validate(VideoValidatorUpdate)

        const videoUpdate = await video.merge(data).save()

        return response.send({
            status: 200,
            message: "Video updated",
            video: videoUpdate
        })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const video = await Video.query().where('id', params.id).firstOrFail()

        await video.delete()

        return response.send("video deleted")
    }

    public async like({ params, response, request }: HttpContextContract) {
        const video = await Video.query().where('id', params.id).firstOrFail()

        const likes = JSON.parse(video.likes)

        if (likes.includes(request.body().user)) {
            const index = likes.indexOf(request.body().user)
            likes.splice(index, 1)
        } else {
            likes.push(request.body().user)
        }

        video.likes = JSON.stringify(likes)

        await video.save()

        return response.send({
            status: 200,
            message: "Video liked",
            video: video,
            isLiked: video.likes.includes(request.body().user),
            length: JSON.parse(video.likes).length,
        })
    }

    public async comment({ params, response, request, auth, session }: HttpContextContract) {
        const video = await Video.query().where('id', params.id).firstOrFail()

        const comments = JSON.parse(video.comments)

        if(!request.body().text) {
            session.flash({ error: 'Vous devez écrire un commentaire' })
            return response.redirect('back')
        } else if(request.body().text.length < 10) {
            session.flash({ error: 'Votre commentaire doit faire au moins 10 caractères' })
            return response.redirect('back')
        }
        /**
         EXEMPLE OF COMMENT
         
        Comments: [
            {
                user: {
                    username,
                    avatar,
                    ...
                },
                text: "this is a text",
                id: "randomId",
            }
        ]

         */

        const id = crypto.randomBytes(8).toString("hex");

        comments.push({
            user: auth.user,
            text: request.body().text,
            id: id,
        })

        video.comments = JSON.stringify(comments)

        await video.save()

        return response.redirect('back')
    }

    public async deleteComment({ params, response, bouncer }: HttpContextContract) {

        const video = await Video.query().where('id', params.id).firstOrFail()
        const comments = JSON.parse(video.comments)
        const comment = comments.find(c => c.id === params.comment)
        const index = comments.indexOf(comment)

        await bouncer.with('VideosPolicy').authorize('deleteComment', comment)

        comments.splice(index, 1)
        video.comments = JSON.stringify(comments)


        await video.save()

        return response.redirect('back')
    }


    // UTIL FUNCTION

    public async hasPermission(user: User, permission: string) {
        const permissions = await user.related('permissions').query();

        return permissions.find((p) => p.name === permission) ? true : false;
    }
}