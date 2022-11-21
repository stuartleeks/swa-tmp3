import { AzureFunction, Context } from "@azure/functions"

const serviceBusQueueTrigger: AzureFunction = async function(context: Context, redirectMessage: {path:string}): Promise<void> {
    context.log(`Process service bus message. Path=${redirectMessage.path}`);
};

export default serviceBusQueueTrigger;
