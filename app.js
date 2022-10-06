'use strict';

const sv = require('./sv');
const sg = require('./sg');

exports.handler = async (event) => {
  console.log('Received event:', event);

  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
      body: {
        message: 'missing body',
      },
    };
  }

  console.log('###BODY###');
  console.log(event.body);
  const { npoints, seed } = event.body;

  if (
    !npoints ||
    !seed ||
    !Number.isInteger(npoints) ||
    !Number.isInteger(seed)
  ) {
    return {
      statusCode: 400,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
      body: {
        message: 'Please provide npoints and seed as uint32',
      },
    };
  }

  const radius = 1;
  const center = [0, 0, 0];
  const points = await sg.points(npoints, seed);
  const voronoi = JSON.parse(
    await sv.calculateSphericalVoronoi(points, radius, center),
  );

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
    body: voronoi,
  };
};
