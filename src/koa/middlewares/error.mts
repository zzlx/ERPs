/**
 * *****************************************************************************
 *
 * error middleware
 *
 * *****************************************************************************
 */

import { HttpError } from '../HttpError.mts';

export const error = () => async function koaError(ctx, next) {
  try {
    await next();
  } catch (err) {
    return Promise.reject(new HttpError(err));
  }
} 
