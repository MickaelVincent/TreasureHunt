import Map from "./map";

class Game {
  _gameMap: Map | undefined;

  constructor() {
    console.log("Game is getting instanciated...");
  }

  setMap(map: Map) {
    this._gameMap = map;
  }
}

export default Game;
