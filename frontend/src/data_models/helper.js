export const getAlertColor = (category) => {
  switch (category) {
    case 'harmless':
    case 'undetected':
      return 'success';
    case 'malicious':
      return 'error';
    case 'suspicious':
      return 'warning';
    default:
      return 'info';
  }
};

export const hexColors = {
  success: '#FDEDED',
  warning: '#E5F6FD',
  info: '#EDF7ED',
  error: '#FDEDED',
};

export const defaultErrorMessage = { type: '500', message: 'serverFailed' };

export const formatTimeString = (timeElm) => {
  const twoDigitsTime = timeElm.toString().length < 2 ? `0${timeElm}` : timeElm;
  return twoDigitsTime;
};
