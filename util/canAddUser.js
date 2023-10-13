module.exports = (request, response, next) => { 
    let hasPriviledge = false;

    for(let permission of request.session.priviledges) {
        if (permission.namePriviledge == 'canAddUser') {
            hasPriviledge = true;
        }
    }

    request.canAddUser = hasPriviledge; // Agrega el estado al objeto request

    next();
};