from flask import Flask, jsonify, json
app = Flask(__name__)

my_dataBase = {}
@app.route('/delete/<data>')
def delete(data):
    if data in my_dataBase.keys():
        del my_dataBase[data]
        return jsonify('True')
        print(my_dataBase)
    else:
        print(my_dataBase)
        return jsonify('False')


@app.route('/ad/<data>')
def ad(data):
    if data:
        task = [i for i in data.split("-")]
        my_dataBase[task[0]] = {"taskId": task[0], "name": task[1],
                                "dueDate": task[2], "isDone": task[3]}
        print(my_dataBase)
        return jsonify('True')
    else:
        print(my_dataBase)
        return jsonify('False')


@app.route('/display')
def display():
    data = my_dataBase.values()
    dList = list(data)
    return jsonify(dList)
