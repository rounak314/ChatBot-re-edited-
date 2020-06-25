from pymongo import MongoClient


client = MongoClient('mongodb://192.168.1.131:27017')

db = client['testDB']

datas = db.data

thread = {
    'User' : 'New chat',
    'Bot' : 'Reply is new'
}

fg = 0

for file1 in datas.find():
    if file1['sessionID'] == 'dcsjhhkk88698dsdbfdsfhvadvdv9785yf':
        fg = 1
        
chat = [] 

if fg == 0:
    chat.append(thread)
    file1 = {
            'sessionID' : 'dcsjhhkk88698dsdbfdsfhvadvdv9785yf',
            'ChatMessages' : chat
        }
    datas.insert_one(file1)
    print('Insertion succesfull')
else:
    for file1 in datas.find({'sessionID' : 'dcsjhhkk88698dsdbfdsfhvadvdv9785yf'}):
        file1['ChatMessages'].append(thread)
        print(file1)
        datas.delete_one({'sessionID' : 'dcsjhhkk88698dsdbfdsfhvadvdv9785yf'})
        datas.insert_one(file1)

# chat = []


 
# chat.append(thread)

# InputData = {
#     'sessionID' : 'dcsjhhkk886986hjbhjbuyf',
#     'ChatMessages' : chat
# }

# res = datas.update_one(
#     {"sessionID" : "dcsjhhkk886986hjbhjbuyf"},
#     {
#     '$set':{"ChatMessages" : chat}
#     }
# )

# print(res)