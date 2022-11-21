
const redirects = {
    "/api/test2": "https://stuartleeks.com",
    "/stuartleeks": "https://stuartleeks.com",
    "/microsoft": "https://microsoft.com",
}

module.exports = async function (context, req) {

    context.log("Redirect function starting");
    context.log("Context: " + JSON.stringify(context));

    const originalUrl = req.headers['x-ms-original-url'];
    const originalPath = new URL(originalUrl).pathname
    context.log("Original Path: " + originalPath);

    const redirectUrl = redirects[originalPath] ? redirects[originalPath] : "https://wsl.tips";
    context.log("Redirecting to: " + redirectUrl);

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