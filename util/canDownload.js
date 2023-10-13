module.exports = (request, response, next) => { 
    let hasPriviledge = false;

    for(let permission of request.session.priviledges) {
        if (permission.namePriviledge == 'canDownloadPDF') {
            hasPriviledge = true;
        }
    }

    request.canDownloadPDF = hasPriviledge; // Agrega el estado al objeto request

    next();
};