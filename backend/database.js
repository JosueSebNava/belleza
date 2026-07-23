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
      passwordHash: 'f0a20a672322df723825313a2bb6bfdf4b6dc9b8c0e2a3c7136fbd8cfef3d688',
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
      passwordHash: 'da785672a9df559cfa5ef39eb38c5b9f71c4c95f190bc1f4dbec83a3ceee1d5d',
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

  // Si el archivo no existe o está vacío, crea o inicializa el JSON con el seedData correcto
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
  }
}

function readData() {
  ensureDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return {
      users: Array.isArray(data.users) && data.users.length > 0 ? data.users : seedData.users,
      appointments: Array.isArray(data.appointments) ? data.appointments : [],
      sessions: Array.isArray(data.sessions) ? data.sessions : []
    };
  } catch (err) {
    // Si hay un error al leer el JSON, retorna los datos iniciales
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