import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class TemoignageStoreValidator {
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

export class TemoignageUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    text: schema.string.optional([rules.minLength(10)]),
  })

  public messages: CustomMessages = {
    'title.required': 'Le titre est requis',
    'text.required': 'Le texte est requis',
  }
}
