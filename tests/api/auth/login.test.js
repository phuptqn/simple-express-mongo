import { AUTH_USER, TestUtil } from '../../utils/util.js';
import { TestRequest } from '../../utils/request.js';

describe('auth - POST /login', () => {
  it('should return validation error for invalid request body', async () => {
    const response = await TestRequest.public().post('login').send({
      name: null,
      password: '',
    });

    expect(response.status).toBe(422);

    const [nameError, passwordError] = response.body.error.detail;
    expect(nameError.code).toEqual('invalid_type');
    expect(passwordError.code).toEqual('too_small');
  });

  it('should return error for invalid credentials', async () => {
    const response = await TestRequest.public().post('login').send({
      name: 'phupt',
      password: 'invalid',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('auth.invalidCredential'));
  });

  it('should return tokens and user details on successful login', async () => {
    const response = await TestRequest.public().post('login').send(AUTH_USER);

    expect(response.status).toBe(200);

    const { name, accessToken, refreshToken } = response.body.data;
    expect(name).toEqual(global.authUser.name);
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });
});
