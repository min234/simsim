
const mysql = require('mysql2');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD, 
    database: 'members'
});

// 회원 가입 라우트
router.post('/', async (req, res) => {
    console.log('Received data:', req.body);
    const { user_id, user_password, user_name, user_email } = req.body;

    try {
        // 1. 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(user_password, 10); // 비밀번호 해싱

        // 2. 해싱된 비밀번호를 사용하여 사용자 정보 저장
        const insertQuery = 'INSERT INTO user (user_id, user_password, user_name, user_email) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [user_id, hashedPassword, user_name, user_email], (err, result) => {
            if (err) {
                console.error('Failed to create user: ' + err.stack);
                return res.status(500).json({ error: 'Failed to create user' });
            }
            res.json({ user_id, user_name, user_email }); // 비밀번호는 응답에 포함하지 않음
        });
    } catch (err) {
        console.error('Error during user creation: ' + err.stack);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
router.get('/', (req, res) => {
    const query = 'SELECT * FROM user ORDER BY _no DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to fetch user: ' + err.stack);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }
        res.json(results);
    });
});
module.exports = router;
