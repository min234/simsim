const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const router = express.Router();

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 데이터베이스 사용자 이름
    password: process.env.DB_PASSWORD, // 데이터베이스 비밀번호
    database: 'memo' // 사용하고자 하는 데이터베이스 이름
});

// 데이터베이스 연결 확인
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// 모든 메모 조회 (최대 10개)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM notes ORDER BY created_at DESC LIMIT 10';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to fetch notes: ' + err.stack);
            return res.status(500).json({ error: 'Failed to fetch notes' });
        }
        res.json(results);
    });
});

// 새로운 메모 생성
router.post('/', (req, res) => {
    console.log('Received data:', req.body);
    const { title,name, content } = req.body;
    
    const deleteOldestMemo = () => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM notes ORDER BY created_at ASC LIMIT 1', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    // 메모 개수 확인 후 추가
    db.query('SELECT COUNT(*) AS count FROM notes', async (err, results) => {
        if (err) {
            console.error('Failed to count notes: ' + err.stack);
            return res.status(500).json({ error: 'Failed to count notes' });
        }

        if (results[0].count >= 10) {
            try {
                await deleteOldestMemo();
            } catch (deleteError) {
                console.error('Failed to delete oldest memo: ' + deleteError.stack);
                return res.status(500).json({ error: 'Failed to delete oldest memo' });
            }
        }

        // 새로운 메모 삽입
        const insertQuery = 'INSERT INTO notes (title, name,content  ) VALUES (?,?,?)';
        db.query(insertQuery, [title, name,content], (err, result) => {
            if (err) {
                console.error('Failed to create note: ' + err.stack);
                return res.status(500).json({ error: 'Failed to create note' });
            }
            res.json({ id: result.insertId, title,name, content});
        });
    });
});

// 특정 메모 삭제
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM notes WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Failed to delete note: ' + err.stack);
            return res.status(500).json({ error: 'Failed to delete note' });
        }
        res.json({ message: 'Note deleted' });
    });
});

//특정 메모 수정

router.put('/', (req, res) => {
    const { title, content,id } = req.body; 

    const query = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
    db.query(query, [title, content,id], (err, results) => {
        if (err) {
            console.error('Error updating memo:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Memo not found' });
        }
        res.json({ message: 'Memo updated successfully' });
    });
});

module.exports = router;