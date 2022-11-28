
const redirects = {
    "/swa": "https://learn.microsoft.com/en-us/azure/static-web-apps/overview",
    "/functions": "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
    "/service-bus": "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview",
    "/signalr": "https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-overview",
    "/microsoft": "https://microsoft.com",
    "/stuartleeks": "https://stuartleeks.com",
    "/jamiedalton": "https://jamied.me/about/",
    "/wsl": "https://wsl.tips",
    "/rick": "https://www.youtube.com/watch?v=DLzxrzFCyOs",
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
    return redirects[originalPath] ?? "https://www.youtube.com/watch?v=DLzxrzFCyOs";
}
