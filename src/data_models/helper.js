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
