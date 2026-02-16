import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import taskRoutes from '../routes/taskRoutes.js';
import { readDatabase, writeDatabase } from '../models/database.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/tasks', taskRoutes);

describe('Security Tests', () => {
  let originalDb;
  
  beforeEach(() => {
    originalDb = readDatabase();
  });
  
  afterEach(() => {
    writeDatabase(originalDb);
  });

  describe('XSS Protection', () => {
    it('devrait sanitizer les scripts XSS dans le titre', async () => {
      const maliciousTask = {
        userId: 2,
        userRole: 'student',
        title: '<script>alert("XSS")</script>Malicious Task',
        subject: 'Test',
        priority: 'high',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(maliciousTask)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.task.title).not.toContain('<script>');
      expect(response.body.task.title).toContain('&lt;script&gt;'); // Échappé
    });

    it('devrait sanitizer les scripts XSS dans la description', async () => {
      const maliciousTask = {
        userId: 2,
        userRole: 'student',
        title: 'Normal Title',
        description: '<img src=x onerror="alert(1)">',
        subject: 'Test',
        priority: 'medium',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(maliciousTask)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.task.description).not.toContain('onerror=');
    });
  });

  describe('Role-Based Access Control', () => {
    it('devrait bloquer la création de tâche par un admin', async () => {
      const adminTask = {
        userId: 1,
        userRole: 'admin',
        title: 'Admin Task',
        subject: 'Test',
        priority: 'high',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(adminTask)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('permissions insuffisantes');
    });

    it('devrait autoriser la création de tâche par un student', async () => {
      const studentTask = {
        userId: 2,
        userRole: 'student',
        title: 'Student Task',
        subject: 'Mathematics',
        priority: 'medium',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(studentTask)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.task).toBeDefined();
    });
  });

  describe('Input Validation', () => {
    it('devrait rejeter un titre trop court', async () => {
      const invalidTask = {
        userId: 2,
        userRole: 'student',
        title: 'AB',
        subject: 'Test',
        priority: 'high',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('devrait rejeter une priorité invalide', async () => {
      const invalidTask = {
        userId: 2,
        userRole: 'student',
        title: 'Valid Title',
        subject: 'Test',
        priority: 'super-urgent', // Invalide
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('devrait rejeter une date invalide', async () => {
      const invalidTask = {
        userId: 2,
        userRole: 'student',
        title: 'Valid Title',
        subject: 'Test',
        priority: 'high',
        dueDate: 'not-a-date'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('devrait rejeter un titre trop long', async () => {
      const invalidTask = {
        userId: 2,
        userRole: 'student',
        title: 'A'.repeat(201), // Plus de 200 caractères
        subject: 'Test',
        priority: 'high',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('devrait accepter une tâche valide', async () => {
      const validTask = {
        userId: 2,
        userRole: 'student',
        title: 'Valid Task Title',
        description: 'This is a valid description',
        subject: 'Mathematics',
        priority: 'medium',
        dueDate: '2026-12-31'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(validTask)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.task.title).toBe(validTask.title);
    });
  });

  describe('SQL Injection Protection', () => {
    it('ne devrait pas être vulnérable aux injections SQL (JSON db)', async () => {
      const injectionAttempt = {
        userId: "2; DROP TABLE users; --",
        userRole: 'student',
        title: 'Normal Title',
        subject: 'Test',
        priority: 'high',
        dueDate: '2026-12-31'
      };

      // Comme on utilise une DB JSON, l'injection SQL n'a pas d'effet
      // Le test vérifie que le système ne plante pas
      const response = await request(app)
        .post('/api/tasks')
        .send(injectionAttempt);

      // Peut être 201 ou 400 selon la validation
      expect([200, 201, 400]).toContain(response.status);
    });
  });
});
