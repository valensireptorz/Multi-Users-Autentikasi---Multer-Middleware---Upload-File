const connection = require('../config/database');

class Model_AlatTangkap {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM alat_tangkap ORDER BY id_alat_tangkap DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async create(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO alat_tangkap SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM alat_tangkap WHERE id_alat_tangkap = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0]);
                }
            });
        });
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE alat_tangkap SET ? WHERE id_alat_tangkap = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_AlatTangkap;
