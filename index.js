import { create } from "venom-bot";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_KEY,
});

create({
  session: "Whats-Jarvis",
  multidevice: true,
})
  .then((client) => {
    start(client);
    console.log("Whats-Jarvis connected\n");
  })
  .catch((erro) => {
    console.log("erro\n", erro);
  });

// const commands = (client, message) => {};

async function commands(client, message) {
  const iaCommands = {
    davinci3: "/bot",
    dalle: "/img",
  };

  let msg = message.body;
  let typeMsg = message.type;
  console.log("message.body", message.body);
  console.log("typeMsg", typeMsg);

  if (typeMsg == "chat") {
    let firstWord = msg.substring(0, msg.indexOf(" "));
    const question = msg.substring(msg.indexOf(" "));
    console.log("firstWord", firstWord);
    console.log("question", question);
  }

  // let firstWord = msg.substring(0, msg.indexOf(" "));
  // const question = msg.substring(msg.indexOf(" "));
  // console.log("firstWord", firstWord);
  // console.log("question", question);
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

async function start(client) {
  console.log("Start Client\n");
  // client.onAnyMessage((message) => commands(client, message));
  client.onAnyMessage((message) => {
    console.log("Start Client\n");
    commands(client, message);
  });
}
