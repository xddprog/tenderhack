from enum import Enum


class ChatEvents(str, Enum):
    USER = "userMessage",
    GPT = "gptMessage"