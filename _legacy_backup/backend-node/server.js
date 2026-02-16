const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;
const SECRET_KEY = 'secretkeythatshouldbelongenoughforsecuritypurposes';

app.use(cors());
app.use(bodyParser.json());

// Root Route
app.get('/', (req, res) => {
    res.send('VSQuarters Mock Backend is Running!');
});

// Mock Data
const users = [];
const projects = [];
const testRuns = [];

// Middleware to verify token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Auth Routes
app.post('/api/auth/register', (req, res) => {
    const { username, password, role } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already taken' });
    }
    const user = { id: users.length + 1, username, password, role };
    users.push(user);
    res.json({ message: 'User registered successfully!' });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ jwt: token });
    } else {
        res.status(401).json({ message: 'Incorrect username or password' });
    }
});

// Project Routes
const upload = multer({ dest: 'uploads/' });

app.post('/api/projects/upload', authenticateJWT, upload.single('file'), (req, res) => {
    const { name, description } = req.body;
    const project = {
        id: projects.length + 1,
        name,
        description,
        fileName: req.file ? req.file.filename : 'dummy.zip',
        createdAt: new Date(),
        userId: req.user.username // Simplification
    };
    projects.push(project);
    res.json(project);
});

app.get('/api/projects', authenticateJWT, (req, res) => {
    res.json(projects);
});

// Test Run Routes
app.post('/api/tests/run/:projectId', authenticateJWT, (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const testRun = {
        id: testRuns.length + 1,
        projectId,
        status: 'RUNNING',
        startTime: new Date(),
        qualityScore: 0,
        logs: '',
        report: ''
    };
    testRuns.push(testRun);

    // Simulate Async Execution
    setTimeout(() => {
        testRun.status = 'COMPLETED';
        testRun.endTime = new Date();
        testRun.qualityScore = Math.floor(Math.random() * 40) + 60;
        testRun.logs = 'INFO: Simulated execution via Node.js backend.\nSUCCESS: All tests passed.';
        testRun.report = JSON.stringify({ score: testRun.qualityScore, evaluation: "Good", improvements: ["Use real backend"] });
    }, 3000);

    res.json(testRun);
});

app.get('/api/tests/project/:projectId', authenticateJWT, (req, res) => {
    const projectId = parseInt(req.params.projectId);
    res.json(testRuns.filter(t => t.projectId === projectId));
});

app.listen(port, () => {
    console.log(`Mock Backend running on http://localhost:${port}`);
});
