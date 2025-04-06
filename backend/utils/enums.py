from enum import Enum


class ChatEvents(str, Enum):
    USER = "userMessage"
    GPT = "gptMessage"
    ERROR = "errorMessage"
    GPT_END = "gptMessageEnd"
    CHAT_TITLE = "chatTitleMessage"