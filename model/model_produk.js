const connection = require('../config/database');

class model_Produk {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk a LEFT JOIN kategori b ' +
                'ON b.id_kategori = a.id_kategori ' +
                'ORDER BY a.id_produk DESC', (err, rows) => {
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
            connection.query('INSERT INTO produk SET ?', Data, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM produk a LEFT JOIN kategori b ON b.id_kategori = a.id_kategori WHERE a.id_produk = ${id}`, (err, rows) => {
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
            connection.query('UPDATE produk SET ? WHERE id_produk = ' + id, Data, function(err, result) {
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
            connection.query('DELETE FROM produk WHERE id_produk = ' + id, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
            
}

module.exports = model_Produk;
