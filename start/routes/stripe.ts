import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/webhook', 'WebhooksController.handle')
    
    // CB TEST: 4242424242424242
    Route.group(() => {
      Route.post('/iron', 'WebhooksController.createCheckoutIron')
      Route.post('/diamond', 'WebhooksController.createCheckoutDiamond')

    }).prefix('checkout/').middleware(['auth', 'default'])

    
}).prefix('stripe/')

Route.group(() => {
  Route.get('/', async ({ view }) => {
    return view.render('stripe/buy')
  })
}).middleware(['auth']).prefix('subscription')
