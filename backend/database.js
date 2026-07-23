const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'luna-atelier-data')
  : path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

// Hash HMAC-SHA256 con salt "demo-salt" para la contraseña "admin123"
const ADMIN_PASSWORD_HASH = '7b539a2eb2d4885aa16cb0b89dd31e42b2eb0429f9cf0d1bd0175b223d6a71cb';

const seedData = {
  users: [
    {
      id: 'staff-1',
      role: 'staff',
      name: 'Josué Sebastián',
      email: 'navarretegarciasebas43@gmail.com',
      phone: '',
      provider: 'email',
      salt: 'demo-salt',
      passwordHash: ADMIN_PASSWORD_HASH,
      createdAt: '2026-07-23T00:00:00.000Z'
    },
    {
      id: 'staff-2',
      role: 'staff',
      name: 'Liz',
      email: 'lizgargarram@gmail.com',
      phone: '',
      provider: 'email',
      salt: 'demo-salt',
      passwordHash: ADMIN_PASSWORD_HASH,
      createdAt: '2026-07-23T00:00:00.000Z'
    }
  ],
  appointments: [],
  sessions: []
};

function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Si el archivo no existe, escribe los datos iniciales
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
  }
}

function readData() {
  ensureDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    // Si el archivo no contiene usuarios o tiene hashes desactualizados, sobrescribe con seedData
    if (!Array.isArray(data.users) || data.users.length === 0) {
      writeData(seedData);
      return seedData;
    }

    return {
      users: data.users,
      appointments: Array.isArray(data.appointments) ? data.appointments : [],
      sessions: Array.isArray(data.sessions) ? data.sessions : []
    };
  } catch (err) {
    writeData(seedData);
    return seedData;
  }
}

function writeData(data) {
  ensureDatabase();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  DATA_FILE,
  readData,
  writeData
};