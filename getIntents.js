const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");
const fs = require("fs");

const { WebhookClient } = require("dialogflow-fulfillment");

const getMainIntents = async () => {
  const key = {
    type: "service_account",
    project_id: "meghan-340721",
    private_key_id: "f5d69e4b88c39ae7f48dcc3bac852043d5f608bb",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMZL7f/3AoY3S1\nUPdd7F/CiDUuW3aR51YBCKBvSSEfhSXStx2FKrqYdCJTZs6M/CSDtFZH4It21pTb\n7uIExzYPiAHlN9TDKVUpCpDp/FwSZTYRNR0pXNsdfwpAFYBX6kJZEOdDLAxclPpV\nsVAtoDoHVxYdrp5XiW3ZLYMdCCwK9HHRetO/FkSbQWdmNkbhpWtv35mzWlM9tGXn\noGDbqOOUBZKwDpY3fIzMFMwvOHEvvvL+W9ZBmNes+5F7/7AAbh3QWQDaa0cZVo7S\nS/7LVSYomJEHQnV6BsUSfTlSVBNq5yiPjCwUbwZUCIYe7V9fBEjhslH+NR0BLNIC\nzST96/HFAgMBAAECggEABgJdQy7mqOvnjR1BQVAX9zZ8+ZYo+Jd2JcbYldAuWUWJ\n4r+QxWhDTWQ8gI+4IUO897WKiJASwsxDhI3F4d4kW7zUFptxrBrYTiXpdwJ6GcAi\n9NCZBhy3NPIrnlDtSetj2fZwbP51LFSkycc0VIefrucU3MINKAJgunjevFQ4YmLs\n7P4BKvhHgAgPi9Ww38otId2+m5JfPiRrnYFqrAYWb/leIEYqiONdoJlbF058VnyI\nBSxfVEmpTvP9Ym2zKLGxNbPr8YlIJMdcbjUinDGHDUfhRZyvuo9gGVwwtH7SRJGD\nvAcMu7hoKO+vdXXwOSVbpo1x0oq1e7DttyE3ic3QwQKBgQDCNZZ0ykrISPbKebFL\ngc2bfC77TSjaO1qdIrPmEw6+GG+UvxpyaI3XN6y0NF7xzrawuuvThlhIjU6amyfb\nC3/iasB5Fo42jK3Calpl61INpHcXFfO34T73Qns+eirLO/orcwKMSEzHZnvmKDXt\n030K1xIWITzopC8IEe22EC10ZQKBgQC5D9gwM/OkkboYbHW1C4OWFs5PpKmmGwlz\nqSHR+RFpa5pNbl02huRCMxwOfTz5I0qenYGEZcXOLI/ObVSXfMzW7dHvUZ2bcSD4\nEVjYIkzPxNNC9YZJdgA3+OV0gfavQatMpBA9VVxvYtz5S0sxMuwmJ5uHt4EfeUpC\nGEXfa49B4QKBgFPf8Orfswxs9qjbhcameLX+HAxMdqhJmgjjQ+7JrERNKWOEZVej\n8B5S3TO2qoqkTCJnmBHyo44x+RCskbn4bXLLx/SD2UeV2jVs2T3LM9TQgt5ljKyN\nizQecju5Z2H+tTyunxsW3pH/oOL12tSr0gUsfZMxJ60Ru34wwAkxU3BBAoGAQykk\n5Bl2inr4dnSmIxYSox2TsgOoLcgSHg97XqBtWTzbus4atfcuT3gM7pU005WjNv0i\nS9JDfxdc+SVkVbXNARM95QRRll/v/xcMjyOjjKN5qAtCuNZCLg3999JSnDfQ2veP\njTK1YRcX6sEQgMJiQVaOcyp9idaSxHnaocJ/MwECgYBdbs+iDer4j9NzzCL+n3mt\np3V/9Yus+SQ/5rtC3GBiBwFtg813+645xXIAENT+T4+UvoW82hRov3bOHXiL5dom\niKvI5uS6mi8QilFmoeZL50cBZ/bWvRwucJC1fxWjiFWKr7ok0iVjwFoF69zE9NGA\ncM3Aj5OpLfhtKavmGYWgvA==\n-----END PRIVATE KEY-----\n",
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
  return await response.map((intent) => intent.displayName);
};

exports.getMainIntents = getMainIntents;
