'use strict';

const axios = require('axios');

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
    let response = {
      statusCode: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
      body: 'Please provide npoints and seed as uint32',
    };
    return Promise.resolve(response);
  }

  const radius = 1;
  const center = [0, 0, 0];
  const points = await sg.points(npoints, seed);
  const voronoi = await sv.calculateSphericalVoronoi(points, radius, center);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
    body: voronoi,
  };
};
