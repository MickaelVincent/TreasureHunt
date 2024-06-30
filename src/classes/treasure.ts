import { MapGridItem } from "./mapGridItem";

class Treasure implements MapGridItem {
  identifier: string = "T";
  coordinates: [number, number];
  quantity: number;

  constructor(coordinates: [number, number], quantity: number) {
    this.coordinates = coordinates;
    this.quantity = quantity;
  }

  getQuantity() {
    return this.quantity;
  }

  decreaseQuantity() {
    if (this.quantity > 0) this.quantity--;
  }

  doesBlockMovement() {
    return false;
  }
}

export default Treasure;
