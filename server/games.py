import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict


class GameDB:
    def __init__(self,filename):
        # Create a connection (instance/object) to a SQLite database 
        self.connection = sqlite3.connect(filename)

        self.connection.row_factory = dict_factory
        # Create a cursor object (access point into the database & back out)
        self.cursor = self.connection.cursor()
    
    def getGames(self):
        # Execute a query
        # Now that we have an access point we can fetch all or one
        # Only applicable use of fetch is following a select query
        self.cursor.execute("SELECT * FROM games")
        games = self.cursor.fetchall() # Returns all records from games
        return games
    
    def getGame(self,game_id):
        data = [game_id]
        self.cursor.execute("SELECT * FROM games WHERE id = ?", data)
        game = self.cursor.fetchone() # Returns one record
        return game

    def createGame(self, gameName, authorName, gamePlaytime, rating, description):
        # ADD A NEW GAME TO DATA BASE
        data = [gameName, authorName, gamePlaytime, rating, description]
        self.cursor.execute("INSERT INTO games (gameName, authorName, gamePlaytime, rating, description) VALUES(?,?,?,?,?)", data)
        self.connection.commit() #Verifies and appends it to the DB

    def updateGame(self, game_id, gameName, authorName, gamePlaytime, rating, description):
        data = [gameName, authorName, gamePlaytime, rating, description, game_id]
        self.cursor.execute("UPDATE games SET gameName = ?, authorName = ?, gamePlaytime = ?, rating = ?, description = ? WHERE id = ?", data)
        self.connection.commit()
    
    def deleteGame(self, game_id):
        self.cursor.execute("DELETE FROM games WHERE id = ?", (game_id,))
        self.connection.commit()

    def close(self):
        # Close the  connection
        self.connection.close()