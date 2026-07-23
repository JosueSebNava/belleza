const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'luna-atelier-data')
  : path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

// Hash genérico para la contraseña de prueba "admin123"
const DEMO_HASH = '7b539a2eb2d4885aa16cb0b89dd31e42b2eb0429f9cf0d1bd0175b223d6a71cb';

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
      passwordHash: DEMO_HASH,
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
      passwordHash: DEMO_HASH,
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
  // Reescribe el archivo con datos limpios
  fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
}

function readData() {
  ensureDatabase();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(content);
    return {
      users: Array.isArray(data.users) && data.users.length > 0 ? data.users : seedData.users,
      appointments: Array.isArray(data.appointments) ? data.appointments : [],
      sessions: Array.isArray(data.sessions) ? data.sessions : []
    };
  } catch {
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