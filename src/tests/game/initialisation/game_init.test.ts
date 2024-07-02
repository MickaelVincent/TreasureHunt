import fs from "fs";
import path from "path";

import { parseFile } from "../../../utils/parser";
import {
  InvalidCoordinatesError,
  OutOfBoundsError,
} from "../../../types/errors";

function getFileContent(fileName: string): string[] {
  let srcPath = path.join(__dirname, fileName);
  let data = fs.readFileSync(srcPath, { encoding: "utf8" });
  return data.split("\n");
}

test("Test for InvalidCoordinatesError on init", () => {
  expect(() => {
    parseFile(getFileContent("entry_invalid_coordinates.txt"));
  }).toThrow(InvalidCoordinatesError);
});

test("Test for OutOfBoundException on init", () => {
  expect(() => {
    parseFile(getFileContent("entry_out_of_bound.txt"));
  }).toThrow(OutOfBoundsError);
});
