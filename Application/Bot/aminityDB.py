from pymongo import MongoClient

class AddAmenity(object):

	def StoreValues(self):
		client = MongoClient('mongodb://localhost:27017')
		db = client['testDB']
		data = db.amenity

		price = {
			'1BHK' : 'Rs. 40lakhs - Rs. 65lakhs',
			'2BHK' : 'Rs. 70lakhs - Rs. 90lakhs',
			'3BHK' : 'Rs. 1Cr - Rs. 3Cr'
		}

		dimension = {
			'1BHK' : '440sqft. - 850sqft',
			'2BHK' : '900sqft - 1500sqft',
			'3BHK' : '1200sqft - 2400sqft'
		}

		temp = {
			'location' : 'Bangalore',
			'price' : price,
			'dimension' : dimension
		}

		res = data.insert_one(temp)
		print(res)


class FetchAmenity(object):

	def GetDimension(self,bhk):
		client = MongoClient('mongodb://localhost:27017')
		db = client['testDB']
		data = db.amenity

		for temp in data.find({'location' : 'Bangalore'}):
			dimension = temp['dimension']
			return dimension[bhk]

	def GetPrice(self,bhk):
		client = MongoClient('mongodb://localhost:27017')
		db = client['testDB']
		data = db.amenity

		for temp in data.find({'location' : 'Bangalore'}):
			dimension = temp['price']
			return dimension[bhk]    

	def GetDetails(self,bhk):
		client = MongoClient('mongodb://localhost:27017')
		db = client['testDB']
		data = db.amenity

		for temp in data.find({'location' : 'Bangalore'}):
			details = temp['details']
			return details[bhk]			

	

# if __name__ == "__main__":
# 	obj = FetchAmenity()
# 	obj.GetDetails()

# if __name__ == "__main__":
# 	obj = AddAmenity()
# 	obj.StoreValues()
