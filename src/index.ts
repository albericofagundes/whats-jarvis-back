import { create } from "venom-bot";
import dotenv from "dotenv";
const { Configuration, OpenAIApi } = require("openai");

const createOption = {
  session: "my-session",
};

create(createOption)
  .then((client: any) => {
    start(client);
    console.log("Whats-Jarvis connected\n");
  })
  .catch((erro: any) => {
    console.log("erro\n", erro);
  });

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const getDavinciResponse = async (prompt: string) => {
  console.log("getDavinciResponse");
  console.log("prompt", prompt);
  const options = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const response = await openai.createChatCompletion(options);

    console.log(response["data"]["choices"][0]["message"]["content"]);

    return response["data"]["choices"][0]["message"]["content"];
  } catch (error) {
    console.log("error", error);
  }
};

// }

async function commands(client: any, message: any) {
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
          client.sendText(
            message.from === process.env.PHONE_NUMBER
              ? message.to
              : message.chatId,
            ` Chat GPT 🤖\n\n ${response}`
          );
        });
        break;
    }
  }

  if (message.type == "image") {
    console.log("message.type === imagem");
  }
}

async function start(client: any) {
  console.log("Start Client\n");
  client.onAnyMessage((message: any) => {
    console.log("Start Client\n");
    commands(client, message);
  });
}
