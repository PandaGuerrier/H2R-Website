import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Permission from "App/Models/Permission";
import {PermissionValidator} from "App/Validators/PermissionValidator";

export default class PermissionsController {
    public async index({response, bouncer}: HttpContextContract) {
        await bouncer.with('PermissionPolicy').authorize('viewList')

        const permissions = await Permission.all()
        return response.send({
            number: permissions.length,
            permissions: permissions
        })
    }

    public async store({request, response, bouncer}: HttpContextContract) {
        await bouncer.with('PermissionPolicy').authorize('create')

        const data = await request.validate(PermissionValidator)
        const permission = await Permission.create(data)

        return response.send({
            message: 'Permission created',
            permission: permission
        })
    }

    public async show({params, response, bouncer}: HttpContextContract) {
        await bouncer.with('PermissionPolicy').authorize('view')

        const permission = await Permission.query().where('id', params.id).firstOrFail()

        return response.send({
            permission: permission
        })
    }

    public async destroy({params, response, bouncer}: HttpContextContract) {
        await bouncer.with('PermissionPolicy').authorize('delete')

        const permission = await Permission.query().where('id', params.id).firstOrFail()

        if (!permission) return response.send({
            status: 400,
            message: "Permission inconnu"
        })

        await permission.delete()

        return response.send({
            message: "Permission deleted"
        })
    }
}