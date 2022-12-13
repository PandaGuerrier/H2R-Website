import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PhoneValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    number: schema.string({ trim: true }, [
      rules.regex(/^(0)[1-9](\d{2}){4}$/),
    ]),
  })

  public messages: CustomMessages = {
    'error.regex': 'Le numéro de téléphone doit être au format 0612345678',
  }
}
