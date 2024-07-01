import Adventurer from "./adventurer";
import Mountain from "./mountain";
import Treasure from "./treasure";
import { MapGridItem } from "./mapGridItem";

class Map {
  mapStringGrid: string[][];
  mapGrid: MapGridItem[][] = [];
  adventurers: Adventurer[] = [];

  constructor(mapDimensions: [number, number]) {
    console.log("Map created with dimensions: ", mapDimensions);
    this.mapStringGrid = new Array(mapDimensions[1])
      .fill(".")
      .map(() => new Array(mapDimensions[0]).fill("."));
    this.mapGrid = new Array(mapDimensions[1])
      .fill(undefined)
      .map(() => new Array(mapDimensions[0]).fill(undefined));
  }
  checkIfGameFinished() {
    return this.adventurers.find(
      (adventurer) => adventurer.movementInstruction.length !== 0,
    );
  }
  addAdventurer(adventurer: Adventurer) {
    this.adventurers.push(adventurer);
    this.mapStringGrid[adventurer.coordinates[1]][adventurer.coordinates[0]] =
      adventurer.identifier;
  }
  addMountain(coordinates: [number, number]) {
    this.mapGrid[coordinates[0]][coordinates[1]] = new Mountain(coordinates);
    this.mapStringGrid[coordinates[1]][coordinates[0]] = "M";
  }
  addTreasure(coordinates: [number, number], quantity: number) {
    this.mapGrid[coordinates[0]][coordinates[1]] = new Treasure(
      coordinates,
      quantity,
    );
    this.mapStringGrid[coordinates[1]][coordinates[0]] = `T(${quantity})"`;
  }

  getDestination(x: number, y: number): MapGridItem {
    if (
      x >= this.mapGrid.length ||
      y >= this.mapGrid[0].length ||
      x < 0 ||
      y < 0
    )
      throw new Error("Invalid coordinates");
    let currentAdventurer = this.adventurers.find(
      (adventurer) =>
        adventurer.coordinates[0] === x && adventurer.coordinates[1] === y,
    );
    if (currentAdventurer) return currentAdventurer;
    return this.mapGrid[x][y];
  }

  printMap() {
    console.table(this.mapStringGrid);
  }
}

export default Map;
