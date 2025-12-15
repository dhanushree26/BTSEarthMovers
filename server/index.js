const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./database');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow Vite client
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Serve Static Files (Production)
app.use(express.static(path.join(__dirname, '../client/dist')));

// API ROUTES

// Login (SECURE)
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const row = await db.get('SELECT * FROM admins WHERE username = ?', [username]);

        if (row) {
            // Compare Hashed Password
            const match = await bcrypt.compare(password, row.password);
            if (match) {
                res.json({ success: true, token: 'mock-jwt-token-123', username: row.username });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/debug-tables', async (req, res) => {
    try {
        // Try Postgres Syntax
        const rows = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        res.json({ database: 'connected', tables: rows });
    } catch (err) {
        try {
            // Fallback to SQLite Syntax (if running locally)
            const rows = await db.query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
            res.json({ database: 'connected (sqlite)', tables: rows });
        } catch (sqliteErr) {
            res.status(500).json({ error: 'Database query failed', details: err.message });
        }
    }
});

// Get Bookings (Admin)
app.get('/api/bookings', async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM bookings ORDER BY timestamp DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Booking / Quote
app.post('/api/bookings', async (req, res) => {
    try {
        const { customerName, phone, email, equipmentId, startDate, endDate, language } = req.body;
        const result = await db.execute(
            `INSERT INTO bookings (customerName, phone, email, equipmentId, startDate, endDate, language) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [customerName, phone, email, equipmentId, startDate, endDate, language]
        );

        // Notify Admin via Socket
        io.to('admin-room').emit('new-booking', { id: result.id, customerName, equipmentId });

        res.json({ success: true, id: result.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Booking Status
app.put('/api/bookings/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await db.execute(
            'UPDATE bookings SET status = ? WHERE id = ?',
            [status, id]
        );
        res.json({ success: true, changes: result.changes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Chat Messages (for a session)
app.get('/api/messages/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const rows = await db.query('SELECT * FROM messages WHERE sessionId = ? ORDER BY timestamp ASC', [sessionId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Active Chat Sessions (Admin)
app.get('/api/chat-sessions', async (req, res) => {
    try {
        const rows = await db.query(`SELECT DISTINCT sessionId, MAX(timestamp) as lastMsg FROM messages GROUP BY sessionId ORDER BY lastMsg DESC`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SOCKET.IO - Live Chat

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-admin', () => {
        socket.join('admin-room');
        console.log('Admin joined chat room');
    });

    socket.on('join-session', (sessionId) => {
        socket.join(sessionId);
        console.log(`User joined session: ${sessionId}`);
    });

    socket.on('send-message', async (data) => {
        const { sessionId, sender, text } = data;

        // Save to DB
        try {
            const result = await db.execute(`INSERT INTO messages (sessionId, sender, text) VALUES (?, ?, ?)`, [sessionId, sender, text]);

            // Emit to specific session room (for user) and admin room
            io.to(sessionId).emit('receive-message', { ...data, id: result.id });
            io.to('admin-room').emit('admin-receive-message', { ...data, id: result.id });
        } catch (err) {
            console.error("Socket DB Error:", err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Catch-All Handler (Serve React App for any unmatched route)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
