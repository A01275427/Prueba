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
                        console.log("Aquí empiezan los privilegios");
                        console.log(priviledges);
                        console.log("Aqui terminan los privilegios");
                        return request.session.save(err => {
                            request.session.priviledges = priviledges;
                            response.redirect('/leads/upload');
                        });
                    }).catch(error => {
                        console.error(error);
                        response.redirect('/users/login');
                    });
                }

            }).catch(error => {
                console.log(error);
                response.redirect('/users/login');
            });
        } else {
            response.redirect('/users/login');
        }
    }).catch((error) => {
        console.log(error);
    });
};
