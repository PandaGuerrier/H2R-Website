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
    Route.get('delete/:id', "TemoignageController.destroy").as("dashboard.admin.temoignage.destroy")

  }).prefix('temoignages')


  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('dashboards/admin/posts/create')
    }).as('dashboard.admin.post.create')

    Route.get('', "PostsController.index").as("dashboard.admin.post.index")
    Route.get('delete/:id', "PostsController.destroy").as("dashboard.admin.post.destroy")

    Route.post('create', 'PostsController.create').as('dashboard.admin.post.create.post')
  }).prefix('posts')

  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('dashboards/admin/definition/create')
    }).as('dashboard.admin.definition.create')

    Route.get('', "DefinitionsController.index").as("dashboard.admin.definition.index")
    Route.get('delete/:id', "DefinitionsController.destroy").as("dashboard.admin.definition.destroy")

    Route.post('create', 'DefinitionsController.create').as('dashboard.admin.definition.create.post')
  }).prefix('definitions')


}).prefix('dashboard/').middleware(['auth', 'admin'])