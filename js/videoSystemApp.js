import VideoSystem from './VideoSystemModelo.js';
import VideoSystemController from './videoSystemController.js';
import VideoSystemView from './videoSystemView.js';

$(function(){
  const VideoSystemApp = new VideoSystemController(
    VideoSystem.getInstance("Rosebud"), new VideoSystemView()
  );
});
