#-*- encoding:utf-8 -*-
import json
import logging
import os
import uuid

# logger setting
logger = logging.getLogger()
logger.setLevel(os.getenv("LOG_LEVEL", logging.DEBUG))

def lambda_handler(event,context):
    logger.info(json.dumps(event))
    user_input = event["arguments"]["input"]
    return {
        **user_input,
        "id": str(uuid.uuid4())
    }
