(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var theater = theaterJS()
//
//theater
//    .on('type:start, erase:start', function () {
//      theater.getCurrentActor().$element.classList.add('actor__content--typing')
//    })
//    .on('type:end, erase:end', function () {
//      theater.getCurrentActor().$element.classList.remove('actor__content--typing')
//    })
//    .on('type:start, erase:start', function () {
//      if (theater.getCurrentActor().name === 'text') {
//        document.body.classList.add('dark')
//      } else {
//        document.body.classList.remove('dark')
//      }
//    })
theater
    .on('type:start, erase:start', function () {
        theater.getCurrentActor().$element.classList.add('actor__content--typing')
    })
    .on('type:end, erase:end', function () {
        theater.getCurrentActor().$element.classList.remove('actor__content--typing')
    })

theater
    .addActor('text', {speed: 1.0, accuracy: 1.0})

    .addScene('text: A platform that takes you into the game.', 600)

    //.addScene(theater.replay.bind(theater))









