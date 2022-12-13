import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class PubValidatorCreate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    viewCount: schema.number.optional(),
    isActive: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required',
    'title.required': 'Ce champ est requis',
    'description.required': 'Ce champ est requis',
    'viewCount.required': 'Ce champ est requis',
    'isActive.required': 'Ce champ est requis',
  }
}

export class PubValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
    viewCount: schema.number.optional(),
    isActive: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
