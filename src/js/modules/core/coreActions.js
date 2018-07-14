export const REFRESH_WINDOW_DIMENSIONS = 'core/REFRESH_WINDOW_DIMENSIONS';
export const ENTER_STEP = 'core/ENTER_STEP';

export const refreshWindowDimensions = () => ({
  type: REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const enterStep = datum => ({
  type: ENTER_STEP,
  payload: datum,
});
