import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class PubPolicy extends BasePolicy {
    public async viewList(user: User) {
        const permissions = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return permissions?.some((permission) => permission.name === 'pub:viewList') || roles[0]?.permissions?.some((permission) => permission === 'pub:viewList')
    }

    public async view(user: User) {
        const permissions = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return  permissions?.some((permission) => permission.name === 'pub:view') || roles[0]?.permissions?.some((permission) => permission === 'pub:view')
    }

    public async create(user: User) {
        const permissions = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return permissions?.some((permission) => permission.name === 'pub:create') || roles[0]?.permissions?.some((permission) => permission === 'pub:create')
    }

    public async update(user: User) {
        const permissionsList = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return  permissionsList.some((permission) => permission.name === 'pub:update') || roles[0]?.permissions?.some((permission) => permission === 'pub:update')
    }

    public async delete(user: User) {
        const permissionsList = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return  permissionsList.some((permission) => permission.name === 'pub:delete') || roles[0]?.permissions?.some((permission) => permission === 'pub:delete')
    }
}
