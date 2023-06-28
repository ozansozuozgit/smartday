export const hasUserLoggedInBefore = () => {
  // Retrieve the value from local storage
  const loggedInBefore = localStorage.getItem('loggedInBefore');

  // Return true if the value exists and is "true", false otherwise
  return loggedInBefore === 'true';
};
