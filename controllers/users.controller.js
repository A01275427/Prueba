const User = require("../models/user.model");
const bcrypt = require('bcryptjs');

exports.getSignUp = (request, response, next) => {

    let error = request.session.error || false;

    if (error) {
        request.session.error = false;
    }

    response.render('users/signUp.ejs', {
        nameUser: '',
        isLoggedIn: request.session.isLoggedIn || false,
        error: error,
        priviledges: request.session.priviledges || [],
    });
};

exports.postSignUp = (request, response, next) => {

    const user = new User({
        nameUser: request.body.nameUser,
        lastNameUser: request.body.lastNameUser,
        emailUser: request.body.emailUser,
        passwordUser: request.body.passwordUser,
        team: request.body.team,
    });

    user.save()
        .then(() => {
            return response.redirect('/users/login');
        }).catch((error) => {
            console.log(error);
            request.session.error = error;
            response.redirect('/users/signUp');
        });
};

exports.getLogin = (request, response, next) => {

    response.render('users/login.ejs', {
        nameUser: '',
        isLoggedIn: request.session.isLoggedIn || false,
        priviledges: request.session.priviledges || [],
        errorPriviledge: false, 
        errorAccount: false, 
        databaseError: false
    });
};

exports.postLogin = (request, response, next) => {

    User.fetchOne(request.body.emailUser)
    .then(([users, fieldData]) => {

        const user = users[0];

        if (users.length > 0) {
            bcrypt.compare(request.body.passwordUser, user.passwordUser)
            .then(doMatch => {
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.user = user;
                    User.getPriviledge(user.idUser)
                    .then(([priviledges, fieldData]) => {
                        return request.session.save(err => {
                            request.session.priviledges = priviledges;
                            //Login Exitoso
                            response.redirect('/leads/upload');
                        });
                    }).catch(error => {
                        //Error al obtener privilegios
                        console.error(error);
                        response.render('users/login.ejs', { errorPriviledge: true, errorAccount: false, databaseError: false });
                    });
                }
            }).catch(error => {
                //Error al comparar contraseñas
                console.log(error);
                response.render('users/login.ejs', { errorPriviledge: false, errorAccount: true, databaseError: false });
            });
        } else {
            //El correo no existe en la base de datos
            response.render('users/login.ejs', { errorPriviledge: false, errorAccount: true, databaseError: false });
        }
    }).catch((error) => {
        //Error tratando de conectar con la base de datos
        console.log(error);
        response.render('users/login.ejs', { errorPriviledge: false, errorAccount: false, databaseError: true });
    });
};

exports.getConsultUsers = (request, response, next) => {
    const teamValue = request.session.user.team;  // Obtener el valor de "team" de la sesión actual

    User.fetchByTeam(teamValue)
        .then(([rows, fieldData]) => {
            console.log(rows);
            console.log(fieldData);

            return response.render('users/consultUsers.ejs', {
                users: rows,
                nameUser: request.session.nameUser || '',
                isLoggedIn: request.session.isLoggedIn || false,
                priviledges: request.session.priviledges || [],
                canConsultUsers: request.canConsultUsers,
                canAddUser: request.canAddUser,
                // canSeeUsers: request.canSeeUsers,
                canDeleteUser: request.canDeleteUser,
            });
        
        }).catch((error) => {
            console.log(error);
            response.redirect('/leads/upload');
        });
};


exports.getLogout = (request, response, next) => {
    request.session.destroy((error) => {
        if (error) {
            console.log(error);
            return response.redirect('/');
        }
        response.redirect('/users/login');
    });
};

exports.getAddUser = (request, response, next) => {
    response.render('users/addUser.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        priviledges: request.session.priviledges || [],
        canUpload: request.canUpload,
        canConsultReports: request.canConsultReports,
        canConsultUsers: request.canConsultUsers,
        canAddUser: request.canAddUser,
    })
};

exports.postAddUser = (request, response, next) => {
    let roleMap = {
        "admin": 2,  // Asume que "admin" tiene idRole 1
        "seller": 3  // Asume que "seller" tiene idRole 2
    };

    const user = new User({
        nameUser: request.body.nameUser,
        lastNameUser: request.body.lastNameUser,
        emailUser: request.body.emailUser,
        passwordUser: request.body.passwordUser,
        team: request.session.user.team,  // Obtener el valor "team" del usuario logueado
        idRole: roleMap[request.body.role]  // Convertir el valor "role" en su respectivo idRole
    });

    user.save()
        .then(() => {
            return response.redirect('/users/addUser');
        }).catch((error) => {
            console.log(error);
            request.session.error = error;
            response.redirect('/users/addUser');
        });
};

