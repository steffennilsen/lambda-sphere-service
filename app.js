'use strict';

const sv = require('./sv');
const sg = require('./sg');

exports.handler = async (event, context, callback) => {
  if (!event.body) {
    callback(null, {
      message: 'Missing body',
    });
    return;
  }

  const { npoints, seed } = JSON.parse(event.body);

  if (
    !npoints ||
    !seed ||
    !Number.isInteger(npoints) ||
    !Number.isInteger(seed)
  ) {
    callback(null, {
      message: 'Please provide npoints and seed as uint32',
    });
    return;
  }

  const radius = 1;
  const center = [0, 0, 0];
  const points = await sg.points(npoints, seed);
  const voronoi = await sv.calculateSphericalVoronoi(points, radius, center);

  callback(null, voronoi);
};
