from flask import Flask, request #ONLY IMPORT ALLOWED
from dummydb import DummyDB

app = Flask(__name__)
db = DummyDB("dummydb.db")
print("db",db.readAllRecords())


# Serverside response to request
@app.route("/games", methods=["GET"])
def retrieve_games():
    games = db.readAllRecords()
    return games, 200, {"Access-Control-Allow-Origin" : "*"}


@app.route("/games", methods=["POST"])
def create_game():
    print("Request data is", request.form)
    db.saveRecord({"name":request.form["name"],"description":request.form["description"],"rating":request.form["rating"]})

    #return status code
    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}


@app.errorhandler(404)
def page_not_found(e):
     return "404 Not Found. The requested resource does not exist.", 404

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()