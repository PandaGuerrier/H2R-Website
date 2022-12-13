import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pubs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('title')
      table.string('description')
      table.integer('view_count').defaultTo(0)
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
