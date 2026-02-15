import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app.js';
import Note from '../models/Note.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();
logger.level = 'silent';

let testUser = {
  email: 'noteuser@example.com',
  password: 'Test@1234',
};

let authToken;
let testUserId;

before(async function () {
  this.timeout(10000);

  // Clean existing test user
  await User.deleteOne({ email: testUser.email });

  // Create test user
  const user = new User({
    email: testUser.email,
    password: await bcrypt.hash(testUser.password, 12),
  });
  await user.save();
  testUserId = user._id;

  // Generate JWT
  authToken = jwt.sign({ userId: testUserId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Clean existing notes
  await Note.deleteMany({ user: testUserId });
});

after(async () => {
  // Clean up
  await Note.deleteMany({ user: testUserId });
  await User.deleteOne({ email: testUser.email });
  await mongoose.disconnect();
});

describe('Note API', () => {

  // ================== CREATE NOTE ==================
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Note',
        content: 'This is a test note',
        tags: ['test', 'note'],
        isPinned: true,
        isArchived: false,
        color: 'yellow',
        format: 'plain'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.title).to.equal('Test Note');
  });

  // ================== GET NOTES ==================
  it('should get all notes for user', async () => {
    // Create a note for fetching
    await Note.create({
      title: 'Fetch Note',
      content: 'Fetch content',
      user: testUserId,
      format: 'plain'
    });

    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  // ================== UPDATE NOTE ==================
  it('should update a note', async () => {
    // 1. Create a note for this test
    const note = await Note.create({
      title: 'Temp Note',
      content: 'Temp content',
      user: testUserId,
    });
  
    // 2. Update using the exact _id of the created note
    const res = await request(app)
      .put(`/api/notes/${note._id.toString()}/updatenotes`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Updated Title',
        content: 'Updated content',
      });
  
    // 3. Assertions
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Updated Title');
    expect(res.body.content).to.equal('Updated content');
  
    // 4. Clean up
    await Note.findByIdAndDelete(note._id);
  });
  
  // ================== DELETE NOTE ==================
  it('should delete a note', async () => {
    // Create a note to delete
    const note = await Note.create({
      title: 'Temp Note for Delete',
      content: 'Temp content',
      user: testUserId,
      format: 'plain'
    });

    const res = await request(app)
      .delete(`/api/notes/${note._id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id', note._id.toString());

    // Confirm deletion
    const deletedNote = await Note.findById(note._id);
    expect(deletedNote).to.be.null;
  });
});
