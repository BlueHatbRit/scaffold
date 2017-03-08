const errors = require('../errors');

const prepareError = function prepareError(err, req, res, next) {
    console.log(err);
    // Most errors will hopefully be generated by us, if not though
    // we'll generate a new one so we can handle them all the same way.
    if (!(err instanceof errors.ScaffoldError)) {
        if (err.name === 'UnauthorizedError') {
            err = new errors.UnauthorizedError({
                err: err,
                statusCode: err.status,
                message: err.message
            });
        } else {
            err = new errors.ScaffoldError({
                err: err,
                statusCode: err.statusCode
            });
        }
    }

    // TODO: find some express error logging middleware
    //console.log(err);

    // Set the response status code, really the most important thing
    res.statusCode = err.statusCode;

    res.set({
        // Don't cache this response
        'Cache-Control': 'no-cache, private, max-stale=0, post-check=0, pre-check=0 no-store, must-revalidate'
    });

    next(err);
};

const JSONErrorRenderer = function JSONErrorRenderer(err, req, res, next) {
    res.json({
        errors: [{
            message: err.message,
            errorType: err.errorType
        }]
    });
};

const HTMLRenderer = function HTMLRenderer(err, req, res, next) {
    let templateData = {
        message: err.message,
        code: err.statusCode
    };

    if (err.statusCode == 500 && process.env.NODE_ENV !== 'production') {
        templateData.stack = err.stack;
    }

    // Only render the error page if the error was a 500. If it's something like
    // an Unauthorised error then render the 404 for security. That way we don't
    // alert the user that it exists but they can't access it, this is standard
    // practice.
    if (err.statusCode === 500) {
        res.render('error', templateData); // Assume no templating error
    } else {
        res.render('404');
    }
};

pageNotFound = function pageNotFound(req, res, next) {
    next(new errors.NotFoundError({message: 'page not found'}));
};

module.exports = {
    // JSON based errors from the API
    handleJSONResponse: [
        prepareError,
        JSONErrorRenderer
    ],
    // HTML based errors from the web-console
    handleHTMLResponse: [
        prepareError,
        HTMLRenderer
    ],
    pageNotFound: pageNotFound
};