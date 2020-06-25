import falcon
from MainBot import Bot_fuction
import json
import base64
import os
from SpeechRecogniser import SpeechRecodniser
from DBstorage import MongoOperation
from aminityDB import FetchAmenity


bot = Bot_fuction()
speech = SpeechRecodniser()
Mongo = MongoOperation()
Amenity = FetchAmenity()


#### Message fetching

class ChatBot(object):

	def on_post(self, req, res):

		s = req.params     
		print(s) 
		print(s['msg'])
		result = bot.RasaOperation(s['msg'])       #### returning the answer from bot
		print (result)
		Mongo.StoreInMongo(s['msg'],result,s['session'])
		
		if result[0].split(',')[0] == 'price' :
				result[0] = Amenity.GetPrice(result[0].split(',')[1])
		elif result[0].split(',')[0] == 'dimension' :
				result[0] = Amenity.GetDimension(result[0].split(',')[1])
		elif result[0].split(',')[0] == 'details' :
				result[0] = Amenity.GetDetails(result[0].split(',')[1])

		res.media  = result                        #### sending data back to URL
		res.status = falcon.HTTP_200

		## cors policy

		res.set_header('Access-Control-Allow-Origin', '*')
		res.set_header('Access-Control-Allow-Methods', '*')
		res.set_header('Access-Control-Allow-Headers', 'Content-Type')


### Speech to text response

class SpeechToText(object):

	def on_post(self , req , res):

		s = req.params
		# print(s)
		data = s['msg']
		l = []
		result = data.replace(' ','+')
		blobData = result.split(',')[1]

		decoded = base64.b64decode(blobData)

		f = open("audio.wav", "wb")
		f.write(decoded)
		f.close()
		temp = speech.recogniserFunc()      ### here temp is the converted message
		res.media = temp
		os.remove('audio.wav')

		res.status = falcon.HTTP_200

		## cors policy
		
		res.set_header('Access-Control-Allow-Origin', '*')
		res.set_header('Access-Control-Allow-Methods', '*')
		res.set_header('Access-Control-Allow-Headers', 'Content-Type')

class ContactUpdate(object):
    		
		def on_post(self,req,res):
				s = req.params
				print(s['phone'])
				print(s['mail'])

				Mongo.UpdateCred(s['phone'],s['mail'],s['session'])

				res.media = "ThankYou For sharing contact details one of our executive will surely get back to you."

				res.status = falcon.HTTP_200

				## cors policy
		
				res.set_header('Access-Control-Allow-Origin', '*')
				res.set_header('Access-Control-Allow-Methods', '*')
				res.set_header('Access-Control-Allow-Headers', 'Content-Type')


app = falcon.API()
app.req_options.auto_parse_form_urlencoded=True

app.add_route('/app', ChatBot())
app.add_route('/speech',SpeechToText())
app.add_route('/contact',ContactUpdate())
