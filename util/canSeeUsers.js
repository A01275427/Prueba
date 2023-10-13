module.exports = (request, response, next) => { 
    let hasPriviledge = false;

    for(let permission of request.session.priviledges) {
        if (permission.namePriviledge == 'canSeeUsers') {
            hasPriviledge = true;
        }
    }

    request.canSeeUsers = hasPriviledge; // Agrega el estado al objeto request

    next();
};
