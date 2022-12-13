import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Default {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {

    const user = auth.user as User
      if(!hasRole(user)) {
        await next()
      } else {
        response.redirect('/')
      }

    await next()
  }
}

async function hasRole(user: User) {
  const roles = await user?.related('roles').query()
  return roles?.some((role) => role.name === "argent" || role.name === "gold")
}
