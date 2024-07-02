import Mountain from "./mountain";
import Treasure from "./treasure";
import { MapGridItem } from "./mapGridItem";
import { OutOfBoundsError } from "../types/errors";

class Map {
  mapGrid: MapGridItem[][];

  constructor(mapDimensions: [number, number]) {
    this.mapGrid = new Array(mapDimensions[0])
      .fill([])
      .map(() => new Array(mapDimensions[1]).fill(undefined));
  }

  getGrid(): MapGridItem[][] {
    return this.mapGrid;
  }

  addMountain(coordinates: [number, number]) {
    this.mapGrid[coordinates[0]][coordinates[1]] = new Mountain(coordinates);
  }
  addTreasure(coordinates: [number, number], quantity: number) {
    this.mapGrid[coordinates[0]][coordinates[1]] = new Treasure(
      coordinates,
      quantity,
    );
  }

  getGridItemByCoordinates(x: number, y: number): MapGridItem | undefined {
    if (x >= this.mapGrid.length || y >= this.mapGrid[0].length)
      throw new OutOfBoundsError(
        `Tried to access a grid item out of bounds: ${x}-${y}`,
      );
    return this.mapGrid[x][y];
  }

  getTechnicalIdentifier(): string {
    return `C - ${this.mapGrid.length} - ${this.mapGrid[0].length}\n`;
  }
}

export default Map;
