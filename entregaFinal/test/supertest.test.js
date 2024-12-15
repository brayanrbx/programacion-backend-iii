import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest('http://localhost:3000');

// Tests para el endpoint GET /api/adoptions
describe('GET /api/adoptions', () => {
    it('Debería devolver todas las adopciones con status 200', async () => {
        const response = await requester.get('/api/adoptions');
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.be.an('array');
    });
});

// Tests para el endpoint GET /api/adoptions/:aid
describe('GET /api/adoptions/:aid', () => {
    it('Debería devolver una adopción específica con status 200', async () => {
        const adoptionId = '675f12ccafa2c6bb22d9a4dd';
        const response = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.be.an('object');
        expect(response.body.payload).to.have.property('_id', adoptionId);
    });

    it('Debería devolver error 404 si la adopción no existe', async () => {
        const adoptionId = '64e4b42a6f7b12345d8f90ab';
        const response = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal('error');
        expect(response.body.error).to.equal('Adoption not found');
    });
});

// Tests para el endpoint POST /api/adoptions/:uid/:pid
describe('POST /api/adoptions/:uid/:pid', () => {
    // it('Debería crear una adopción con status 200', async () => {
    //     const userId = '6727e947bcc4130b26d5e803';
    //     const petId = '6727e947bcc4130b26d5e80d';
    //     const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
    //     expect(response.status).to.equal(200);
    //     expect(response.body.status).to.equal('success');
    //     expect(response.body.message).to.equal('Pet adopted');
    // });

    it('Debería devolver error 404 si el usuario no existe', async () => {
        const userId = '6727e947bcc4130b26d5e80d';
        const petId = '6727e947bcc4130b26d5e80d';
        const response = await requester.post(`/api/adoptions${userId}/${petId}`);
        expect(response.status).to.equal(404);
    });

    it('Debería devolver error 404 si la mascota no existe', async () => {
        const userId = '6727e947bcc4130b26d5e803';
        const petId = '64e4b42a6f7b12345d8f90ab';
        const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal('error');
        expect(response.body.error).to.equal('Pet not found');
    });

    it('Debería devolver error 400 si la mascota ya está adoptada', async () => {
        const userId = '6727e947bcc4130b26d5e803';
        const petId = '6727e947bcc4130b26d5e80d';
        const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(response.status).to.equal(400);
        expect(response.body.status).to.equal('error');
        expect(response.body.error).to.equal('Pet is already adopted');
    });
});
