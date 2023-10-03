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
                [this.nameUser, this.lastNameUser, this.emailUser, encryptedPassword]);
        }).catch((error) => {console.log(error)}); 
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
            AND rp.idRol = r.idRole
            AND rp.idPriviledge = p.idPrivilegde`, 
            [idUser]);
    }
}