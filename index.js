const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { getMainIntents } = require("./getIntents");
const { WebhookClient } = require("dialogflow-fulfillment");

// Your credentials
const CREDENTIALS_001Pandas = {
  type: "service_account",
  project_id: "x001meghan-pandas-hyo9",
  private_key_id: "ffc58934b21171a9b5116577a19b977eddce16e0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvbwWjhLTaOAua\nKwUAFVWukZH1ntUfQNvO+5ogeCnCfudBhcAWkWb/dAwMyzW50mvWdM+TR6xiyxE9\nMlQqj3jLxcQh8nFnvGdPtVrOYyPYFi3JyhTF2HPGZ8jr2DgHZbVr5XQZml/ZJtbM\nmETbmHnMkJbz84Lb8AZYaCOci68mHdMmTEUNjLECajQLZlTKv+nXX8qj3tMqt7tg\nMx9nf8sBE50TIqNzuoYPScExIsAWgh7c8OqOKg55ZCoFWwS0I+zoXGeWhQ5HtFuz\n5CQ97yx+Y2vzqDuGJyQIMgarEQF4Ai7yWG5VVVuxJkIQyusAD/LgMOKzq0oaTuW5\nWpUyLTpDAgMBAAECggEAOAAAlMnv0RjC21uQJQ6qYyckqHsjHO7fO5sk/+hbrDJG\nL6w6PPn9Ht40WoEjjUWWFscC28itRnv77MT8CPnzXVir2wpBGRQTBmalrewHrRqn\nUxqmtuD5VAQdJuvGNtZIq0B7ZxDYN8EmH/kbQd3SQ3KEPSsmQn7EB8R2WapdJpUm\nqGPob+l0rV3qLoMcOE9bKhusHzN876DdJo/8pVOHLLs1d1UY2dWG8GMoxH0rdySU\nnXphc5+m3ZVPv426OFHS5m7p897oalXXiSjqIEjSoKZZQ3Se2cWbdVTeEBvmrQY5\nC59YTCXs75/14mjdi9g4Yz8EE2PzirFI0q8jruWhgQKBgQDqvlWeYGqc7vey1kgc\nWxIfd8OTdY4Tpt7nHrJUxfdU+fDQ6vac3ULAE/8g5q+86Eq78pA9jsCE9tpE+EIu\n+avQKyu5iSFXLXiWnS0BOc6L2eaakOEiCSWTftBybbWZmiTEL+U20/aWGBLwvMTL\nyHkhtzCdh4rPMphNCQG55oJXCQKBgQC/Uc6y9uySFV+dvTpIjB+BB+ixz3VPlLZP\nnOAzm/NoOKR72bmuGiip0Bfmx+FXteaTWWejuNCwmsQT+2iZWZmNtW8iH6+IY/iW\n/dgWeH2YAnTdZ7LOhOGWFK8rbePKb/b94DS18fkkS0kX7oUxRTlfKnoP4xh3M59B\nBc+5J1Tt6wKBgQDQEN7A34MAEMwahtYp1AsPO09t34+MGaePQeUdQM9GUbfC5dCr\nH28v40mK9w4jqd28E3cIKQS5ljfHVCkNjB1fCTTbYhHcPKCbFzuxz3Qk/4Hn1KzI\nR0U4I/pMwrNpL3iRMEbBv0Tcqv/2w8rHOa0sVjxQFLjTiGv4NBiEly1GSQKBgAdn\n+lFxP500GJx5m8z9J6cOEFL5zffDsP8J+p/k1JpfPvbQaeC0gIh6VsKHUFDd6Mwh\ndOKgn+uGQjrny5fMISacNG4kvd3QyOnHb9sG1Q3SYoXDouddu4Hc0R8kROIsTWps\niH3WnSdrhqvXfu52WI83jLwatXK/29VfjTgErsP7AoGAQx5zZ2OTWF8kQBhqyQoL\nnpo1VBiL17cx3/VYjQGgeJCahEVZ0/s97SI+l9Rphk3EBCIDpqsYPO8eAZVL4L4t\nv6o3VsJkvq2b8jXAlpG+yAwcVfNUEiiA37c8tNCrUxMzKXv9Vo0TfMV9Rw3tPNGc\n3VSVp68aO8s4fqU+uKVQMWs=\n-----END PRIVATE KEY-----\n",
  client_email:
    "localpythoncode@x001meghan-pandas-hyo9.iam.gserviceaccount.com",
  client_id: "113391673901826371966",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/localpythoncode%40x001meghan-pandas-hyo9.iam.gserviceaccount.com",
};

const CREDENTIALS_002Seaborn = {
  type: "service_account",
  project_id: "q002meghan-01seaborn-htey",
  private_key_id: "7a1ede36b9d4222182fc778ada5ab05bc0c61ac0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJ8IWGBH4cILPx\nc9F6VhO8XSHppxjsmJ9lKNZ5H98+z8JgJa2FGaO+HgVdcFjsXUwWxXccN0157M5E\nYqPctUroKIDyfGGpDqpjSutJbgEA5AiKW303id+PvDnQ0PTakt9q6/+igB5H87Xj\nq7jNGKLEdlTvX4dw5yhKp5YXeLO7E1G14L10y+6B4a/wVow3c7cO7auzYaSM0Lym\n9WdB+hPB9ChuHzNQLJh+Utr/P8KgSyPp+xUohpWvNJX+ZaY/WSOOoLNVN2Bx2DhF\nV6sHVvcCL9WZURl24QIT1hN83zhTW+Ioc9AE9uNyiOa+XtIfi9XY8cg3e1cr3hw8\nL1c41oPFAgMBAAECggEANH9sXu5dEJfp38vxueGVyOLXVaRkpOF6krReqWeBRJWD\nXTZ+WTtUp7CrSWLTI0OP692S/QldgWRwLTQNkGurGRaqix+NzgLrhdustk68QQyH\nMdzd/SnBLl9LEn+4H/iNz4Ch2Q+Aj8kKULFMXjlY20U+CGrnzZCyl1HhAaIV63yA\nbrCEp21W8D4aOR/JNwoPJytI5qOvnCnwhFi5gtaiofgMEYFE8UqFni7Fh5dUeIJt\nwYwJdkP76u1C2zu0AnYlHt3iUWw7rn6mHtIuDhxoxSqin4jonvUzAFAMRKn7Joc2\nzCzOFyiJhNHQV94WeUk7oTHe+bv5OLrR6jQ122uRowKBgQDtPf1/VV6RS4xoqtoj\njQzAoZ386RjKl6pedbrhyXpnm62dwj9xkS3jhYEoWutMO2LAKLOrs3RW6VmUQ7kn\nuvPuTDcmo5mOwt7lOZYi3QCKKlA+H0t+UgI0Z0zG28clgcidjwmLZZ1M+8J0zqzl\nHB8cQSA99tScJvV1JzY+x/xPnwKBgQDZ5/jzGbHruNh16k1w5RLHQgnKLuFUB0rq\nSZTjUAhJTxzWXMnwuRNLIMQ9N+JbRnWx1he2eXHORuaeCpodOTJvXv23C+10H2f2\n2UuVCbt/R1PqiTo3UqvaGZtjl8RQzpRlwzrjWrIZ8sUD4rD7Sies/NI0xRagn569\nOrsNs/kiGwKBgC9uuHMv71NfZng6yJhZCBaveXXqaNGAl0iBg1bHQJjccE7dWm/r\nVeBqfdNCsk6whOLkgF+w5m7GAun4zFkcMM8RH+myxe3cGlJ8O/9GbmgxY4+4FBDy\ndoxhpuEPafaexyxxP7hGHbgZkdxmwfygrbupbbfV1NZPl73PlDHjLBgDAoGBAJx+\nn+kfbAtJvpO4yRMqQTk/cT52OreZYTEv1TEHelwD6Eb/brxmfre2+ZipuPQqfz5P\n7snLIHOvsdKQ9KvGNzWK+BXtCAUcxRKgbkrEKZc4R8kp8thmlCtXtqRpC8GpCySm\neHVt3nkKRHoM5WQjlqkDDYh+f0iuOlfWhR5LQcI/AoGAOoM/gPMZ96YMQ7v85O6r\nCFhqY5N95CUAKHsuIdfEafuaW2j7HfYBSiOat3TO7GjILt+DnRMhMke4mw90hjL2\nStIZmpDXVciyiy880y29VmOak45Uqekeqns4ImvUnYDbOpb85d0dtIMWCjHEk5y0\nppJbNdvruV5T05q6DI/pXV4=\n-----END PRIVATE KEY-----\n",
  client_email:
    "pythonlocalbot@q002meghan-01seaborn-htey.iam.gserviceaccount.com",
  client_id: "104912548270851655267",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/pythonlocalbot%40q002meghan-01seaborn-htey.iam.gserviceaccount.com",
};
// Detect intent method
const detectIntent_001Pandas = async (languageCode, queryText, sessionId) => {
  // Your google dialogflow project-id
  const PROJECID = CREDENTIALS_001Pandas.project_id;

  // Configuration for the client
  const CONFIGURATION = {
    credentials: {
      private_key: CREDENTIALS_001Pandas["private_key"],
      client_email: CREDENTIALS_001Pandas["client_email"],
    },
  };

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryText,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  //   console.log(responses);
  const result = responses[0].queryResult;
  //   console.log(result);

  return {
    response: result.fulfillmentText,
  };
};
const detectIntent_002Seaborn = async (languageCode, queryText, sessionId) => {
  // Your google dialogflow project-id
  const PROJECID = CREDENTIALS_002Seaborn.project_id;

  // Configuration for the client
  const CONFIGURATION = {
    credentials: {
      private_key: CREDENTIALS_002Seaborn["private_key"],
      client_email: CREDENTIALS_002Seaborn["client_email"],
    },
  };

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryText,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  //   console.log(responses);
  const result = responses[0].queryResult;
  console.log(result);

  return {
    response: result.fulfillmentText,
  };
};
// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(
  express.urlencoded({
    extended: true,
  })
);
webApp.use(express.json());

// Server Port
const PORT = process.env.PORT || 8081;

// Home route
webApp.get("/", (req, res) => {
  res.send(`Hello World.!`);
});

// Dialogflow route
webApp.post("/dialogflow", async (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });
  // create intentMap for handle intent
  let intentMap = new Map();
  const intents = await getMainIntents();
  intents.map((intent) => intentMap.set(intent, handleWebHookIntent));
  // add intent map 2nd parameter pass function
  // intentMap.set("001Pandas", handleWebHookIntent);
  // // add intent map 2nd parameter pass function
  // intentMap.set("002Seaborn", handleWebHookIntent);
  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
  //   res.send(responseData.response);
});
async function handleWebHookIntent(agent) {
  //   console.log(responseData.response);
  if (agent["intent"].includes("001Pandas")) {
    let responseData = await detectIntent_001Pandas("en", agent["query"], 0);
    agent.add(responseData.response);
  } else if (agent["intent"].includes("002Seaborn")) {
    let responseData = await detectIntent_002Seaborn("en", agent["query"], 0);
    agent.add(responseData.response);
  } else {
    agent.add("My idiot develoepr didnt train me");
  }
}

// Start the server
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
