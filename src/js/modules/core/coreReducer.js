import { REFRESH_WINDOW_DIMENSIONS } from './coreActions';

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
var getViewportWidth = function() {
  return (
    Math.max(window.document.documentElement.clientWidth, window.innerWidth) ||
    0
  );
};

var getViewportHeight = function() {
  return (
    Math.max(
      window.document.documentElement.clientHeight,
      window.innerHeight,
    ) || 0
  );
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    default:
      break;
  }

  return state;
};

export default reducer;
