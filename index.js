const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { getMainIntents } = require("./getIntents");
const { WebhookClient } = require("dialogflow-fulfillment");
const getKey = require("./getMongoKey");
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

const CREDENTIALS_004PandasUG = {
  type: "service_account",
  project_id: "t004meghan-01pandasusergu-kgli",
  private_key_id: "cc623d1ec2620bdd1728b92cb6107c3c19cfdbd9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDh0lcCXbtwASEk\nUkeVtZ/fCOGjCn4yqhaRA/jvPdbVO7hF6UVEd+0QMx3OyzRSd7PpRrtzlPM2F9r9\nicXuoVWTMYqM1hc61Peah+MXeONXloYM97wdHzfMKqgwaycSrIrg9ibo/4ZjpAjS\ndnlwK7IeQJJ9kBZ9/U/twVClZL/FyZVcWPRXk/q2g5CglFWJzWwj9hYTthn4HXKh\n+C/gaHjuO30ecjbU4A77c662gbvaYX6tY8T9me6cP8fXnrukA1gOjwBmMtK0On0e\necpBsHbTZHx/nEsFBLFQ3eHhPpzulz2cuvUup24JC1/479QPzQGRoeRl1Gm7mdH4\nNmzHNjxtAgMBAAECggEACAmA8EQewi9AGzdUdecXcAw0X6WldS8pi3K9PuKQDVnJ\nRq+1N+kexldTZcNEsvSwsgpC7Kut9kxmDmUDZulWDt2SBU4vWHgw8c6JThIO4VSp\no7eDefPc/Aa+oq6FnvwGG1iXbO5/PXeemsL9snjTp5D7xb1Fl6lW2WrqcGCEFMl1\nRdaTrGqwH70rUsPMTHtOoww5S9K2vjwoUKI2O7ijLUF4io7IPk2zFPmoSRw3lF/n\nkT1RqBsve3vRffKM4D1RVz4BA5tQKUb8nJS1NvuVOzWfaoi7jkMdQNNdkrbVjkKX\nF8s6wBh6AJm8Zw0bzYgVOk0mwt9ZzPFBfA1rS+r+PwKBgQD7yg3DDPWT3z/KHfP8\n2HzqpDOiq/rfASAYTVB1qvwWKDArkGuO1ONUnEIndmZCZUV3r21MzIGRlYSZ0dov\nrrR4XiIuqx9U1M2B9YSXXyXJZiAuFYBmJLk73Wjdc1UKu8Z1FgxcyKujgXGamycx\nweZy6PXAIn9sS4xlRchW4hGTcwKBgQDlmR1sjx7BAuoZmdNuAk0JHYulZIwjib2w\nuschqJ+075HX/+okZWfcKCA2qXhqMRBmWh0BHhH86yZpXrfjuq2xJaipYlwCY+HF\nX5R5N0spXH2VdnCdJx85+KFCUlHOqY2FQotqGgJdl0TuYfQArUn3KCoTsAfQdiM3\n+0MUKCu4nwKBgBsmp6M/0391lHBcGIJMafP3buX8u5muimJ0e9ekb3iILuGTujV1\nuWnXS77roo1IVFxam2OrrdEgGWNo4KlBoo5UQEVeCIviQqLf8cNM7EsyawftI6Jg\nFWViM7ulgyccJoNbtEuRDAkenTx5vJk9+narrkxgq/LmlqYZB0hvKkwHAoGBAK73\nkzPCkYY3CV1/G1+vQzOaH2xoBl+ivTrr64qb7TE+jF8V+EHKQW7F6V6eoVQTldLa\nA1ZxqvWZ4cjU1MAn5+uirjh+620q3sfBwezqFU4s3MtE2ib4xFQyQ/m9r/gUv/N4\ntbOipIDcITykywSlCkPeiMo+EIZtMQOdaA35WvAzAoGBAMpDn6rNBeWNL6Q4tijQ\nOo7J4NbVyPJG6abyUy7u33D+QCl09i2yE1GGokowZ165rggBQNWyDn0FzVRiDzZ4\n+bEBp6A3WNPSdiES2I7s3QP290SLjaVyktKT5JVhJvlPN1cGDNKICdC2s6F85tmF\nllq1RxFwtZKSI+PozqwrxopI\n-----END PRIVATE KEY-----\n",
  client_email: "ug-421@t004meghan-01pandasusergu-kgli.iam.gserviceaccount.com",
  client_id: "101679122352024676162",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/ug-421%40t004meghan-01pandasusergu-kgli.iam.gserviceaccount.com",
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
  const result = responses[0].queryResult;

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
  const result = responses[0].queryResult;

  return {
    response: result.fulfillmentText,
  };
};

const detectIntent_004PandasUG = async (languageCode, queryText, sessionId) => {
  // Your google dialogflow project-id
  const PROJECID = CREDENTIALS_004PandasUG.project_id;

  // Configuration for the client
  const CONFIGURATION = {
    credentials: {
      private_key: CREDENTIALS_004PandasUG["private_key"],
      client_email: CREDENTIALS_004PandasUG["client_email"],
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
  const result = responses[0].queryResult;

  return {
    response: result.fulfillmentText,
  };
};
const detectIntent_StackoverFlowGroup = async (
  key,
  languageCode,
  queryText,
  sessionId
) => {
  // Your google dialogflow project-id
  const PROJECID = key.project_id;

  // Configuration for the client
  const CONFIGURATION = {
    credentials: {
      private_key: key["private_key"],
      client_email: key["client_email"],
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
  const result = responses[0].queryResult;

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
  console.log("got here");
  if (agent["intent"].includes("001Pandas")) {
    let responseData = await detectIntent_001Pandas("en", agent["query"], 0);
    agent.add(responseData.response);
  } else if (agent["intent"].includes("002Seaborn")) {
    let responseData = await detectIntent_002Seaborn("en", agent["query"], 0);
    agent.add(responseData.response);
  } else if (agent["intent"].includes("004PandasUG")) {
    let responseData = await detectIntent_004PandasUG("en", agent["query"], 0);
    agent.add(responseData.response);
  } else if (agent["intent"] == "Default Fallback Intent") {
    agent.add("I'm sorry, i don't have enough infomrmation on this");
  } else {
    console.log(agent["consoleMessages"][0]["text"]);
    await getKey(parseInt(agent["consoleMessages"][0]["text"])).then(
      async (key_res) => {
        console.log(key_res);
        let responseData = await detectIntent_StackoverFlowGroup(
          key_res[0].key,
          "en",
          agent["query"],
          0
        );
        console.log(responseData.response);
        agent.add(responseData.response);
      }
    );
    // agent.add("I'm sorry, i don't have enough infomrmation on this");
  }
}

// Start the server
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
