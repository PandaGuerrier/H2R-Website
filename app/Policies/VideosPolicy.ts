import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class VideosPolicy extends BasePolicy {
    public async viewList(user: User) {
        const permissions = await user.related('permissions')?.query()
        const roles = await user.related('roles')?.query()


        return permissions?.some((permission) => permission.name === 'video:viewList') || roles[0]?.permissions?.some((permission) => permission === 'video:viewList')
    }

    public async view(user: User) {
        const permissions = await user.related('permissions')?.query()
        const roles = await user.related('roles')?.query()

        return permissions?.some((permission) => permission.name === 'video:view') || roles[0]?.permissions?.some((permission) => permission === 'video:view')
    }

    public async create(user: User) {
        const permissions = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return permissions?.some((permission) => permission.name === 'video:create') || roles[0]?.permissions?.some((permission) => permission === 'video:create')
    }

    public async update(user: User) {
        const permissionsList = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return permissionsList.some((permission) => permission.name === 'video:update') || roles[0]?.permissions?.some((permission) => permission === 'video:update')
    }

    public async delete(user: User) {
        const permissionsList = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return permissionsList.some((permission) => permission.name === 'video:delete') || roles[0]?.permissions?.some((permission) => permission === 'video:delete')
    }


    public async deleteComment(user: User, comment) {
        const permissionsList = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return comment.user.id === user.id || permissionsList.some((permission) => permission.name === 'video:deleteComment') || roles[0]?.permissions?.some((permission) => permission === 'video:deleteComment')
    }
}
