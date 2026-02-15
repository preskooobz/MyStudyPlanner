export const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur:', err.message);
  
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erreur serveur',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
