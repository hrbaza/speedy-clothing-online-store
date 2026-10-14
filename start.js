// One command to run the whole project: `npm start` (or double-click START.bat on Windows).
// Installs any missing libraries the first time, then starts the backend, store and admin panel together.
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const FOLDERS = ['.', 'backend', 'frontend', 'admin']

for (const folder of FOLDERS) {
  const dir = path.join(__dirname, folder)
  if (!fs.existsSync(path.join(dir, 'node_modules'))) {
    console.log(`\n📦 Installing libraries in ${folder === '.' ? 'project root' : folder} (first time only)...\n`)
    execSync('npm install', { cwd: dir, stdio: 'inherit' })
  }
}

for (const folder of ['backend', 'frontend', 'admin']) {
  if (!fs.existsSync(path.join(__dirname, folder, '.env'))) {
    console.warn(`⚠️  ${folder}/.env is missing - copy ${folder}/.env.example to ${folder}/.env and fill it in.`)
  }
}

console.log(`
🚀 Starting Speed Clothing...
   Store:        http://localhost:5173
   Admin panel:  http://localhost:5174
   Backend API:  http://localhost:5000
   Press Ctrl + C to stop.
`)

execSync('npm run dev', { cwd: __dirname, stdio: 'inherit' })
