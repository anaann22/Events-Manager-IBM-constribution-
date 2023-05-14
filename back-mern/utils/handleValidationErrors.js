import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).json(errors.array());
  }

  next();
};

export { default as handleValidationErrors } from './handleValidationErrors.js';