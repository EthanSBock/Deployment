# Game Review Application

## Resource

**games**

Attributes:
* `id`: Unique identifier (auto-generated) 
* `gameName` (string): The name of the game
* `authorName` (string): Name of the reviewer
* `gamePlaytime` (real): Total hours of playtime by user
* `rating` (integer): Rating of the game (1-5)
* `description` (string): A brief description of the game

## Database Schema

```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY,
  gameName TEXT NOT NULL,
  authorName TEXT NOT NULL,
  gamePlaytime REAL NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  description TEXT NOT NULL
);```


## REST Endpoints

Name                     | Method | Path
-------------------------|--------|------------------
Retrieve game collection | GET    | /games
Retrieve game member     | GET    | /games/*\<int:id\>*
Create game member       | POST   | /games
Update game member       | PUT    | /games/*\<int:id\>*
Delete game member       | DELETE | /games/*\<int:id\>*