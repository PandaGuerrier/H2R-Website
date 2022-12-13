import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Permission extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public label: string

    @column()
    public name: string

    @column()
    public force: number

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
