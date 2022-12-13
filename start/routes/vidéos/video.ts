import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    // VIEW
  
    Route.get('create', ({ view }) => {
      return view.render('videos/create')
    }).as('videos.create')
    Route.get(':id', 'VideosController.show').as('videos.show')
  
    // POST
  
    Route.post('create', 'VideosController.store').as('videos.store')
    Route.post('like/:id', 'VideosController.like').as('videos.like')
    Route.post('comment/:id', 'VideosController.comment').as('videos.comment')
    Route.post('delete/:id', 'VideosController.delete').as('videos.delete')
    Route.post('/:id/comment/:comment/delete', 'VideosController.deleteComment').as('comment.delete')
  
  }).prefix('video/').middleware('auth')