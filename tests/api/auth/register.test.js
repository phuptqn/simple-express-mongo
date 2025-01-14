import { TestUtil } from '../../utils/util.js';
import { TestRequest } from '../../utils/request.js';

describe('auth - POST /register', () => {
  it('should return validation error for invalid request body', async () => {
    const response = await TestRequest.public().post('register').send({
      name: null,
      password: '',
    });

    expect(response.status).toBe(422);

    const [nameError, passwordError] = response.body.error.detail;
    expect(nameError.code).toEqual('invalid_type');
    expect(passwordError.code).toEqual('too_small');
  });

  it('should return error for existing user', async () => {
    const response = await TestRequest.public().post('register').send({
      name: 'phupt',
      password: 'new',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toEqual(TestUtil.genErrorCode('auth.userAlreadyExists'));
  });

  it('should successful create the user', async () => {
    const response = await TestRequest.public().post('register').send({
      name: 'phupt1',
      password: 'new',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe('phupt1');
  });
});
