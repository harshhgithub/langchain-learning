import "dotenv/config"

import { ChatOpenRouter } from "@langchain/openrouter"
import { Tool, ToolMessage } from "langchain"
import { calculator } from "./calculator"

//initializing openrouter model
const model=new ChatOpenRouter({
    model:process.env.OPENROUTER_MODEL,
    temperature:0
});

//give calculator tool to the LLM
const modelWithTools=model.bindTools([calculator]);

//user question
const question="Calculate 456 multiplied by 789";

//ask the LLM
const aiMessage=await modelWithTools.invoke(question);
console.log("Tools calls:",aiMessage.tool_calls);

if(aiMessage.tool_calls.length>0)
{
    const call=aiMessage.tool_calls[0];
    if(call.name==="calculator"){
        const result=await calculator.invoke(call.args);
        console.log("Calculator result:",result);

        //send result back to the LLM
        const finalResponse=await model.invoke([
            {
                role:"user",content:question
            },
            aiMessage,
            new ToolMessage({
                content:String(result),
                tool_call_id:call.id
            })
        ]);
        console.log("\nFinal AI Response");
        console.log(finalResponse.content);
    }
}
else{
    console.log("The model did not request a tool call.");
}