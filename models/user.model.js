const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {
    
    constructor(newUser) {
        this.nameUser = newUser.nameUser || "Iván";
        this.lastNameUser = newUser.lastNameUser || "Paredes";
        this.emailUser = newUser.emailUser || "ivan@leadsales.io";
        this.passwordUser = newUser.passwordUser || "Hola123";
        this.team = newUser.team || this.emailUser;
        this.idRole = newUser.idRole || 1; // Asumiendo 1 como el valor por defecto.
    }

    save() {
        return bcrypt.hash(this.passwordUser, 12)
        .then((encryptedPassword) => {
            return db.execute(
                'INSERT INTO users(nameUser, lastNameUser, emailUser, passwordUser, team) VALUES (?, ?, ?, ?, ?)', 
                [this.nameUser, this.lastNameUser, this.emailUser, encryptedPassword, this.team]
            );
        })
        .then((result) => {
            const idUser = result[0].insertId;
            return db.execute('INSERT INTO usersroles(idUser, idRole) VALUES (?, ?)', [idUser, this.idRole]);
        })
        .catch((error) => {console.log(error)}); 
    }

    static fetchOne(emailUser) {
        return db.execute('SELECT * FROM users WHERE emailUser = ?' , 
            [emailUser]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    static fetch(id) {
        if (id) {
            return db.execute('SELECT * FROM users WHERE id = ?', 
            [id]);
        } else {
            return this.fetchAll();
        }
    }
    static fetchByTeam(teamValue) {
        return db.execute('SELECT * FROM users WHERE team = ?', [teamValue]);
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