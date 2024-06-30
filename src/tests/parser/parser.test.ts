import path from "path";
import Game from "../../classes/game";
import {
  extractAdventurer,
  extractCoordinates,
  extractTreasure,
  parseFile,
} from "../../utils/parser";
import fs from "fs";

function getFileContent(fileName: string): string[] {
  let srcPath = path.join(__dirname, fileName);
  let data = fs.readFileSync(srcPath, { encoding: "utf8" });
  return data.split("\n");
}

test("Test the main function", () => {
  let newGame: Game = parseFile(getFileContent("entry.txt"));
  newGame._gameMap?.printMap();

  expect(newGame).toBeDefined();
  expect(newGame._gameMap).toBeDefined();
});

test("Parse a file with errors inside", () => {
  let fileContent = getFileContent("entryWithErrors.txt");
  expect(() => {
    parseFile(fileContent);
  }).toThrow(TypeError);
});

test("Coordinates regex test", () => {
  expect(extractCoordinates("M - 2 - 1")).toEqual([2, 1]);
  expect(extractCoordinates("M - 1 - 0")).toEqual([1, 0]);
  expect(extractCoordinates("C - 3 - 4")).toEqual([3, 4]);

  //Error cases
  expect(() => {
    extractCoordinates("T - 0 - 3 - 2");
  }).toThrow();

  expect(() => {
    extractCoordinates("C - A - 3 - 2");
  }).toThrow();

  expect(() => {
    extractCoordinates("C - 0 - A");
  }).toThrow();
});

test("Adventurer regex test", () => {
  expect(extractAdventurer("A - Mika - 0 - 1 - E - AADDAG")).toBeDefined();
  expect(extractAdventurer("A - Lara - 1 - 1 - S - AADADAGGA")).toBeDefined();

  expect(() => extractAdventurer("C - Lara - 1 - 1 - S - AADADAGGA")).toThrow();
  expect(() =>
    extractAdventurer("A - 12Lara - A - 1 - S - AADADAGGA"),
  ).toThrow();
  expect(() =>
    extractAdventurer("A - Lara - 1 - 1 - S - AABDADAGGA"),
  ).toBeDefined();
});

test("Treasure adventurer regex test", () => {
  expect(extractTreasure("T - 2 - 1 - 3")).toEqual([[2, 1], 3]);
  expect(extractTreasure("T - 4 - 2 - 2")).toEqual([[4, 2], 2]);
  expect(extractTreasure("T - 0 - 1 - 1")).toEqual([[0, 1], 1]);

  //Error cases
  expect(() => {
    extractTreasure("T - 0 - 3 - A");
  }).toThrow();

  expect(() => {
    extractTreasure("C - A - 3 - 2");
  }).toThrow();

  expect(() => {
    extractTreasure("C - 0 - A");
  }).toThrow();
});
