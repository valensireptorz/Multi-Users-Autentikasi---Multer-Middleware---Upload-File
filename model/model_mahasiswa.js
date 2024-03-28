const connection = require('../config/database');

class Model_Mahasiswa {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mahasiswa ORDER BY id_mahasiswa DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO mahasiswa SET ?', Data, (err, result) => {
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
            connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE mahasiswa SET ? WHERE id_mahasiswa = ?', [Data, id], function(err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', id, function(err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Mahasiswa;
