from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from rasa_core.agent import Agent
from rasa_core.policies.keras_policy import KerasPolicy
from rasa_core.policies.memoization import MemoizationPolicy


import warnings
import ruamel.yaml as yaml
warnings.simplefilter('ignore', yaml.error.UnsafeLoaderWarning)


def train_dialogue(domain_file = '../data/reply.yml', model_path = '../models/dialogue',
				   training_data_file = '../data/pattern.md'):
					
	agent = Agent(domain_file, policies = [MemoizationPolicy(), KerasPolicy(max_history=3, epochs=700, batch_size=50)])
	data = agent.load_data(training_data_file)	

	agent.train(data)
				
	agent.persist(model_path)
	return agent


if __name__ == '__main__':
	train_dialogue()
