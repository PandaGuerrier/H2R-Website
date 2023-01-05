import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', async ({ view }) => {
    return view.render('dashboards/admin/index')
  }).as('dashboard.index')

  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('/dashboards/admin/def/create')
    }).as('dashboard.admin.def.create')

    Route.post('create', 'DefController.create').as('dashboard.admin.def.create.post')
  }).prefix('defs')
}).prefix('dashboard/').middleware(['auth', 'admin'])