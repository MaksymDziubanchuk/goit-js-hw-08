import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const iframePlayer = new Vimeo.Player(iframe);

const LOCAL_STORAGE_NAME = 'videoplayer-current-time';

let currentTime = localStorage.getItem(LOCAL_STORAGE_NAME);
let timeOfEnding = 0;

iframePlayer
  .getDuration()
  .then(function (duration) {
    timeOfEnding = duration;
  })
  .catch(function (error) {
    // an error occurred
  });

const onPlay = function (data) {
  iframePlayer
    .getCurrentTime()
    .then(function (seconds) {
      if (seconds < timeOfEnding - 1) {
        localStorage.setItem(LOCAL_STORAGE_NAME, seconds);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_NAME);
      }
    })
    .catch(function (error) {
      // an error occurred
    });
};

iframePlayer.on('timeupdate', throttle(onPlay, 1000));

if (currentTime) {
  iframePlayer
    .setCurrentTime(currentTime)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
