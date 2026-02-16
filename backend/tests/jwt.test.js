import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair,
  extractToken,
} from '../config/jwt.js';

describe('JWT Configuration', () => {
  const testUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    role: 'student',
  };

  describe('Access Token', () => {
    it('devrait générer un access token valide', () => {
      const token = generateAccessToken(testUser);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // Format JWT: header.payload.signature
    });

    it('devrait vérifier un access token valide', () => {
      const token = generateAccessToken(testUser);
      const { valid, decoded } = verifyAccessToken(token);
      
      expect(valid).toBe(true);
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(testUser.id);
      expect(decoded.username).toBe(testUser.username);
      expect(decoded.role).toBe(testUser.role);
    });

    it('devrait rejeter un access token invalide', () => {
      const { valid, error } = verifyAccessToken('invalid-token');
      
      expect(valid).toBe(false);
      expect(error).toBeDefined();
    });

    it('devrait rejeter un access token modifié', () => {
      const token = generateAccessToken(testUser);
      const modifiedToken = token.slice(0, -5) + 'xxxxx';
      
      const { valid } = verifyAccessToken(modifiedToken);
      expect(valid).toBe(false);
    });
  });

  describe('Refresh Token', () => {
    it('devrait générer un refresh token valide', () => {
      const token = generateRefreshToken(testUser);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    it('devrait vérifier un refresh token valide', () => {
      const token = generateRefreshToken(testUser);
      const { valid, decoded } = verifyRefreshToken(token);
      
      expect(valid).toBe(true);
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(testUser.id);
    });

    it('devrait rejeter un refresh token invalide', () => {
      const { valid, error } = verifyRefreshToken('invalid-refresh-token');
      
      expect(valid).toBe(false);
      expect(error).toBeDefined();
    });
  });

  describe('Token Pair', () => {
    it('devrait générer une paire de tokens', () => {
      const { accessToken, refreshToken } = generateTokenPair(testUser);
      
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
      expect(typeof accessToken).toBe('string');
      expect(typeof refreshToken).toBe('string');
      
      // Vérifier que les deux tokens sont valides
      const accessResult = verifyAccessToken(accessToken);
      const refreshResult = verifyRefreshToken(refreshToken);
      
      expect(accessResult.valid).toBe(true);
      expect(refreshResult.valid).toBe(true);
    });

    it('les deux tokens devraient contenir l\'ID utilisateur', () => {
      const { accessToken, refreshToken } = generateTokenPair(testUser);
      
      const { decoded: accessDecoded } = verifyAccessToken(accessToken);
      const { decoded: refreshDecoded } = verifyRefreshToken(refreshToken);
      
      expect(accessDecoded.id).toBe(testUser.id);
      expect(refreshDecoded.id).toBe(testUser.id);
    });
  });

  describe('Extract Token', () => {
    it('devrait extraire le token du header Authorization', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      const authHeader = `Bearer ${token}`;
      
      const extracted = extractToken(authHeader);
      expect(extracted).toBe(token);
    });

    it('devrait retourner null si pas de header', () => {
      const extracted = extractToken(null);
      expect(extracted).toBeNull();
    });

    it('devrait retourner null si format invalide', () => {
      const extracted = extractToken('InvalidFormat token');
      expect(extracted).toBeNull();
    });

    it('devrait retourner null si pas de Bearer', () => {
      const extracted = extractToken('token-without-bearer');
      expect(extracted).toBeNull();
    });
  });

  describe('Token Payload', () => {
    it('l\'access token devrait contenir toutes les infos utilisateur', () => {
      const token = generateAccessToken(testUser);
      const { decoded } = verifyAccessToken(token);
      
      expect(decoded.id).toBe(testUser.id);
      expect(decoded.username).toBe(testUser.username);
      expect(decoded.email).toBe(testUser.email);
      expect(decoded.role).toBe(testUser.role);
      expect(decoded.iss).toBe('mystudyplanner');
      expect(decoded.exp).toBeDefined(); // Expiration
    });

    it('le refresh token devrait contenir seulement l\'ID', () => {
      const token = generateRefreshToken(testUser);
      const { decoded } = verifyRefreshToken(token);
      
      expect(decoded.id).toBe(testUser.id);
      expect(decoded.username).toBeUndefined();
      expect(decoded.email).toBeUndefined();
      expect(decoded.iss).toBe('mystudyplanner');
    });
  });
});
