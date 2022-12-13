import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class PermissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(50), rules.unique({ table: 'permissions', column: 'name' })]),
    force: schema.number([rules.range(0, 1000)])
  })

  public messages: CustomMessages = {}
}
