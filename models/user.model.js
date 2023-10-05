const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {
    
    constructor(newUser) {
        this.nameUser = newUser.nameUser || "Iván";
        this.lastNameUser = newUser.lastNameUSer || "Paredes";
        this.emailUser = newUser.emailUser || "ivan@leadsales.io";
        this.passwordUser = newUser.passwordUser || "Hola123";
    }

    save() {
        return bcrypt.hash(this.passwordUser, 12)
        .then((encryptedPassword) => {
            return db.execute(
                'INSERT INTO users(nameUser, lastNameUser, emailUser, passwordUser) VALUES (?, ?, ?, ?)', 
                [this.nameUser, this.lastNameUser, this.emailUser, encryptedPassword]
            );
        })
        .then((result) => {
            // Obtener el idUser generado
            const idUser = result[0].insertId;

            // Insertar el registro en la tabla usersroles
            return db.execute('INSERT INTO usersroles(idUser, idRole) VALUES (?, ?)', [idUser, 1]);
        })
        .catch((error) => {console.log(error)}); 
    }

    static fetchOne(emailUser) {
        return db.execute('SELECT * FROM users WHERE emailUser = ?' , 
            [emailUser]);
    }

    static getPriviledge(idUser) {
        return db.execute(
            `SELECT p.namePriviledge
            FROM users u, usersroles ur, roles r, rolespriviledges rp, priviledges p
            WHERE u.idUser = ?
            AND u.idUser = ur.idUser
            AND ur.idRole = r.idRole
            AND rp.idRole = r.idRole
            AND rp.idPriviledge = p.idPriviledge`, 
            [idUser]);
    }
}