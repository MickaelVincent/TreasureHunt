import { InvalidCoordinatesError } from "../types/errors";
import Adventurer from "./adventurer";
import Map from "./map";

class Game {
  gameMap: Map | undefined;
  adventurers: Adventurer[] = [];

  setMap(map: Map) {
    this.gameMap = map;
  }

  addAdventurer(adventurer: Adventurer) {
    let destination = this.gameMap?.getGridItemByCoordinates(
      adventurer.coordinates[0],
      adventurer.coordinates[1],
    );
    if (
      this.adventurers.find(
        (adv) =>
          adv.coordinates[0] === adventurer.coordinates[0] &&
          adv.coordinates[1] === adventurer.coordinates[1],
      ) ||
      destination
    )
      throw new InvalidCoordinatesError(
        "Adventurer cannot start on another entity",
      );
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
