import { TestUtil } from '../../utils/util.js';
import { TestRequest } from '../../utils/request.js';
import { createJwtToken } from '../../../src/utils/token.util.js';

describe('auth - GET /me', () => {
  it('should return error for invalid authorization header', async () => {
    const response = await TestRequest.public().get('me');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('unauthenticated'));
  });

  it('should return error for invalid token', async () => {
    const response = await TestRequest.public().set('Authorization', 'Bearer invalid').get('me');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('unauthenticated'));
  });

  it('should return error on user not found', async () => {
    const accessToken = createJwtToken({ userId: TestUtil.genObjectId() });

    const response = await TestRequest.public().set('Authorization', `Bearer ${accessToken}`).get('me');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('unauthenticated'));
  });

  it('should successful return the auth user', async () => {
    const response = await TestRequest.auth().get('me');

    expect(response.status).toBe(200);
    expect(response.body.data.name).toEqual(global.authUser.name);
  });
});
