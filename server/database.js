const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Determine Database Mode
const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

let db;
let mode;

if (isProduction) {
    // PostgreSQL (Production / Cloud)
    console.log('🔌 Connecting to PostgreSQL...');
    mode = 'postgres';
    db = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Required for Render/Heroku/Neon
    });
} else {
    // SQLite (Local Development)
    const sqlite3 = require('sqlite3').verbose();
    console.log('🔌 Connecting to SQLite (Local)...');
    mode = 'sqlite';
    const dbPath = path.resolve(__dirname, 'earthmovers.db');
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) console.error('SQLite connection error:', err.message);
        else console.log('✅ Connected to SQLite database.');
    });
}

// Unified Database API (Async/Await Wrapper)
const DB = {
    // Query: Returns multiple rows (SELECT)
    query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            if (mode === 'postgres') {
                // Convert ? -> $1, $2, etc. for Postgres
                let paramCount = 1;
                const pgSql = sql.replace(/\?/g, () => `$${paramCount++}`);

                db.query(pgSql, params, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.rows);
                });
            } else {
                // SQLite
                db.all(sql, params, (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            }
        });
    },

    // Get: Returns single row (SELECT ONE)
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            if (mode === 'postgres') {
                let paramCount = 1;
                const pgSql = sql.replace(/\?/g, () => `$${paramCount++}`);

                db.query(pgSql, params, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.rows[0]);
                });
            } else {
                db.get(sql, params, (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            }
        });
    },

    // Execute: Insert/Update/Delete (Returns { id, changes })
    execute: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            if (mode === 'postgres') {
                let paramCount = 1;
                let pgSql = sql.replace(/\?/g, () => `$${paramCount++}`);

                // Postgres doesn't return ID by default, need RETURNING id
                if (pgSql.trim().toUpperCase().startsWith('INSERT')) {
                    if (!pgSql.toUpperCase().includes('RETURNING')) {
                        pgSql += ' RETURNING id';
                    }
                }

                db.query(pgSql, params, (err, result) => {
                    if (err) return reject(err);
                    // Mocking SQLite's "this.lastID" and "this.changes"
                    const id = result.rows.length > 0 ? result.rows[0].id : null;
                    resolve({ id, changes: result.rowCount });
                });
            } else {
                db.run(sql, params, function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, changes: this.changes });
                });
            }
        });
    }
};

// Initialize Tables
async function initDb() {
    try {
        const idType = mode === 'postgres' ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
        const textType = mode === 'postgres' ? 'TEXT' : 'TEXT';

        // Bookings
        await DB.execute(`CREATE TABLE IF NOT EXISTS bookings (
            id ${idType},
            customerName TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT,
            equipmentId TEXT,
            startDate TEXT,
            endDate TEXT,
            status TEXT DEFAULT 'Pending',
            language TEXT,
            timestamp ${mode === 'postgres' ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
        )`);

        // Messages
        await DB.execute(`CREATE TABLE IF NOT EXISTS messages (
            id ${idType},
            sessionId TEXT NOT NULL,
            sender TEXT NOT NULL,
            text TEXT NOT NULL,
            timestamp ${mode === 'postgres' ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'},
            read INTEGER DEFAULT 0
        )`);

        // Admins
        await DB.execute(`CREATE TABLE IF NOT EXISTS admins (
            id ${idType},
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);

        // Create Default Admin (SECURE)
        const existing = await DB.get("SELECT * FROM admins WHERE username = ?", ['admin']);
        if (!existing) {
            console.log("⚙️ Creating default admin...");
            const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            await DB.execute("INSERT INTO admins (username, password) VALUES (?, ?)", ['admin', hashedPassword]);
            console.log("👤 Default admin account created (Hashed).");
        } else {
            // Optional: Check if we need to upgrade legacy plain text passwords (not strictly needed for new deployment but good practice)
            // For now, we assume if it exists, it's fine. If user wants a reset, they can database wipe.
        }

        console.log("✅ Database initialized successfully.");

    } catch (err) {
        console.error("❌ Database initialization failed:", err);
    }
}

// Run init
initDb();

module.exports = DB;
