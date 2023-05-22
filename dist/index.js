"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const venom_bot_1 = require("venom-bot");
const dotenv_1 = __importDefault(require("dotenv"));
const { Configuration, OpenAIApi } = require("openai");
const createOption = {
    session: "my-session",
};
(0, venom_bot_1.create)(createOption)
    .then((client) => {
    start(client);
    console.log("Whats-Jarvis connected\n");
})
    .catch((erro) => {
    console.log("erro\n", erro);
});
dotenv_1.default.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const getDavinciResponse = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getDavinciResponse");
    console.log("prompt", prompt);
    const options = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    };
    try {
        const response = yield openai.createChatCompletion(options);
        console.log(response["data"]["choices"][0]["message"]["content"]);
        return response["data"]["choices"][0]["message"]["content"];
    }
    catch (error) {
        console.log("error", error);
    }
});
// }
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
        if (message.type == "chat") {
            console.log("message.type", message.type);
            console.log("message.body", message.body);
            let firstWord = message.body.substring(0, message.body.indexOf(" "));
            switch (firstWord) {
                case iaCommands.davinci3:
                    const question = message.body.substring(message.body.indexOf(" "));
                    getDavinciResponse(question).then((response) => {
                        client.sendText(message.from === process.env.PHONE_NUMBER
                            ? message.to
                            : message.chatId, ` Chat GPT 🤖\n\n ${response}`);
                    });
                    break;
            }
        }
        if (message.type == "image") {
            console.log("message.type === imagem");
        }
    });
}
function start(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start Client\n");
        client.onAnyMessage((message) => {
            console.log("Start Client\n");
            commands(client, message);
        });
    });
}
