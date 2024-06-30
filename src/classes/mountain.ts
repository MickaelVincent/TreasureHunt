import { MapGridItem } from "./mapGridItem";

class Mountain implements MapGridItem {
  identifier: string = "M";
  coordinates: [number, number];

  constructor(coordinates: [number, number]) {
    this.coordinates = coordinates;
  }

  doesBlockMovement() {
    return true;
  }
}

export default Mountain;
