// Importações
import { create } from "venom-bot"; // Importa a função create da biblioteca "venom-bot" para criar um cliente de WhatsApp
import dotenv from "dotenv"; // Importa a biblioteca "dotenv" para carregar variáveis de ambiente do arquivo .env
const { Configuration, OpenAIApi } = require("openai"); // Importa objetos Configuration e OpenAIApi para interagir com as APIs do OpenAI

// Criação do cliente do WhatsApp
const createOption = {
  session: "my-session", // Define a opção session como "my-session"
};

create(createOption)
  .then((client: any) => {
    start(client); // Inicia o cliente de WhatsApp
    console.log("Whats-Jarvis connected\n");
  })
  .catch((erro: any) => {
    console.log("erro\n", erro);
  });

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration); // Cria uma instância da API do OpenAI

// Função para obter a resposta do modelo GPT-3.5-turbo
const getDavinciResponse = async (prompt: string) => {
  console.log("getDavinciResponse");
  console.log("prompt", prompt);
  const options = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const response = await openai.createChatCompletion(options); // Gera uma resposta baseada no prompt fornecido usando o modelo GPT-3.5-turbo

    console.log(response["data"]["choices"][0]["message"]["content"]);

    return response["data"]["choices"][0]["message"]["content"]; // Retorna a resposta obtida como uma string
  } catch (error) {
    console.log("error", error);
  }
};

// Função para obter uma imagem gerada pela IA DALL-E
const getDalleResponse = async (clientText: string) => {
  console.log("getDalleResponse");
  console.log("clientText", clientText);
  const options = {
    prompt: clientText, // Define a descrição da imagem
    n: 1, // Define o número de imagens a serem geradas
    size: "1024x1024", // Define o tamanho da imagem desejada
  };

  try {
    const response = await openai.createImage(options); // Gera uma imagem baseada na descrição fornecida usando o modelo DALL-E
    return response.data.data[0].url; // Retorna a URL da imagem gerada
  } catch (error) {
    return `❌ OpenAI Response Error: ${error}`;
  }
};

const getStickerResponse =async (clientText: string) => {
  
}

// Função que lida com os comandos enviados pelo usuário no WhatsApp
async function commands(client: any, message: any) {
  // const command = message.caption.split(" ")[0];

  // const parts = comment.split(' ');
  // const command1 = message.body.split(" ")[1];
  // const command2 = message.body.split(" ")[2];

  console.log("message.body", message.body);

  // let firstWord = message.body.substring(0, message.body.indexOf(" "));

  console.log("message.caption", message.caption);
  // console.log("command1", command1);
  // console.log("command2", command2);
  // console.log("firstWord", firstWord);

  const iaCommands = {
    davinci3: "/bot", // Comando para interagir com o modelo GPT-3.5-turbo
    dalle: "/img", // Comando para interagir com o modelo DALL-E
    poke: "/poke",
    link: "/link",
    sticker: "/fig",
    triviaBot: "/trivia",
  };

  if (message.type == "chat") {

    console.log("message.body", message.body);

    let firstWord = message.body.substring(0, message.body.indexOf(" "));

    switch (firstWord) {
      case iaCommands.davinci3:
        const question = message.body.substring(message.body.indexOf(" "));
        getDavinciResponse(question).then((response) => {
          client.sendText(
            message.from === process.env.PHONE_NUMBER
              ? message.to
              : message.chatId,
            ` Chat GPT 🤖\n\n ${response}`
          );
        });
        break;

      case iaCommands.dalle:
        const imgDescription = message.body.substring(
          message.body.indexOf(" ")
        );

        getDalleResponse(imgDescription).then((imgUrl) => {
          client.sendImage(
            message.from === process.env.BOT_NUMBER
              ? message.to
              : message.chatId,
            imgUrl,
            imgDescription,
            "Imagem gerada pela IA DALL-E 🤖"
          );
        });
        break;

      case iaCommands.triviaBot:

      // case iaCommands.sticker:
      // let firstWord = message.body.substring(0, message.body.indexOf(" "));
      // const imgToSticker = message.body.substring(message.body.indexOf(" "));

      // console.log("firstWord", firstWord);
      // console.log("imgToSticker", imgToSticker);
    }
  }

  if (message.type == "image" && message.caption === "/fig") {
    console.log("entrou /fig e imagem");

    getStickerResponse(message.type);
    // Lógica para processar a imagem recebida, se necessário

    // let firstWord = message.body.substring(0, message.body.indexOf(" "));
    // const imgToSticker = message.body.substring(message.body.indexOf(" "));

    // console.log("firstWord", firstWord);
    // console.log("imgToSticker", imgToSticker);

    // switch (firstWord) {
    //   case iaCommands.sticker:
    //     let firstWord = message.body.substring(0, message.body.indexOf(" "));
    //     const imgToSticker = message.body.substring(message.body.indexOf(" "));

    //     console.log("firstWord", firstWord);
    //     console.log("imgToSticker", imgToSticker);
    // }
  }
}

// Função que inicia o cliente do WhatsApp e trata as mensagens recebidas
async function start(client: any) {
  console.log("Start Client\n");
  client.onAnyMessage((message: any) => {
    console.log("Start Client\n");
    commands(client, message);
  });
}
