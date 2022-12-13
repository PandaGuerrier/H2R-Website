import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('create', ({ view }) => {
      return view.render('pubs/create')
    }).as('pubs.create')
  
    Route.post('create', 'PubsController.store').as('pubs.store')
  }).prefix('pub/').middleware('auth')