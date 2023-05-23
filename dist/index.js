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
// Importações
const venom_bot_1 = require("venom-bot"); // Importa a função create da biblioteca "venom-bot" para criar um cliente de WhatsApp
const dotenv_1 = __importDefault(require("dotenv")); // Importa a biblioteca "dotenv" para carregar variáveis de ambiente do arquivo .env
const { Configuration, OpenAIApi } = require("openai"); // Importa objetos Configuration e OpenAIApi para interagir com as APIs do OpenAI
// Criação do cliente do WhatsApp
const createOption = {
    session: "my-session", // Define a opção session como "my-session"
};
(0, venom_bot_1.create)(createOption)
    .then((client) => {
    start(client); // Inicia o cliente de WhatsApp
    console.log("Whats-Jarvis connected\n");
})
    .catch((erro) => {
    console.log("erro\n", erro);
});
dotenv_1.default.config(); // Carrega variáveis de ambiente do arquivo .env
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration); // Cria uma instância da API do OpenAI
// Função para obter a resposta do modelo GPT-3.5-turbo
const getDavinciResponse = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getDavinciResponse");
    console.log("prompt", prompt);
    const options = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    };
    try {
        const response = yield openai.createChatCompletion(options); // Gera uma resposta baseada no prompt fornecido usando o modelo GPT-3.5-turbo
        console.log(response["data"]["choices"][0]["message"]["content"]);
        return response["data"]["choices"][0]["message"]["content"]; // Retorna a resposta obtida como uma string
    }
    catch (error) {
        console.log("error", error);
    }
});
// Função para obter uma imagem gerada pela IA DALL-E
const getDalleResponse = (clientText) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getDalleResponse");
    console.log("clientText", clientText);
    const options = {
        prompt: clientText,
        n: 1,
        size: "1024x1024", // Define o tamanho da imagem desejada
    };
    try {
        const response = yield openai.createImage(options); // Gera uma imagem baseada na descrição fornecida usando o modelo DALL-E
        return response.data.data[0].url; // Retorna a URL da imagem gerada
    }
    catch (error) {
        return `❌ OpenAI Response Error: ${error}`;
    }
});
// Função que lida com os comandos enviados pelo usuário no WhatsApp
function commands(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = message.body.split(" ")[0];
        const command1 = message.body.split(" ")[1];
        const command2 = message.body.split(" ")[2];
        let firstWord = message.body.substring(0, message.body.indexOf(" "));
        console.log("command", command);
        console.log("command1", command1);
        console.log("command2", command2);
        console.log("firstWord", firstWord);
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
            // let firstWord = message.body.substring(0, message.body.indexOf(" "));
            switch (firstWord) {
                case iaCommands.davinci3:
                    const question = message.body.substring(message.body.indexOf(" "));
                    getDavinciResponse(question).then((response) => {
                        client.sendText(message.from === process.env.PHONE_NUMBER
                            ? message.to
                            : message.chatId, ` Chat GPT 🤖\n\n ${response}`);
                    });
                    break;
                case iaCommands.dalle:
                    const imgDescription = message.body.substring(message.body.indexOf(" "));
                    getDalleResponse(imgDescription).then((imgUrl) => {
                        client.sendImage(message.from === process.env.BOT_NUMBER
                            ? message.to
                            : message.chatId, imgUrl, imgDescription, "Imagem gerada pela IA DALL-E 🤖");
                    });
                    break;
                case iaCommands.triviaBot:
                case iaCommands.sticker:
                    let firstWord = message.body.substring(0, message.body.indexOf(" "));
                    const imgToSticker = message.body.substring(message.body.indexOf(" "));
                // console.log("firstWord", firstWord);
                // console.log("imgToSticker", imgToSticker);
            }
        }
        if (message.type == "image") {
            console.log("message.type === imagem");
            // Lógica para processar a imagem recebida, se necessário
            let firstWord = message.body.substring(0, message.body.indexOf(" "));
            const imgToSticker = message.body.substring(message.body.indexOf(" "));
            console.log("firstWord", firstWord);
            console.log("imgToSticker", imgToSticker);
            switch (firstWord) {
                case iaCommands.sticker:
                    let firstWord = message.body.substring(0, message.body.indexOf(" "));
                    const imgToSticker = message.body.substring(message.body.indexOf(" "));
                    console.log("firstWord", firstWord);
                    console.log("imgToSticker", imgToSticker);
            }
        }
    });
}
// Função que inicia o cliente do WhatsApp e trata as mensagens recebidas
function start(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start Client\n");
        client.onAnyMessage((message) => {
            console.log("Start Client\n");
            commands(client, message);
        });
    });
}
