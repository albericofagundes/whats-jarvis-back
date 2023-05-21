"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const openai_1 = require("openai");
const venom = require("venom-bot");
dotenv.config();
const configuration = new openai_1.Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_KEY,
});
// dotenv.config();
// const API_KEY = process.env.OPENAI_API_KEY;
// const ORGANIZATION_ID = "org-lK6FoYjUJgJLIa27lPY9rg6s";
// const headers = {
//   Authorization: `Bearer ${configuration.apiKey}`,
//   "OpenAI-Organization": configuration.organization,
// };
// Exemplo de solicitação usando o axios
// axios
//   .get("https://api.openai.com/v1/models", { headers })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
venom
    .create()
    .then((client) => {
    start(client);
    console.log("Whats-Jarvis connected\n");
})
    .catch((erro) => {
    console.log("erro\n", erro);
});
// const commands = (client, message) => {};
const openai = new openai_1.OpenAIApi(configuration);
// const getDavinciResponse = async (clientText) => {
//   const options = {
//     model: "text-davinci-35", // Modelo GPT a ser usado
//     prompt: clientText, // Texto enviado pelo usuário
//     temperature: 1, // Nível de variação das respostas geradas, 1 é o máximo
//     max_tokens: 4000, // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
//   };
//   try {
//     const response = await openai.createCompletion(options);
//     let botResponse = "";
//     response.data.choices.forEach(({ text }) => {
//       botResponse += text;
//     });
//     return `Chat GPT 🤖\n\n ${botResponse.trim()}`;
//   } catch (error) {
//     console.log("error", error);
//     // return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
//     return `❌ OpenAI Response Error: `;
//   }
// };
// const getDavinciResponse = async (clientText) => {
//   const model = "gpt-3.5-turbo"; // Modelo GPT a ser usado
//   const prompt = clientText; // Texto enviado pelo usuário
//   const temperature = 1; // Nível de variação das respostas geradas, 1 é o máximo
//   const maxTokens = 4000; // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
//   const params = {
//     model,
//     prompt,
//     temperature,
//     max_tokens: maxTokens,
//   };
//   try {
//     const response = await openai.complete(params);
//     let botResponse = response.choices[0].text.trim();
//     return `Chat GPT 🤖\n\n${botResponse}`;
//   } catch (error) {
//     console.log("error", error);
//     return `❌ OpenAI Response Error:`;
//   }
// };
// const getDavinciResponse = async (clientText) => {
//   const model = "gpt-3.5-turbo"; // Modelo GPT a ser usado
//   const prompt = clientText; // Texto enviado pelo usuário
//   const temperature = 1; // Nível de variação das respostas geradas, 1 é o máximo
//   const maxTokens = 4000; // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
//   const params = {
//     model,
//     prompt,
//     temperature,
//     max_tokens: maxTokens,
//   };
//   try {
//     const response = await openai.createCompletion(params);
//     let botResponse = response.choices[0].text.trim();
//     return `Chat GPT 🤖\n\n${botResponse}`;
//   } catch (error) {
//     console.log("error", error);
//     return `❌ OpenAI Response Error:`;
//   }
// };
const getDavinciResponse = (clientText) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        model: "text-davinci-003",
        prompt: clientText,
        temperature: 1,
        max_tokens: 4000, // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
    };
    try {
        const response = yield openai.createCompletion(options);
        let botResponse = "";
        response.data.choices.forEach(({ text }) => {
            botResponse += text;
        });
        return `Chat GPT 🤖\n\n ${botResponse.trim()}`;
    }
    catch (error) {
        console.log("error", error);
        // return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
        return `❌ OpenAI Response Error: `;
    }
});
// const DavinciResponse = async (clientText: any) => {};
const getDalleResponse = (imgDescription, clientText) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        prompt: clientText,
        n: 1,
        size: "1024x1024", // Tamanho da imagem
    };
    try {
        // const response = await openai.createImage(options);
        // return response.data.data[0].url;
    }
    catch (e) {
        // return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
    }
});
function commands(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const iaCommands = {
            davinci3: "/bot",
            dalle: "/img",
            poke: "/poke",
            link: "/link",
            sticker: "/fig",
            triviaBot: "/trivia",
        };
        let msg = message.body;
        let typeMsg = message.type;
        console.log("message.body", message.body);
        console.log("typeMsg", typeMsg);
        if (typeMsg == "chat") {
            console.log("typeMsg: chat");
            let firstWord = msg.substring(0, msg.indexOf(" "));
            const question = msg.substring(msg.indexOf(" "));
            console.log("firstWord", firstWord);
            console.log("question", question);
            switch (firstWord) {
                case iaCommands.davinci3:
                    console.log("iaCommands.davinci3", iaCommands.davinci3);
                    console.log("firstWord", firstWord);
                    const question = msg.substring(msg.indexOf(" "));
                    getDavinciResponse(question).then((response) => {
                        // console.log("response", response.data);
                        /*
                         * Faremos uma validação no message.from
                         * para caso a gente envie um comando
                         * a response não seja enviada para
                         * nosso próprio número e sim para
                         * a pessoa ou grupo para o qual eu enviei
                         */
                        // client:any.sendText(
                        //   message.from === process.env.BOT_NUMBER ? message.to : message.from,
                        //   response
                        // );
                        client.sendText(message.from === process.env.PHONE_NUMBER
                            ? message.to
                            : message.chatId, response);
                    });
                    break;
                case iaCommands.dalle:
                    console.log("iaCommands.dalle", iaCommands.dalle);
                    console.log("firstWord", firstWord);
                    const imgDescription = message.text.substring(message.text.indexOf(" "));
                    getDalleResponse(imgDescription, message).then((imgUrl) => {
                        client.sendImage(message.from === process.env.BOT_NUMBER ? message.to : message.from, imgUrl, imgDescription, "Imagem gerada pela IA DALL-E 🤖");
                    });
                    break;
                case iaCommands.poke:
                    console.log("iaCommands.poke", iaCommands.poke);
                    console.log("firstWord", firstWord);
                    break;
            }
        }
        if (typeMsg == "image") {
            console.log("typeMsg: image");
        }
        // let firstWord = msg.substring(0, msg.indexOf(" "));
        // const question = msg.substring(msg.indexOf(" "));
        // console.log("firstWord", firstWord);
        // console.log("question", question);
    });
}
// const commands = (client, message) => {
//   const iaCommands = {
//     davinci3: "/bot",
//     dalle: "/img",
//   };
//   let firstWord = message.text.substring(0, message.text.indexOf(" "));
//   const question = message.text.substring(message.text.indexOf(" "));
//   console.log("firstWord", firstWord);
//   console.log("question", question);
// };
function start(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start Client\n");
        // client.onAnyMessage((message) => commands(client, message));
        client.onAnyMessage((message) => {
            console.log("Start Client\n");
            commands(client, message);
        });
    });
}
