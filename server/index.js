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


// DEBUG: Auth Diagnostics
app.get('/api/debug-auth', async (req, res) => {
    try {
        const adminRow = await db.get("SELECT * FROM admins WHERE username = 'admin'");

        if (!adminRow) {
            return res.json({ status: 'error', message: 'Admin user NOT found in database.' });
        }

        const envPass = process.env.ADMIN_PASSWORD || 'admin123';
        const isMatch = await bcrypt.compare(envPass, adminRow.password);

        res.json({
            status: 'info',
            adminUserFound: true,
            storedHashPrefix: adminRow.password.substring(0, 10) + '...',
            envPasswordConfigured: !!process.env.ADMIN_PASSWORD,
            envPasswordLength: envPass.length,
            testComparisonResult: isMatch ? 'PASS (Passwords match)' : 'FAIL (Database hash does not match ENV password)'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Bookings (Admin)
// Get Bookings (Admin)
app.get('/api/bookings', async (req, res) => {
    try {
        // Postgres lowercases column names by default. We use aliases to restore camelCase for the frontend.
        // This query works for both SQLite and Postgres.
        const query = `
            SELECT 
                id, 
                customerName as "customerName", 
                phone, 
                email, 
                equipmentId as "equipmentId", 
                startDate as "startDate", 
                endDate as "endDate", 
                status, 
                language, 
                timestamp 
            FROM bookings 
            ORDER BY timestamp DESC
        `;
        const rows = await db.query(query);
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
