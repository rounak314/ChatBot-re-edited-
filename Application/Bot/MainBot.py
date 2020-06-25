import IPython
from rasa_core.agent import Agent
from rasa_core.interpreter import RasaNLUInterpreter
import time

# from Application.DisplayPost import ChatBot

interpreter = RasaNLUInterpreter('../models/default/ner_model')
agent = Agent.load('../models/dialogue', interpreter=interpreter)

class Bot_fuction:
    
    def RasaOperation(self, msg):
        botMessage = []
        # print(msg)
        responses = agent.handle_message(msg)
        # print(msg)
        for r in responses:
            botMessage.append(r.get('text'))

        

        return botMessage