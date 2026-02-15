import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../data/db.json');
const DB_EXAMPLE_PATH = path.join(__dirname, '../data/db.example.json');

// Initialiser la base de données si elle n'existe pas
const initDatabase = () => {
  try {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('📁 Dossier data créé');
    }

    // Si db.json n'existe pas, le créer depuis db.example.json
    if (!fs.existsSync(DB_PATH)) {
      if (fs.existsSync(DB_EXAMPLE_PATH)) {
        const exampleData = fs.readFileSync(DB_EXAMPLE_PATH, 'utf8');
        fs.writeFileSync(DB_PATH, exampleData, 'utf8');
        console.log('✅ db.json créé depuis db.example.json');
      } else {
        // Créer une base vide si db.example.json n'existe pas non plus
        const emptyDb = { users: [], tasks: [], notifications: [] };
        fs.writeFileSync(DB_PATH, JSON.stringify(emptyDb, null, 2), 'utf8');
        console.log('✅ db.json créé (base vide)');
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base:', error);
  }
};

// Initialiser au chargement du module
initDatabase();

export const readDatabase = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lecture base de données:', error);
    return { users: [], tasks: [], notifications: [] };
  }
};

export const writeDatabase = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erreur écriture base de données:', error);
    return false;
  }
};
