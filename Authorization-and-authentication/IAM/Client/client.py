#-*- encoding:utf-8 -*-
import json
import logging
import os
#Third Party
import boto3
from requests_aws4auth import AWS4Auth
import requests

# logger setting
logger = logging.getLogger()
logger.setLevel(os.getenv("LOG_LEVEL", logging.DEBUG))

SETTING = {
    "ApiUrl" : "",
    "ApiKey" : "",
    "Region" : ""
}

def invoke_function():
    body = json.dumps({
        "query" : 'query myQuery { InvokeFunction(id : "1", name : "Test") }'
    })


    auth = AWS4Auth(
        boto3.session.Session(profile_name='default').get_credentials().access_key,
        boto3.session.Session(profile_name='default').get_credentials().secret_key,
        boto3.session.Session(profile_name='default').region_name,
        "appsync"
    )
    response = requests.post(
        SETTING["ApiUrl"],
        auth = auth,
        data = body,
        headers = {}
    ).json()
    logger.debug(response["data"])


if __name__ == "__main__":
    invoke_function()
