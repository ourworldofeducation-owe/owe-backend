export function success(res, data = null, message = 'Success') {
  return res.json({
    success: true,
    message,
    data
  });
}

export function failure(res, message = 'Error', status = 400) {
  return res.status(status).json({
    success: false,
    message
  });
}
