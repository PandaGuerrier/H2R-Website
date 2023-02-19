import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', async ({ view }) => {
    return view.render('dashboards/admin/index')
  }).as('dashboard.index')


    /***
   * 
   * 
   * TÉMOIGNAGES
   * 
   * 
   * 
   */

  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('dashboards/admin/temoignage/create')
    }).as('dashboard.admin.def.create')
    Route.post('create', 'TemoignageController.create').as('dashboard.admin.temoignage.create.post')

    Route.get('edit/:id', 'TemoignageController.updateView').as('dashboard.admin.temoignage.update')
    Route.post('edit/:id', 'TemoignageController.update').as('dashboard.admin.temoignage.update.post')


    Route.get('delete/:id', "TemoignageController.destroy").as("dashboard.admin.temoignage.destroy")
    Route.get('', "TemoignageController.index").as("dashboard.admin.def.index")
  }).prefix('temoignages')

    /***
   * 
   * 
   * POSTS
   * 
   * 
   * 
   */


  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('dashboards/admin/posts/create')
    }).as('dashboard.admin.post.create')
    Route.post('create', 'PostsController.create').as('dashboard.admin.post.create.post')

    Route.get('edit/:id', 'PostsController.updateView').as('dashboard.admin.post.update')
    Route.post('edit/:id', 'PostsController.update').as('dashboard.admin.post.update.post')

    Route.get('', "PostsController.index").as("dashboard.admin.post.index")
    Route.get('delete/:id', "PostsController.destroy").as("dashboard.admin.post.destroy")

  }).prefix('posts')

  /***
   * 
   * 
   * DÉFINITIONS
   * 
   * 
   * 
   */

  Route.group(() => {
    Route.get('create', async ({ view }) => {
      return view.render('dashboards/admin/definition/create')
    }).as('dashboard.admin.definition.create')
    Route.post('create', 'DefinitionsController.create').as('dashboard.admin.definition.create.post')

    Route.get('edit/:id', 'DefinitionsController.updateView').as('dashboard.admin.definition.update')
    Route.post('edit/:id', 'DefinitionsController.update').as('dashboard.admin.definition.update.post')

    Route.get('', "DefinitionsController.index").as("dashboard.admin.definition.index")
    Route.get('delete/:id', "DefinitionsController.destroy").as("dashboard.admin.definition.destroy")

  }).prefix('definitions')


}).prefix('dashboard/').middleware(['auth', 'admin'])