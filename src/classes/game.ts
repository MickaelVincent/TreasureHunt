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

  getGameMap(): Map {
    if (this.gameMap === undefined) {
      throw new Error("No map defined");
    } else {
      return this.gameMap;
    }
  }
  getAdventurers(): Adventurer[] {
    if (this.adventurers.length === 0)
      throw new Error("No adventurers defined");
    return this.adventurers;
  }

  isFinished(): boolean {
    let unfinishedAdventurer = this.adventurers.find(
      (adventurer) => adventurer.movementInstruction.length !== 0,
    );
    return unfinishedAdventurer === undefined;
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
