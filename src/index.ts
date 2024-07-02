import path from "path";
import fs from "fs";
import { parseFile } from "./utils/parser";
import Game from "./classes/game";
import { printMap } from "./utils/printer";

let srcPath = path.join(__dirname, "entry.txt");
let data = fs.readFileSync(srcPath, { encoding: "utf8" });

let lines = data.split("\n");

let newGame: Game = parseFile(lines);
try {
  console.table(printMap(newGame.getGameMap(), newGame.getAdventurers()));
} catch (e) {
  console.log(e);
}

newGame.playGame();

try {
  console.table(printMap(newGame.getGameMap(), newGame.getAdventurers()));
} catch (e) {
  console.log(e);
}
