import { User } from '../models/index.js';
import { HttpResponse } from '../utils/http-response.util.js';
import { catchError, ForbiddenError, RequestError, UnauthenticatedError } from '../utils/error.util.js';
import { createJwtToken, verifyJwtToken } from '../utils/token.util.js';

export const login = catchError(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  const validUser = await user?.comparePassword(password);
  if (!validUser) {
    throw new RequestError('auth.invalidCredential');
  }

  const accessToken = createJwtToken({ userId: user._id });
  const refreshToken = createJwtToken({ userId: user._id }, 'refresh');

  user.refreshToken = refreshToken;
  await user.save();

  return HttpResponse.ok(res, { id: user._id, name: user.name, accessToken, refreshToken });
});

export const refreshToken = catchError(async (req, res) => {
  const { refreshToken } = req.body;

  const decoded = verifyJwtToken(refreshToken, 'refresh');
  if (!decoded) {
    throw new UnauthenticatedError();
  }

  const user = await User.findById(decoded.userId);
  if (user?.refreshToken !== refreshToken) {
    throw new ForbiddenError();
  }

  const newAccessToken = createJwtToken({ userId: user._id });
  return HttpResponse.ok(res, { accessToken: newAccessToken });
});

export const register = catchError(async (req, res) => {
  const { name, password } = req.body;

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    throw new RequestError('auth.userAlreadyExists');
  }

  const user = new User({ name, password });
  await user.save();

  return HttpResponse.created(res, { id: user._id, name: user.name });
});

export const getMe = catchError(async (req, res) => {
  return HttpResponse.ok(res, req.user);
});
