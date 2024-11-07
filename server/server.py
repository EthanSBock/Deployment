from flask import Flask, request
from games import GameDB

app = Flask(__name__)


# Handling preflight requests //OPTIONS
@app.route('/games/<int:game_id>', methods=['OPTIONS'])
def handle_cors_options(game_id):
    return "", 204, {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "PUT, DELETE",
        "Access-Control-Allow-Headers" : "Content-Type"
        }


# Serverside response to request
@app.route("/games", methods=["GET"])
def retrieve_games():
    db = GameDB("games_db.db")
    print("db",db)
    games = db.getGames()
    return games, 200, {"Access-Control-Allow-Origin" : "*"}


# Retrieve ONE game
@app.route("/games/<int:game_id>", methods=["GET"])
def retrieve_game(game_id):
    print("Retrieving review with ID", game_id)
    db = GameDB("games_db.db")
    print("db",db)
    games = db.getGame(game_id)
    return games, 200, {"Access-Control-Allow-Origin" : "*"}


@app.route("/games", methods=["POST"])
def create_game():
    gameName = request.form["gameName"]
    authorName = request.form["authorName"]
    gamePlaytime = request.form["gamePlaytime"]
    rating = request.form["rating"]
    description = request.form["description"]
    db = GameDB("games_db.db")
    db.createGame(gameName, authorName, gamePlaytime, rating, description)
    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

@app.route("/games/<int:game_id>", methods=["PUT"])
def update_game(game_id):
    print("updating review with ID", game_id)
    
    db = GameDB("games_db.db")
    #Checking if game exists
    game = db.getGame(game_id)
    if game:
        gameName = request.form["gameName"]
        authorName = request.form["authorName"]
        gamePlaytime = request.form["gamePlaytime"]
        rating = request.form["rating"]
        description = request.form["description"]
        db.updateGame(game_id, gameName, authorName, gamePlaytime, rating, description)
        return "Updated", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"Game with id {game_id} not found.", 404, {"Access-Control-Allow-Origin" : "*"}


@app.route('/games/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    print("Deleting review with ID", game_id)
    db = GameDB("games_db.db")
    game = db.getGame(game_id)
    if game:
        db.deleteGame(game_id)
        return "Deleted", 200, {"Access-Control-Allow-Origin" : "*"}
    return f"Game with id {game_id} not found.", 404, {"Access-Control-Allow-Origin" : "*"}


@app.errorhandler(404)
def page_not_found(e):
     return "404 Not Found. The requested resource does not exist.", 404

@app.errorhandler(405)
def method_not_allowed(e):
    return "405 Method Not Found. The requested Method is not allowed", 405

def run():
    app.run(port=8080, host='0.0.0.0')

if __name__ == "__main__":
    run()