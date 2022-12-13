import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    
  Route.group(() => {

  }).prefix('admin/').middleware(['auth', 'admin'])

  Route.group(() => {

  }).prefix('formateur/')

}).prefix('dashboard/')