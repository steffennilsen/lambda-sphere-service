import numpy as np
from scipy.spatial import SphericalVoronoi


def calculate_spherical_voronoi(_points, radius, _center):
    points = np.array(_points)

    center = np.array(_center)
    sv = SphericalVoronoi(points, radius, center)
    sv.sort_vertices_of_regions()

    voronoi = {
        "area": sv.calculate_areas(),
        "center": sv.center,
        "points": sv.points,
        "radius": sv.radius,
        "regions": sv.regions,
        "vertices": sv.vertices,
    }

    return voronoi
