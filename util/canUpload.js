// canUpload.js
module.exports = (request, response, next) => { 
    let hasPriviledge = false;

    for(let permission of request.session.priviledges) {
        if (permission.namePriviledge == 'canUpload') {
            hasPriviledge = true;
        }
    }

    request.canUpload = hasPriviledge; // Agrega el estado al objeto request

    next();
};
