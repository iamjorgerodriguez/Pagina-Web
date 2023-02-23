import VideoSystem from './VideoSystemModelo.js';
import VideoSystemController from './videoSystemController.js';
import VideoSystemView from './videoSystemView.js';

$(function(){
  const VideoSystemApp = new VideoSystemController(
    VideoSystem.getInstance("Rosebud"), new VideoSystemView()
  );

  const historyActions = {
		init: () => VideoSystemApp.onInit(),
    showCategoryMovies: (event) => VideoSystemApp.handleCategorias(event.state.category),
    showMovieCharacteristics: (event) => VideoSystemApp.handleMovies(event.state.movie),
    menuOptions: (event) => VideoSystemApp.handleMenu(event.state.option),
    showPersonCharacteristics: (event) => VideoSystemApp.handlePeople(event.state.person.category ,event.state.person.name, event.state.person.lastname1)
	}

  window.addEventListener('popstate', function(event) {
		if (event.state){
			historyActions[event.state.action](event);
		}
	});

  history.replaceState({action: 'init'}, null);
});
