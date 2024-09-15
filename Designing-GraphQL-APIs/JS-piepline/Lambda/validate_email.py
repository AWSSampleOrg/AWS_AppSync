#-*- encoding:utf-8 -*-
import json
import logging
import os

# logger setting
logger = logging.getLogger()
logger.setLevel(os.getenv("LOG_LEVEL", logging.DEBUG))

def lambda_handler(event,context):
    logger.info(json.dumps(event))
    email: str = event["arguments"]["input"]["email"]
    if email.endswith("@myvaliddomain.com"):
        return
    raise Exception(f"{email} is not a valid email.")
