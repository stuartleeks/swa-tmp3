
const redirects = {
    "/api/test2": "https://stuartleeks.com",
    "/stuartleeks": "https://stuartleeks.com",
    "/microsoft": "https://microsoft.com",
}

module.exports = async function (context, req) {

    context.log("Redirect function starting");
    context.log("Context: " + JSON.stringify(context));

    const originalPath = getOriginalPath(req, context);
    const redirectUrl = getRedirectForPath(originalPath);
    
    // Send a message to service bus for later processing
    context.log("Sending service bus message");
    context.bindings.redirectQueue = {
        path: originalPath,
    };
    
    // redirect the client
    context.log(`Redirecting to: ${redirectUrl}`);
    context.res = {
        status: 302,
        body: "Nothing to see here...",
        // body: JSON.stringify({
        //     ctx: context,
        //     originalUrl,
        //     originalPath,
        //     redirectUrl
        // }),
        headers: {
            "Location": redirectUrl
        }
    };
}

function getRedirectForPath(originalPath) {
    return redirects[originalPath] ? redirects[originalPath] : "https://wsl.tips";
}

function getOriginalPath(req, context) {
    const originalUrl = req.headers['x-ms-original-url'];
    const originalPath = new URL(originalUrl).pathname;
    context.log("Original Path: " + originalPath);
    return originalPath;
}
