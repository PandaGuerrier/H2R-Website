import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class RolesPolicy extends BasePolicy {
	public async viewList(user: User) {
		const permissions = await user.related('permissions').query()

		return permissions?.some((permission) => permission.name === 'role:viewList')
	}
	public async view(user: User) {
		const permissions = await user.related('permissions').query()

		return permissions?.some((permission) => permission.name === 'role:viewList')
	}
	public async create(user: User) {
		const permissions = await user.related('permissions').query()

		return permissions?.some((permission) => permission.name === 'role:create')
	}
	public async update(user: User) {
		const permissionsList = await user.related('permissions').query()

		return permissionsList.some((permission) => permission.name === 'role:update')
	}
	public async delete(user: User) {
		const permissionsList = await user.related('permissions').query()

		return permissionsList.some((permission) => permission.name === 'role:delete')
	}
}
