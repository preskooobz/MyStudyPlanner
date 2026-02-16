import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes.js';
import { readDatabase, writeDatabase } from '../models/database.js';
import bcrypt from 'bcrypt';

// Créer une app de test
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Authentication API', () => {
  let originalDb;
  
  beforeEach(() => {
    // Sauvegarder la base de données originale
    originalDb = readDatabase();
  });
  
  afterEach(() => {
    // Restaurer la base de données originale après chaque test
    writeDatabase(originalDb);
  });

  describe('POST /api/auth/register', () => {
    it('devrait créer un nouvel utilisateur avec un mot de passe hashé', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.password).toBeUndefined(); // Ne doit pas retourner le password
      expect(response.body.accessToken).toBeDefined(); // JWT token

      // Vérifier que le mot de passe est bien hashé dans la DB
      const db = readDatabase();
      const user = db.users.find(u => u.username === userData.username);
      expect(user).toBeDefined();
      expect(user.password).not.toBe(userData.password);
      expect(user.password.startsWith('$2b$')).toBe(true); // Format bcrypt
    });

    it('devrait rejeter un email invalide', async () => {
      const userData = {
        username: 'testuser2',
        email: 'invalid-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('devrait rejeter un username trop court', async () => {
      const userData = {
        username: 'ab',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('devrait rejeter un username existant', async () => {
      const db = readDatabase();
      const existingUser = db.users[0];

      const userData = {
        username: existingUser.username,
        email: 'newemail@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('existant');
    });
  });

  describe('POST /api/auth/login', () => {
    it('devrait connecter un utilisateur avec un mot de passe hashé', async () => {
      // Créer un utilisateur de test avec mot de passe hashé
      const db = readDatabase();
      const hashedPassword = await bcrypt.hash('testpass123', 10);
      
      const testUser = {
        id: 999,
        username: 'logintest',
        email: 'logintest@example.com',
        password: hashedPassword,
        fullName: 'Login Test',
        role: 'student',
        createdAt: new Date().toISOString()
      };
      
      db.users.push(testUser);
      writeDatabase(db);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'logintest',
          password: 'testpass123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.username).toBe('logintest');
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined(); // Vérifier le refreshToken dans le body
    });

    it('devrait rejeter un mot de passe incorrect', async () => {
      const db = readDatabase();
      const hashedPassword = await bcrypt.hash('correctpass', 10);
      
      const testUser = {
        id: 998,
        username: 'wrongpasstest',
        email: 'wrongpass@example.com',
        password: hashedPassword,
        fullName: 'Wrong Pass Test',
        role: 'student',
        createdAt: new Date().toISOString()
      };
      
      db.users.push(testUser);
      writeDatabase(db);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'wrongpasstest',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Identifiants incorrects');
    });

    it('devrait rejeter un utilisateur inexistant', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistentuser',
          password: 'anypassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('devrait accepter un email comme username', async () => {
      const db = readDatabase();
      const hashedPassword = await bcrypt.hash('emailtest123', 10);
      
      const testUser = {
        id: 997,
        username: 'emailuser',
        email: 'emailuser@example.com',
        password: hashedPassword,
        fullName: 'Email User',
        role: 'student',
        createdAt: new Date().toISOString()
      };
      
      db.users.push(testUser);
      writeDatabase(db);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'emailuser@example.com', // Utiliser l'email
          password: 'emailtest123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.username).toBe('emailuser');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('devrait rafraîchir l\'access token avec un refresh token valide', async () => {
      // D'abord, se connecter pour obtenir un refresh token
      const db = readDatabase();
      const hashedPassword = await bcrypt.hash('refreshtest123', 10);
      
      const testUser = {
        id: 996,
        username: 'refreshuser',
        email: 'refresh@example.com',
        password: hashedPassword,
        fullName: 'Refresh User',
        role: 'student',
        createdAt: new Date().toISOString()
      };
      
      db.users.push(testUser);
      writeDatabase(db);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'refreshuser',
          password: 'refreshtest123'
        })
        .expect(200);

      // Extraire le refresh token du body
      const refreshToken = loginResponse.body.refreshToken;
      expect(refreshToken).toBeDefined();

      // Utiliser le refresh token pour obtenir un nouveau access token
      const refreshResponse = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(refreshResponse.body.success).toBe(true);
      expect(refreshResponse.body.accessToken).toBeDefined();
      expect(refreshResponse.body.accessToken).not.toBe(loginResponse.body.accessToken);
    });

    it('devrait rejeter une requête sans refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('manquant');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('devrait se déconnecter avec succès', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Déconnexion');
    });
  });
});
