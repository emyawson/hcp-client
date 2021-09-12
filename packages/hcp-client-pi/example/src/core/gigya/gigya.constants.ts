/**
 * All screenset container ID's are prefixed with Dev
 * This is not because they are used in a Dev environment, but because they are used
 * in multiple apps and renaming would cause breakage, naming will be aligned across environments with the Dev-prefix
 */

export const screenSets = {
  login: {
    id: 'Dev-RegistrationLogin',
    startScreen: 'gigya-login-one-column',
  },
  changePassword: {
    id: 'Dev-ProfileUpdate',
    startScreen: 'gigya-change-password-screen',
  },
  resetPassword: {
    id: 'Dev-ProfileUpdate',
    startScreen: 'gigya-change-password-screen',
  },
  register: {
    id: 'Dev-RegistrationLogin',
    startScreen: 'gigya-register-screen',
  },
};
