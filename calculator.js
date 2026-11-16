import {tool} from "@langchain/core/tools";
import {z} from "zod";

export const calculator=tool(
    async({a,b,operation})=>{
        switch (operation){
            case"add":
            return a+b;
            case "subtract":
                return a-b;
            case "multiply":
                return a*b;
            case "divide":
                return a/b;
            default:
                throw new Error("Invalid operation");
        }
    },
    {
        name:"calculator",
        description:"perform addition,subtraction,multiplication and division",
        schema:z.object({
            a:z.number().describe("First number"),
            b:z.number().describe("Second number"),
            operation:z.enum([
                "add",
                "subtract",
                "multiply",
                "divide"
            ])
        })
    }
);