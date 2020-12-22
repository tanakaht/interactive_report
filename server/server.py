from flask import Flask
from flask import request, make_response, jsonify
import json
from flask_cors import CORS
from utils import find_related_datafacts


# サンプル

app = Flask(__name__)# , static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing


with open('./public/nations_change2.json') as f:
    datafacts = json.load(f)

@app.route("/", methods=['GET'])
def index():
    response = {'result': datafacts}
    return jsonify(response)

@app.route("/find", methods=['GET','POST'])
def find_datafacts():
    data = request.get_json()
    print(data)
    attrs = data['attrs'].split(' ')
    res = find_related_datafacts(data, datafacts, attrs)
    response = {'result': res}
    # print(res)
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)
