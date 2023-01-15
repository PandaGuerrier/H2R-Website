import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class DefValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    text: schema.string([rules.minLength(10)]),
  })

  public messages: CustomMessages = {
    'title.required': 'Le titre est requis',
    'text.required': 'Le texte est requis',
  }
}
