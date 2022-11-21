module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        status: 302,
        body: "Nothing to see here...",
        headers: {
            "Location": "https://stuartleeks.com"
        }
    };
}