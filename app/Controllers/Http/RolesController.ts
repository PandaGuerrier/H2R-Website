import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Role from "App/Models/Role";
import {RoleValidator} from "App/Validators/RoleValidator";
import Permission from "App/Models/Permission";

export default class RolesController {
    public async index({response, bouncer}: HttpContextContract) {
        await bouncer.with('RolesPolicy').authorize('viewList')

        const roles = await Role.all()
        return response.send({
            number: roles.length,
            roles: roles
        })
    }

    public async create ({ view, bouncer }: HttpContextContract) {
        await bouncer.with('RolesPolicy').authorize('create')

        const permissions = await Permission.all()

        return view.render('roles/create', {permissions: permissions})
    }

    public async store({request, response, bouncer}: HttpContextContract) {
        await bouncer.with('RolesPolicy').authorize('create')

        const data = await request.validate(RoleValidator)

        const role = await Role.create(data)

        return response.send({
            message: 'Role created',
            permission: role
        })
    }

    public async show({params, response, bouncer}: HttpContextContract) {
        await bouncer.with('RolesPolicy').authorize('view')

        const role = await Role.query().where('id', params.id).firstOrFail()

        return response.send({
            role: role
        })
    }

    public async destroy({params, response, bouncer}: HttpContextContract) {
        await bouncer.with('RolesPolicy').authorize('delete')

        const role = await Role.query().where('id', params.id).firstOrFail()

        if (!role) return response.send({
            status: 400,
            message: "Role inconnue"
        })

        await role.delete()

        return response.send({
            message: "Role deleted"
        })
    }
}