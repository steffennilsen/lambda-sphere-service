import { calculateSphericalVoronoi } from './sv';

const voronoi = async (
  points: [number, number, number][],
  radius: number,
  center: [number, number, number],
) => await calculateSphericalVoronoi(points, radius, center);

export { voronoi };
