
const redirects = {
    "/api/test2": "https://stuartleeks.com",
    "/stuartleeks": "https://stuartleeks.com",
    "/microsoft": "https://microsoft.com",
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const originalUrl = req.headers['x-ms-original-url'];
    const originalPath = new URL(originalUrl).pathname

    const redirectUrl = redirects[originalPath] ?? "https://wsl.tips";

    context.res = {
        status: 302,
        body: "Nothing to see here...",
        // body: JSON.stringify({
        //     ctx: context,
        //     originalUrl,
        //     originalPath
        // }),
        headers: {
            "Location": redirectUrl
        }
    };
}