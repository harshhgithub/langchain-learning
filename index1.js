
import "dotenv/config";

import { ChatOpenRouter } from "@langchain/openrouter";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// 1. Initialize OpenRouter model
const model = new ChatOpenRouter({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    temperature: 0.3,
});

// 2. Create prompt template
const prompt = ChatPromptTemplate.fromTemplate(`
    You are a programming teacher.

    Explain {topic} in simple language.
    Give one practical example.
`);

// 3. Create output parser
const parser = new StringOutputParser();

// 4. Create chain
const chain = prompt.pipe(model).pipe(parser);

// 5. Execute chain
try {
    console.log("Sending request to OpenRouter...");

    const response = await chain.invoke({
        topic: "Object-Oriented Programming"
    });

    console.log("\nAI Response:\n");
    console.log(response);

} catch (error) {
    console.error("Error:", error.message);
}
