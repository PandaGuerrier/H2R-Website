import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Formateur {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user as User

    if(!hasPermission(user)) {
      response.redirect('/')
    }
    
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}

async function hasPermission(user: User) {
  const permissionsList = await user.related('permissions').query()
  const roles = await user.related('roles').query()

  return roles.some((role) => role.name === "formateur") || permissionsList.some((permission) => permission.name === 'dashboard:formateur') || roles[0].permissions?.some((permission) => permission === 'dashboard:formateur')
}