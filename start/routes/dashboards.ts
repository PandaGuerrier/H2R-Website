import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', async ({ view }) => {
    return view.render('dashboards/admin/index')
  }).as('dashboard.index')

  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('dashboards/admin/temoignage/create')
    }).as('dashboard.admin.def.create')

    Route.get('', "TemoignageController.index").as("dashboard.admin.def.index")

    Route.post('create', 'TemoignageController.create').as('dashboard.admin.def.create.post')
  }).prefix('temoignages')
}).prefix('dashboard/').middleware(['auth', 'admin'])