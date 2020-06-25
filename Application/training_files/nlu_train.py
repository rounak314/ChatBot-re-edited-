from rasa_nlu.training_data import load_data
from rasa_nlu.model import Trainer
from rasa_nlu.config import RasaNLUModelConfig
# from utils.logging.logger_script import Logger_class
import logging
from rasa_nlu.components import ComponentBuilder
import json
class Ner_model(object):
	def ner_model():
		try:
			args = {"pipeline": "tensorflow_embedding"}
			training_data = load_data("../data/nlu.md")
			config=RasaNLUModelConfig(args)
			trainer=Trainer(config)
			Interpreter=trainer.train(training_data)
			model_directory = trainer.persist('../models',fixed_model_name="ner_model")
		except Exception as e:
			print(e)
		

Ner_model.ner_model()
