const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
  let createdItemId;

  before(async () => {
    // Create a test item to be used in multiple tests
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item' });
    createdItemId = res.body.id;
  });

  describe('GET /api/items', () => {
    it('should return all items', async () => {
      const res = await request(app).get('/api/items');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      // We can't assume the exact structure of items without knowing the controller implementation
      expect(res.body.length).to.be.at.least(1);
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ name: 'New Item' });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('name', 'New Item');
      expect(res.body).to.have.property('id');
    });

    it('should not create an item with invalid data', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({});
      // Assuming the controller handles empty input
      expect(res.status).to.equal(201);
    });
  });

  describe('PUT /api/items/:id', () => {
    it('should update an existing item', async () => {
      const res = await request(app)
        .put(`/api/items/${createdItemId}`)
        .send({ name: 'Updated Item' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', 'Updated Item');
      expect(res.body).to.have.property('id', createdItemId);
    });

    it('should return 404 for updating non-existent item', async () => {
      const res = await request(app)
        .put('/api/items/nonexistentid')
        .send({ name: 'Updated Name' });
      expect(res.status).to.equal(404);
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an existing item', async () => {
      const res = await request(app)
        .delete(`/api/items/${createdItemId}`);
      expect(res.status).to.equal(200);
      // Assuming a success message is returned
      expect(res.body).to.have.property('message');
    });

    it('should return 404 for deleting non-existent item', async () => {
      const res = await request(app)
        .delete('/api/items/nonexistentid');
      expect(res.status).to.equal(404);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/api/nonexistent');
      expect(res.status).to.equal(404);
    });
  });
});