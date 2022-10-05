import { python } from 'pythonia';

export type V3 = [number, number, number];

export interface SphericalVoronoi {
  area: number[];
  center: V3;
  points: V3[];
  radius: number;
  regions: number[][];
  vertices: V3[];
}

export interface SV {
  calculate_spherical_voronoi(
    _points: V3[],
    radius: number,
    center: V3,
  ): Promise<SphericalVoronoi>;
}

const pyArrToJs = async <T>(pyArr: T[]): Promise<T[]> => {
  const len = await pyArr.length;
  const jsArr: T[] = [];
  for (let i = 0; i < len; i++) {
    jsArr[i] = await pyArr[i];
  }

  return jsArr;
};

const nestedPyArrToJs = async <T>(pyArr: T[][]): Promise<T[][]> => {
  const len = await pyArr.length;
  const jsArr: T[][] = [];
  for (let i = 0; i < len; i++) {
    jsArr[i] = await pyArrToJs<T>(pyArr[i]);
  }

  return jsArr;
};

export const calculateSphericalVoronoi = async (
  points: V3[],
  radius: number = 1,
  center: [number, number, number] = [0, 0, 0],
): Promise<SphericalVoronoi> => {
  const sv = (await python<SV>('./sv.py')) as SV;
  const voronoi = await sv.calculate_spherical_voronoi(points, radius, center);
  const values = {
    area: await pyArrToJs<number>(voronoi.area),
    center: (await pyArrToJs<number>(voronoi.center)) as V3,
    points: (await nestedPyArrToJs<number>(voronoi.points)) as V3[],
    radius: await voronoi.radius,
    regions: await nestedPyArrToJs<number>(voronoi.regions),
    vertices: (await nestedPyArrToJs<number>(voronoi.vertices)) as V3[],
  };
  python.exit();

  return values;
};
