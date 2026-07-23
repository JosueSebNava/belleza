const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'luna-atelier-data')
  : path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

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
      passwordHash: 'c5d4ef83c31e9c2dd9bc19c961e5f80bfb9f69bdfa83d739818db2674e7cf4cb',
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
      passwordHash: '64a4c6ea47d96a73c1c73a4b00ca32eb00b3e77a28e75fa98cd5d5543d839352',
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

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
  }
}

function readData() {
  ensureDatabase();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  return {
    users: Array.isArray(data.users) ? data.users : [],
    appointments: Array.isArray(data.appointments) ? data.appointments : [],
    sessions: Array.isArray(data.sessions) ? data.sessions : []
  };
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