const sv = require('./sv');
const sg = require('./sg');

const voronoi = async (points, radius, center) =>
  await sv.calculateSphericalVoronoi(points, radius, center);

const handler = async (event, context) => {
  console.log(event);
  console.log(context);
  console.log(await voronoi(sg.points(12, 123)));
};

// exports.voronoi = voronoi;
// exports.points = sg.points;
exports.handler = handler;
