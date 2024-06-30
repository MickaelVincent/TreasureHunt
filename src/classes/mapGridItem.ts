export interface MapGridItem {
  identifier: string;
  coordinates: [number, number];
  doesBlockMovement: () => boolean;
}
