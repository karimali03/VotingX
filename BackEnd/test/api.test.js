import request from 'supertest';
import { expect } from 'chai'; // Use named import for chai
import app from '../app.js'; // Updated to use ES module import

// Test suite for API endpoints
describe('API Endpoints', () => {
    it('should return 200 for the root endpoint', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
    });

    it('should return 404 for an unknown endpoint', async () => {
        const res = await request(app).get('/unknown');
        expect(res.status).to.equal(404);
    });

    // Add more tests for specific endpoints
});

describe('User Signup', () => {
    it('should signup a new user successfully', async () => {
        const res = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'Karim',
                middle_name: 'Ali',
                last_name: 'Ibrahim',
                gender: 'male',
                birth_date: '1990-01-01',
                email: `karimabdelaziz12703@gmail.com`,
                password: 'TestPassword123!',
                phone: '1234567890',
                current_address: '123 Test St',
                profile_image: null
            });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.include('Check your email');
        expect(res.body.data).to.exist;
    });
});