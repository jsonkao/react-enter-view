export const REFRESH_WINDOW_DIMENSIONS = 'core/REFRESH_WINDOW_DIMENSIONS';
export const TRIGGER_STEP = 'core/TRIGGER_STEP';

export const refreshWindowDimensions = () => ({
  type: REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const triggerStep = datum => ({
  type: TRIGGER_STEP,
  payload: datum,
});
