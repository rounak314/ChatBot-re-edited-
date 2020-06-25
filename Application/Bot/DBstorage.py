from pymongo import MongoClient

class MongoOperation(object):

    def StoreInMongo(self, User, Bot, session):

        client = MongoClient('mongodb://localhost:27017')
        db = client['testDB']
        datas = db.data

        thread = {
            'User' : User,
            'Bot' : Bot
        }

        fg = 0

        for file1 in datas.find():
            if file1['sessionID'] == session:
                fg = 1

        chat = [] 

        if fg == 0:

            chat.append(thread)
            file1 = {
                    'sessionID' : session,
                    'phone' : '',
                    'email' : '',
                    'ChatMessages' : chat
                }
            datas.insert_one(file1)
            print('Insertion succesfull')

        else:

            for file1 in datas.find({'sessionID' : session}):
                file1['ChatMessages'].append(thread)
                print(file1)
                datas.delete_one({'sessionID' : session})
                datas.insert_one(file1)


    def UpdateCred(self,phone,mail,session):
        client = MongoClient('mongodb://192.168.1.131:27017')
        db = client['testDB']
        datas = db.data

        for file1 in datas.find({'sessionID' : session}):
            file1['phone'] = phone
            file1['email'] = mail

            datas.delete_one({'sessionID' : session})

            datas.insert_one(file1)



# if __name__ == "__main__":
#     ab = MongoOperation()
#     ab.StoreInMongo('Hey this is check','Check reply','uuhvuvhhiyoo87qqdd8687')
