import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'videos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('author_id').notNullable()
      table.text('comments').nullable().defaultTo('[]')
      table.text('likes').nullable().defaultTo('[]')
      table.text('tags').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.boolean('verified').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
