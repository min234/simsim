
const mysql = require('mysql2');
const express =require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const bcrypt = require("bcryptjs");
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: process.env.DB_PASSWORD, 
    database: 'members' 
});
const SECRET_KEY = process.env.DB_PASSWORD;

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

router.post('/', (req, res) => {
    const { user_email, user_password } = req.body;

    const query = 'SELECT * FROM user WHERE user_email = ?';
  
    db.query(query, [user_email], (err, results) => {
        if (err) {
            console.error('Failed to fetch user: ' + err.stack);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }

        if (results.length > 0) {
            const users = results; 
         
            let found = false; 
            
            for (const user of users) {
                bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
                    if (err) {
                        console.error('Error during password comparison: ' + err.stack);
                        if (!found) {
                            return res.status(500).json({ error: 'Password comparison failed' });
                        }
                    }
                    
                    if (isMatch) {
                        const token = generateToken(user);
                        delete user.user_password; 
                        found = true;
                       console.log(token)
                        if (!res.headersSent) {
                            return res.json({ success: true, token, user });
                        }
                    }

                   
                    if ( !found) {
                        // 모든 사용자의 비밀번호가 확인되었지만 일치하는 사용자가 없는 경우
                        if (!res.headersSent) {
                            return res.json({ success: false, message: 'Invalid email or password' });
                        }
                    }
                });
            }

            // 모든 사용자가 처리되지 않았을 때의 추가 보호
            if (users.length === 0) {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token in authenticateToken:', token);
    console.log(authHeader)
    if (token == null) return res.sendStatus(401); // 토큰이 없으면 401 오류
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // 토큰 검증 실패 시 403 오류
      req.user = user;
      next();
    });
  };
  
router.get('/protected', authenticateToken, (req, res) => {
   
    res.json({ message: 'This is a protected resource', user: req.user });
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