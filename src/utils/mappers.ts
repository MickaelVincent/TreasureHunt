import { Direction, Orientation } from "../types/type";

function mapOrientation(orientation: string): Orientation {
  switch (orientation) {
    case "N":
      return Orientation.North;
    case "S":
      return Orientation.South;
    case "E":
      return Orientation.East;
    case "W":
      return Orientation.West;
    default:
      return Orientation.North;
  }
}

function mapDirection(direction: string): Direction {
  switch (direction) {
    case "A":
      return Direction.Up;
    case "D":
      return Direction.Right;
    case "G":
      return Direction.Left;
    default:
      throw new Error(`Unknown direction: ${direction}`);
  }
}

export { mapOrientation, mapDirection };
