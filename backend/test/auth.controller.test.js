// auth.controller.test.js

import { expect } from 'chai';
import request from 'supertest';
import { app } from '../app.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

logger.level = 'silent';
describe('Auth API', function () {
  this.timeout(10000);

  const testUser = {
    email: 'testuser@example.com',
    password: 'Test@1234'
  };

  let token;

  before(async () => {
    await User.deleteOne({ email: testUser.email });
  });

  after(async () => {
    await User.deleteOne({ email: testUser.email });
  });

  // ================== SIGNUP ==================
  describe('POST /api/auth/signup', () => {

    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: testUser.email,
          password: testUser.password,
          confirmPassword: testUser.password
        });

      expect(res.status).to.equal(201);
      expect(res.body.success).to.be.true;
      expect(res.body).to.have.property('token');
      expect(res.body.user.email).to.equal(testUser.email);
    });

    it('should fail if user already exists', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: testUser.email,
          password: testUser.password,
          confirmPassword: testUser.password
        });

      expect(res.status).to.equal(422);
      expect(res.body.success).to.be.false;
    });

  });

  // ================== LOGIN ==================
  describe('POST /api/auth/login', () => {

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');

      token = res.body.token;
    });

    it('should fail login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(res.status).to.equal(401);
      expect(res.body.success).to.be.false;
    });

  });

  // ================== CHANGE PASSWORD ==================
  describe('PUT /api/auth/change-password', () => {

    it('should change password for authenticated user', async () => {
      const res = await request(app)
        .put('/api/auth/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: testUser.password,
          newPassword: 'NewPass@123'
        });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.be.true;
    });

    it('should fail if current password is incorrect', async () => {
      const res = await request(app)
        .put('/api/auth/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'AnotherPass@123'
        });

      expect(res.status).to.equal(400);
      expect(res.body.success).to.be.false;
    });

  });

  // ================== FORGOT PASSWORD ==================
  describe('POST /api/auth/forgot-password', () => {

    it('should send reset code if email exists', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: testUser.email });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.be.true;
    });

    it('should fail if email does not exist', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'doesnotexist@example.com' });

      expect(res.status).to.equal(404);
      expect(res.body.success).to.be.false;
    });

  });


});

