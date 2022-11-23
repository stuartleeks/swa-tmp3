
const redirects = {
    "/wsl": "https://wsl.tips",
    "/stuartleeks": "https://stuartleeks.com",
    "/microsoft": "https://microsoft.com",
}



module.exports = async function (context, req) {

    context.log("Redirect function starting");
    context.log("Context: " + JSON.stringify(context));

    const originalPath = getOriginalPath(req);
    const redirectUrl = getRedirectForPath(originalPath);
    
    // Send a message to service bus for later processing
    context.log("Sending service bus message");
    context.bindings.redirectQueue = {
        path: originalPath,
        redirectUrl
    };
    
    // redirect the client
    context.log(`Redirecting to: ${redirectUrl}`);
    context.res = {
        status: 302,
        body: "Nothing to see here...",
        headers: {
            "Location": redirectUrl
        }
    };
}

function getOriginalPath(req) {
    const originalUrl = req.headers['x-ms-original-url'];
    return new URL(originalUrl).pathname;
}

function getRedirectForPath(originalPath) {
    return redirects[originalPath] ?? "https://wsl.tips";
}
