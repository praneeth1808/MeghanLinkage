const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");
const fs = require("fs");
// Your credentials

const CREDENTIALS = {
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

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {
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
  console.log(responses);
  const result = responses[0].queryResult;
  console.log(result);

  return {
    response: result.fulfillmentText,
  };
};

// detectIntent('en', 'hello', 'abcd1234');

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
  let responseData = await detectIntent("en", "date", "0");

  res.send(responseData.response);
});

// Start the server
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
