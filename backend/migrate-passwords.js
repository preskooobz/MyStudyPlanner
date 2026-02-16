import { readDatabase, writeDatabase } from './models/database.js';
import bcrypt from 'bcrypt';
import logger from './config/logger.js';

const SALT_ROUNDS = 10;

/**
 * Script de migration pour hasher les mots de passe existants
 * À exécuter UNE SEULE FOIS après l'ajout de bcrypt
 * 
 * Usage: node migrate-passwords.js
 */

async function migratePasswords() {
  try {
    logger.info('🔐 Démarrage de la migration des mots de passe...');
    
    const db = readDatabase();
    let migrated = 0;
    let skipped = 0;
    
    for (const user of db.users) {
      // Vérifier si le mot de passe est déjà hashé (commence par $2b$ pour bcrypt)
      if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
        logger.debug(`User ${user.id} (${user.username}): déjà hashé, skip`);
        skipped++;
        continue;
      }
      
      logger.info(`Migration du mot de passe pour user ${user.id} (${user.username})...`);
      
      // Hasher le mot de passe en clair
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
      user.password = hashedPassword;
      
      migrated++;
    }
    
    // Sauvegarder les changements
    if (migrated > 0) {
      writeDatabase(db);
      logger.info(`✅ Migration terminée: ${migrated} mot(s) de passe hashé(s), ${skipped} déjà hashé(s)`);
    } else {
      logger.info(`✅ Aucune migration nécessaire: tous les mots de passe sont déjà hashés (${skipped} users)`);
    }
    
  } catch (error) {
    logger.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

// Exécuter la migration
migratePasswords();
