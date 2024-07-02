import Mountain from "./mountain";
import Treasure from "./treasure";
import { MapGridItem } from "./mapGridItem";
import { OutOfBoundsError } from "../types/errors";

class Map {
  mapStringGrid: string[][];
  mapGrid: MapGridItem[][] = [];

  constructor(mapDimensions: [number, number]) {
    console.log("Map created with dimensions: ", mapDimensions);
    this.mapStringGrid = new Array(mapDimensions[1])
      .fill(".")
      .map(() => new Array(mapDimensions[0]).fill("."));
    this.mapGrid = new Array(mapDimensions[1])
      .fill(undefined)
      .map(() => new Array(mapDimensions[0]).fill(undefined));
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

  getGridItemByCoordinates(x: number, y: number): MapGridItem | undefined {
    if (x >= this.mapGrid.length || y >= this.mapGrid[0].length)
      throw new OutOfBoundsError(
        `Tried to access a grid item out of bounds: ${x}-${y}`,
      );
    return this.mapGrid[x][y];
  }

  printMap() {
    console.table(this.mapStringGrid);
  }
}

export default Map;
