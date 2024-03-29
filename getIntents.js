const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const express = require("express");
const fs = require("fs");

const { WebhookClient } = require("dialogflow-fulfillment");

const getMainIntents = async () => {
  const key = {
    type: "service_account",
    project_id: "meghan-340721",
    private_key_id: "5ea687eb9f0dcda5f48b6f1ce99e3396bfb318d6",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMUsmdweDjs20C\nRNPOtR21zgISIB8yhVaOcL6e638fGMOPWSUvqPWUJFpaG2mYeTwyGrmC9oLxS9CF\nIL7tIk+grXs+bhougycJhDrrhOx8xVvUFi2SCUoAeCpu5nn068gpNzwL2pKiGd0n\nGvfhEbKW8FLISXYnrPG3NI9nsPxKaIYBEX4H6Ypm3g3RVrv6vLnCEu81O4QHtew1\n3J83ZUg//k1rXIFhBP7To/dl3IPzbjgdqeTzLywjzj207IlSqkzTeYh38jg3Hmjm\nyM3WU6DEAp7sbLtQJmAlPHwC6UGWcFlHu/lkIhhvTGClSHAFtB+hbNVarSoCRm90\nGuMc0GMTAgMBAAECggEAG7COfTAkm4cZ20hbkfROkfBYrH8o6y5RxBz4YE4W3K58\n9iTFGtfhbBGfIv37CfxIEZw4jsx8g1ncaOY+qaFQPDy2aof+SVZhyHLgj0Fk0SXn\n426b/2H94uFmEsBuP6hiaF+BZjPZUlmB9IY9mIVO+BCaj2URO6A+466eTpWYIzcX\ntWv3ewGRTsdGTkbOdv/2CCNjCYBNAsiUQeSgp9p00DLuBcvepZkyPjNQUa8SuAsm\nL8RH//BI0C7QSwL4En2HFz3Kw4ZZbw3NYZ8C9/XScNRXGAvzsFyeHHgJoczuxVLP\nHSEUDJCU/5IYwQHtMY3nEwFrZ7J5uMBr9B5NuMHFVQKBgQD+mFjUfAYhxzR+ccok\n1MLcLxIyKP8dM4d5d8QO+upDrQyXEekF7/k5M45a2xO7HODAXCTTBb1o3Zw3BYNr\n9gxs15c9iuznsI6dlyOPpoxcMxH+YsyYP1jmzHVp1sTZcM89UlAAtPTW6R4PR9PR\nowfz5x3tMq/CwGqQL/n8LRVu9QKBgQDNc2ykVIBuvSHpfWhWW4/Zn1s2Ohl7KWWa\nB8moC57mHfSEKQ8L90E+t79MLlWmZ44q13StCY3QztidaSUHs6XT+JKUcle85GB7\nROlhUugLJPxydzwJ+tDGbxj0+noGvlJr7rqkKxZTHeSiaj+ImFcJGTJnDOJly4v7\nCW9+x4G05wKBgFnsnZOPqurLXbM7pdaUf68dwSOOb211AejZcJqJ7ayxtry1SsUa\nGcEmgKV+s91nOcs3wJn4cQpVHBQjEmRTp9fZ3kWSiFLdfcIT3C+k9/ao4zYi13j/\nBvueQ+p6PVVADzLtm+xj/gbamA91o09scian/14EhSgYpor/JyD3G5bxAoGBAIFq\n2x3tCPY495rAX7A+fzAD/Q38rT5zBkhv7WyI3XBxoCx8PLk56IScdMmFSnjHNLvx\n+tJheU72bWdC64udc7FCHPubx376kXg1IZooAnm6s7dbOpvCvi6xnxP6kFGdJAhP\nWoy9g5OZ+gMBUMI3zGOz1pcpe5fKD4R0HiLLg/4zAoGBAMybHW9VUz3b3WLxxtCl\nFW2PzbwVXoDqX0dAKfiaR+4mNZzyd/ancEg6p/rKJ9x+2HcTAbFlNDpl0YBjCPQz\nj9yFeZf1rBplDW890ybzf/2bU3U1IvO2eSu1RaZdutvMwWHYG52aFQkH5rub24mi\n2boQgJJcXWsdsTGmBxA/e+gw\n-----END PRIVATE KEY-----\n",
    client_email: "owner-94@meghan-340721.iam.gserviceaccount.com",
    client_id: "115764356010432261943",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/owner-94%40meghan-340721.iam.gserviceaccount.com",
  };
;
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
