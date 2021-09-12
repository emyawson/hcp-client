export const ResetPasswordService = (post, transform) => (params, token) =>
  post(params, token).then(transform);
