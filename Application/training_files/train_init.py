from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

import logging

from rasa_core.agent import Agent
from rasa_core.policies.keras_policy import KerasPolicy
from rasa_core.policies.memoization import MemoizationPolicy
from rasa_core.policies.form_policy import FormPolicy

import warnings
import ruamel.yaml as yaml
warnings.simplefilter('ignore', yaml.error.UnsafeLoaderWarning)


if __name__ == '__main__':
	logging.basicConfig(level='INFO')

	domain_file = "../data/reply.yml"
	training_data_file = '../data/pattern.md'
	model_path = '../models/dialogue'

	agent = Agent(domain_file, policies=[MemoizationPolicy(max_history=3), KerasPolicy(max_history=3, epochs=700, batch_size=10), FormPolicy()])
	data = agent.load_data(training_data_file)
	agent.train(data)
	agent.persist(model_path)
