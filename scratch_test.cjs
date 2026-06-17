const fs = require('fs');
const path = require('path');

console.log("process.cwd():", process.cwd());
const dbPath = path.join(process.cwd(), "src/data/db.json");
console.log("dbPath:", dbPath);
console.log("dbPath exists:", fs.existsSync(dbPath));
