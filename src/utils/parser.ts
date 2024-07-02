import Game from "../classes/game";
import Map from "../classes/map";
import Adventurer from "../classes/adventurer";
import { mapDirection, mapOrientation } from "./mappers";
import { EntityType } from "../types/type";

export function parseFile(lines: string[]): Game {
  let newGame: Game = new Game();
  let newMap: Map | undefined = undefined;

  let configurationLines = lines.filter(
    (line) => line.length > 0 && !line.startsWith("#"),
  );
  let mapConfiguration = configurationLines.shift();
  try {
    if (!mapConfiguration?.startsWith("C"))
      throw new TypeError("No map configuration found in the file");
    else {
      newMap = new Map(extractCoordinates(mapConfiguration));
      newGame.setMap(newMap);
    }

    for (let config of configurationLines) {
      switch (config[0]) {
        case EntityType.Map: {
          throw new Error("Map already defined");
        }
        case EntityType.Mountain: {
          if (newMap !== undefined) {
            newMap.addMountain(extractCoordinates(config));
          } else throw new ReferenceError("No map defined");
          break;
        }
        case EntityType.Treasure:
          if (newMap !== undefined) {
            newMap.addTreasure(...extractTreasure(config));
          } else throw new ReferenceError("No map defined");
          break;
        case EntityType.Adventurer: {
          if (newMap !== undefined) {
            newGame.addAdventurer(extractAdventurer(config));
          } else throw new ReferenceError("No map defined");
          break;
        }
        case "#":
          console.log("Comment: ", config);
          break;
        default:
          throw new TypeError("Unknown instruction");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
  return newGame;
}

export function extractCoordinates(line: string): [number, number] {
  const regex = /[C-M] - (\d+) - (\d+)/g;
  const array = [...line.matchAll(regex)];

  if (array.length === 0) throw new TypeError("Invalid coordinates");
  return [parseInt(array[0][1]), parseInt(array[0][2])];
}

export function extractAdventurer(line: string): Adventurer {
  const regex = /A - (\w+) - (\d+) - (\d+) - (\w) - (\w+)/g;
  const array = [...line.matchAll(regex)];

  if (array.length === 0) throw new TypeError("Invalid adventurer");
  return new Adventurer(
    array[0][1],
    [parseInt(array[0][2]), parseInt(array[0][3])],
    mapOrientation(array[0][4]),
    array[0][5].split("").map((direction: string) => mapDirection(direction)),
  );
}

export function extractTreasure(line: string): [[number, number], number] {
  const regex = /T - (\d+) - (\d+) - (\d+)/g;
  const array = [...line.matchAll(regex)];

  if (array.length === 0) throw new TypeError("Invalid adventurer");
  return [
    [parseInt(array[0][1]), parseInt(array[0][2])],
    parseInt(array[0][3]),
  ];
}
