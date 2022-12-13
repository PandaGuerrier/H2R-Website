import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class VideoValidatorCreate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    tags: schema.string.optional(),
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required',
    'title.required': 'Ce champ est requis',
    'description.required': 'Ce champ est requis',
    'video.required': 'Ce champ est requis',
    'error.video': 'La vidéo doit être au format mp4',
    'tags.required': 'Ce champ est requis',
  }
}

export class VideoValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
    comments: schema.string.optional(),
    likes: schema.string.optional(),
    isActive: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}