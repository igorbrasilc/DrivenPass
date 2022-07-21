import supertest from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/database.js';
import * as factory from './factory/appFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'igor@igor.com'`;
  });

describe('User creation test suite', () => {
    it('should result in a 201 status after creating a random user', async () => {
        const user = factory.createUser(true);
        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.statusCode).toEqual(201);
    });

    it('should result in a 409 status after creating the same email in user', async () => {
        const user = factory.createUser();
        const result1 = await supertest(app).post('/sign-up').send(user);
        expect(result1.statusCode).toEqual(201);
        const result2 = await supertest(app).post('/sign-up').send(user);
        expect(result2.statusCode).toEqual(409);
    });

    it('should result in a 422 status after creating the wrong schema input', async () => {
        const user = factory.createUserWrongSchema();
        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.statusCode).toEqual(422);
    });
});

describe('User signing in test suite', () => {
    it('should result in a 200 status after signing right info', async () => {
        const user = factory.createUser();
        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.statusCode).toEqual(201);
        const userSame = factory.loginUser();
        const result2 = await supertest(app).post('/sign-in').send(userSame);
        expect(result2.statusCode).toEqual(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
  })
