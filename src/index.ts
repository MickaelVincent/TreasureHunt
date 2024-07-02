import path from "path";
import fs from "fs";
import { parseFile } from "./utils/parser";
import Game from "./classes/game";

let srcPath = path.join(__dirname, "entry.txt");
let data = fs.readFileSync(srcPath, { encoding: "utf8" });

let lines = data.split("\n");

let newGame: Game = parseFile(lines);

newGame.gameMap?.printMap();

newGame.playGame();
