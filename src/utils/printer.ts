import fs from "fs";
import Adventurer from "../classes/adventurer";
import Map from "../classes/map";

export function printMap(map: Map, adventurers: Adventurer[]): string[][] {
  let actualMapGrid = map.getGrid();

  let mapDimensions = [actualMapGrid[0].length, actualMapGrid.length];

  let stringMap: string[][] = new Array(mapDimensions[0])
    .fill([])
    .map(() => new Array(mapDimensions[1]).fill("."));

  actualMapGrid.forEach((row, x) => {
    row.forEach((column, y) => {
      if (column === undefined) {
        stringMap[y][x] = ".";
      } else {
        stringMap[y][x] = column.getIdentifier();
      }
    });
  });
  adventurers.forEach((adventurer) => {
    stringMap[adventurer.coordinates[1]][adventurer.coordinates[0]] =
      adventurer.getIdentifier();
  });

  return stringMap;
}

export function exportFile(path: string, map: Map, adventurers: Adventurer[]) {
  try {
    let content = `C - ${map.getGrid().length} - ${map.getGrid()[0].length}\n`;
    map.getGrid().forEach((row) => {
      row.forEach((column) => {
        if (column !== undefined) {
          content += `${column.getTechnicalIdentifier()}`;
        }
      });
    });
    adventurers.forEach((adventurer) => {
      content += `${adventurer.getTechnicalIdentifier()}`;
    });
    fs.writeFileSync(path, content);
  } catch (e) {
    console.log(e);
  }
}
