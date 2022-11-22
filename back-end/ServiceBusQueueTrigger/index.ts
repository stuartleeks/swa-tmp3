import { AzureFunction, Context } from "@azure/functions"
import * as appInsights from "applicationinsights";

appInsights.setup();
const client = appInsights.defaultClient;

const serviceBusQueueTrigger: AzureFunction = async function (
    context: Context,
    redirectMessage: { path: string, redirectUrl: string },
    signalRMessages: { target: string, arguments: any[] }[]
): Promise<void> {
    context.log(`Process service bus message. Path=${redirectMessage.path}`);

    // Use this with 'tagOverrides' to correlate custom telemetry to the parent function invocation.
    context.log(`Write custom metric to Application Insights`);
    var operationIdOverride = { "ai.operation.id": context.traceContext.traceparent };
    client.trackMetric({
        name: "redirect",
        value: 1,
        properties: { path: redirectMessage.path, redirectUrl: redirectMessage.redirectUrl },
        tagOverrides: operationIdOverride
    });
    client.flush(); // demo aid - don't do this!

    context.log(`Send SignalR message`);
    context.bindings.signalRMessages = [{
        target: "redirect",
        arguments: [redirectMessage.path, redirectMessage.redirectUrl]
    }];
};

export default serviceBusQueueTrigger;
