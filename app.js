'use strict';

const sv = require('./sv');
const sg = require('./sg');

exports.handler = async (event) => {
  const { npoints, seed } = event;

  if (
    !npoints ||
    !seed ||
    !Number.isInteger(npoints) ||
    !Number.isInteger(seed)
  ) {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
      body: {
        message: 'Please provide npoints and seed as uint32',
        event: JSON.parse(event),
      },
    };
  }

  const radius = 1;
  const center = [0, 0, 0];
  const points = await sg.points(npoints, seed);
  const voronoi = JSON.parse(
    await sv.calculateSphericalVoronoi(points, radius, center),
  );
  console.log(voronoi);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
    body: voronoi,
  };
};
