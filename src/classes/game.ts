import Map from "./map";

class Game {
  _gameMap: Map | undefined;

  constructor() {
    console.log("Game is getting instanciated...");
  }

  setMap(map: Map) {
    this._gameMap = map;
  }

  printGameResults() {
    this._gameMap?.adventurers.forEach((adventurer) => {
      console.log(
        `A(${adventurer.identifier}) has ${adventurer.treasureCount} treasures and finished her exploraiton at coordinates: ${adventurer.coordinates}`,
      );
    });
  }

  playGame() {
    if (this._gameMap === undefined) {
      throw new Error("No map defined");
    } else {
      console.log("Game is being played...");
      while (this._gameMap.checkIfGameFinished()) {
        this._gameMap.adventurers.forEach((adventurer) => {
          if (adventurer.movementInstruction.length > 0) {
            adventurer.executeNextMove(this._gameMap as Map);
          }
        });
      }
    }
    this.printGameResults();
  }
}

export default Game;
