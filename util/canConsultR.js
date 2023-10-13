module.exports = (request, response, next) => { 
    let hasPriviledge = false;

    for(let permission of request.session.priviledges) {
        if (permission.namePriviledge == 'canConsultReports') {
            hasPriviledge = true;
        }
    }

    request.canConsultReports = hasPriviledge; // Agrega el estado al objeto request

    next();
};
