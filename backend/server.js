// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const memoRoutes = require('./memo');
const member = require('./member');
const login = require('./login')
const port = 5000;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,DELETE,PUT',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());

app.use('/api/notes', memoRoutes);
app.use('/api/member',member)
app.use('/api/login',login)

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
