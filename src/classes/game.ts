import Adventurer from "./adventurer";
import Map from "./map";

class Game {
  gameMap: Map | undefined;
  adventurers: Adventurer[] = [];

  constructor() {
    console.log("Game is getting instanciated...");
  }

  setMap(map: Map) {
    this.gameMap = map;
  }

  addAdventurer(adventurer: Adventurer) {
    this.adventurers.push(adventurer);
  }

  isFinished() {
    return this.adventurers.find(
      (adventurer) => adventurer.movementInstruction.length !== 0,
    );
  }

  playGame() {
    if (this.gameMap === undefined) {
      throw new Error("No map defined");
    } else {
      console.log("Game is being played...");
      while (!this.isFinished()) {
        this.adventurers.forEach((adventurer) => {
          if (adventurer.movementInstruction.length > 0) {
            adventurer.executeNextMove(this.gameMap as Map, this.adventurers);
          }
        });
      }
    }
  }
}

export default Game;
