import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/discord/redirect', async ({ ally }) => {
    return ally.use('discord').redirect()
  })

  Route.get('/github/redirect', async ({ ally }) => {
    return ally.use('github').redirect()
  })

  Route.get('/twitter/redirect', async ({ ally }) => {
    return ally.use('twitter').redirect()
  })

  Route.get('/google/redirect', async ({ ally }) => {
    return ally.use('google').redirect()
  })

  // Callback route
  Route.get('/discord/callback', 'AlliesController.discord')
  Route.get('/github/callback', 'AlliesController.github')
  Route.get('/twitter/callback', 'AlliesController.twitter')
  Route.get('/google/callback', 'AlliesController.google')

}).middleware(['guest'])