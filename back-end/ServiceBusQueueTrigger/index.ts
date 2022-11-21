import { AzureFunction, Context } from "@azure/functions"
import * as appInsights from "applicationinsights";

appInsights.setup();
const client = appInsights.defaultClient;

const serviceBusQueueTrigger: AzureFunction = async function (context: Context, redirectMessage: { path: string }): Promise<void> {
    context.log(`Process service bus message. Path=${redirectMessage.path}`);

    // Use this with 'tagOverrides' to correlate custom telemetry to the parent function invocation.
    var operationIdOverride = { "ai.operation.id": context.traceContext.traceparent };

    client.trackMetric({
        name: "redirect",
        value: 1,
        properties: { path: redirectMessage.path },
        tagOverrides: operationIdOverride
    });
    client.trackEvent({
        name: "redirect",
        properties: { path: redirectMessage.path },
        tagOverrides: operationIdOverride
    });

    client.flush(); // demo aid - don't do this!
};

export default serviceBusQueueTrigger;
