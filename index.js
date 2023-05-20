import { create } from "venom-bot";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

create({
  session: "Whats-Jarvis",
  multidevice: true,
})
  .then((client) => {
    start(client);
    console.log("Whats-Jarvis connected");
  })
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  console.log("Start Client");
}
