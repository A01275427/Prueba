module.exports = (request, response, next) => { 
    let hasPriviledge = false;

    for(let permission of request.session.priviledges) {
        if (permission.namePriviledge == 'canDeleteUser') {
            hasPriviledge = true;
        }
    }

    request.canDeleteUser = hasPriviledge; // Agrega el estado al objeto request

    next();
};
