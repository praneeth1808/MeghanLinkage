const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");
const fs = require("fs");

const { WebhookClient } = require("dialogflow-fulfillment");

const getMainIntents = async () => {
  const key = {
    type: "service_account",
    project_id: "meghan-340721",
    private_key_id: "791b918a2928bd4284f15ec87b402b281b281dde",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbziY/4f+YBZ3N\nOVDi0FXvdXyKx+nS+rty9qg7MAGvTpDT/PUUtsvyQhkCRSvQwOSiRzdajFo3xEsf\nmkZrKPowhC6FS9qoBNGdEbmsrpL4ABRffUlgiD0hvHzCZbRPu6ofa4Z8Oxuv6YyV\nTQ58EPBo8QmCA2j9xVCwYV1JJZgvQAGo66QucNBTXdIGND7jnJwd3ZY9Q1fExILa\n5Z22I+ejGx9F3JbnpV6nIYvT3EPXmI8RERUo8+RJoRbaCaomWlT4Kw0LIv9yvyuF\nAIvmyPY4hZUsp/OCzOYB8bqhwfhxtPAt1mkYO6HT1BuioZxK4J1pvhT3DXMqsPcH\nO+V560EdAgMBAAECggEABcendSfmzyFFUevLaAsUg0RluENjauWwvdbzivTH9eLP\nsbn+RDKQtE4fpPCxh/nFQY6PcpN8WGu2xUk/TYPypPs5dFvJ6gEWbSjru2xVKsHc\nOIKjcXFuMHgXehOYeO0xplgUCso35CuE1l9KbmFgRHRbxu/0Vl22wEDFTUV7bbKU\nFVBjyNFqWaqwzAhYRkRccYbWs9IHF8SQSq1CHLr823rGhRCPl8K0kAOnVdjn1Yq1\nTKemPcBymCiPevtvuk8rUNkOPYTVQwE7OYnNVqUpkd4tbbDZOLHmnzP9wVZKGqu5\ntsjyFZOjq8MMajjjxj+9Hnl1hh+a0Cjn7bv6fp3onQKBgQDYH2sIDnZMwgakLG6R\nTzOIc5id8zTCmz0XN6AkzaNRIYtbje8ziE61uJUO5nYoayOJHFzeuFDdWFtxVqXV\nLMjk8NIrKoV7+HsBHKMaoh9JjdjH0pQczxGqWv+F5QMuYQDZNBAjC2HFyWm2aj8J\nUSut4OKrsDwVIyOY/FR8jISHhwKBgQC4jaEc4Y01tankwcves1v69KBF8M4sbNOR\nNBQZPcs9byxdSA73lbXiaBjY0nbcBeBBbAu2rDWHXTtXklDWvrHTnUMxj8xP1zn/\ndYk2TTuR4g168RQ+5oG1JFw7jAjxKG/FJDK7P8MK5AAG538oHp+mfqETs9tRlRzI\ntghj9mcTOwKBgCtpRCp+HS0V3BemBR+S9Rr3fTRc4cAlRoQfXD+IPsHRJxjgzadg\nPc8qoGY5zIoZ2y1zUQQ7qaKMWPHPIchMEp5J8S1SgTWBl9OFWQ3EetxfbafVmIKg\n5T9+v8y5T4ZFXdJDLuqbIqyD5IQLm1XXxBpNDbrGz4q/YCsepCnQX96JAoGAfF0c\nW7z2jmH7uaaKfmj5K7SbKGZsWO2A6FFi1duZUK3RBI8hXt/o8EfbroitBfmDtDJd\n9lw3uh8udQWpKfzZElPgSs6vDIJpl+cZbpk+8kCVeupoDTcB4xI8gPgNsozgPMX2\n1c3S3kzkY8KuIlf4l5avbvp9aY2FFw/ruYj6zq8CgYBt2Qj0cm6/dh+1KPDWRwnL\nCN/XKgT2NhTDjDSj4uHXHN+c3vXtytMRlRWWx3aru6+/iqZU9kayu3uUFDl14Lhw\nlojYDxxdHGgSxDN1CgamnfllnuOq7J6yaVoe0f1BBh/Q9cJMgFn8fqOuiMJWzzmf\ne70gI1LncvgqmKBztigkQA==\n-----END PRIVATE KEY-----\n",
    client_email: "pythoncodelocal@meghan-340721.iam.gserviceaccount.com",
    client_id: "104972481949184714375",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/pythoncodelocal%40meghan-340721.iam.gserviceaccount.com",
  };

  const projectId = key.project_id;

  // Configuration for the client
  const CONFIGURATION = {
    credentials: {
      private_key: key["private_key"],
      client_email: key["client_email"],
    },
  };
  const intentsClient = new dialogflow.IntentsClient(CONFIGURATION);
  const projectAgentPath = await intentsClient.projectAgentPath(projectId);
  const request = {
    parent: projectAgentPath,
  };
  const [response] = await intentsClient.listIntents(request);
  console.log(response[0]);
  return await response.map((intent) => intent.displayName);
};

exports.getMainIntents = getMainIntents;
