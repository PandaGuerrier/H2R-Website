import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, BaseModel, beforeCreate, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import * as crypto from 'crypto'
import {attachment, AttachmentContract} from "@ioc:Adonis/Addons/AttachmentLite";
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import Post from './Post';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @attachment({ preComputeUrl: true })
  public avatar: AttachmentContract

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @manyToMany(() => Post)
  public posts: ManyToMany<typeof Post>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @beforeSave()
  public static async HashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async CreateUUID (user: User) {
    user.id = crypto.randomUUID()
  }
}
