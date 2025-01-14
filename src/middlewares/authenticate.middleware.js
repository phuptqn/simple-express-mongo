import { User } from '../models/index.js';
import { catchError, UnauthenticatedError } from '../utils/error.util.js';
import { verifyJwtToken } from '../utils/token.util.js';

export const authenticateMiddleware = catchError(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthenticatedError();
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyJwtToken(token);
  if (!decoded?.userId) {
    throw new UnauthenticatedError();
  }

  const user = await User.findById(decoded.userId).select(['_id', 'name', 'createdAt']).lean();
  if (!user) {
    throw new UnauthenticatedError();
  }

  req.user = user;
  next();
});
