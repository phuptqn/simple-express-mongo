import { TestUtil } from '../../utils/util.js';
import { TestRequest } from '../../utils/request.js';
import { createJwtToken } from '../../../src/utils/token.util.js';

describe('auth - POST /refresh-token', () => {
  it('should return validation error for invalid request body', async () => {
    const response = await TestRequest.public().post('refresh-token').send({
      refreshToken: '',
    });

    expect(response.status).toBe(422);

    expect(response.body.error.detail[0].code).toEqual('too_small');
  });

  it('should return error for invalid token', async () => {
    const response = await TestRequest.public().post('refresh-token').send({
      refreshToken: 'invalid',
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('unauthenticated'));
  });

  it('should return error for mismatching token', async () => {
    const mismatchRefreshToken = createJwtToken({ userId: TestUtil.genObjectId() }, 'refresh');

    const response = await TestRequest.public().post('refresh-token').send({
      refreshToken: mismatchRefreshToken,
    });

    expect(response.status).toBe(403);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('forbidden'));
  });

  it('should return new access token successful', async () => {
    const refreshToken = createJwtToken({ userId: global.authUser._id }, 'refresh');

    const response = await TestRequest.public().post('refresh-token').send({
      refreshToken,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.accessToken).toBeTruthy();
  });
});
