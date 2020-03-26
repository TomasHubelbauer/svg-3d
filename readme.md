# [SVG 3D](https://tomashubelbauer.github.io/svg-3d)

Primitive 3D wireframe model rendering using SVG polylines.

This is a proof of concept for rendering 3D wireframe models using SVG. I made
it to see if it could be applicable for a problem I'm solving: anymating 3D
wireframe models and scenes, which are static in the amount of vertices, edges
and faces, but dynamic in terms of animation.

It seems to work well for this, but I have made no comparisons to WebGL and
`canvas` based implementations. I am not sure if `canvas` is GPU-accelerated,
nor if SVG is, so if it is, it will be at best the same as WebGL, if it isn't,
it will be way worse (CPU rendering).

The only selling point of this solution is that it limits itself to wireframes,
not shaded models. This is helpful, because once the polylines of the edges are
mounted in the DOM, the DOM layout within the SVG remains constant and the only
thing that changes are the `points` attributes (and possibly others later), so
the DOM does not have to work anymore, only the vector rasterizer.

## Maintenance Status

Not actively maintained.

## Similar Projects

There is [Z-Dog](https://zzz.dog/) and also a lot of other people's pet projects
having to do with SVG and 3D.

## To-Do

### Implement camera position and globe gizmo for scene navigation

Right now the camera is stuck at the origin and the meshes have to transform.

### Implement missing model transformations (translate, scale, skew)

### Experiment with depth-sensitive strokes

This is not fit for the general thing, but it will be cool to try:

Define the mesh using points and edges, but when rendering the edges, do not use
a polyline, but instead multiple lines which break at the points where the
thickness of the edge stroke changes as the edge progresses from one point to
the next. This will dynamically change the amount of line segments in the edge
thus breaking the initial premise of a static amount of shapes in the SVG across
all transformations.

### Implement exporting 3D wireframe animations using CSS animations in SVG

### Implement sphere tesselation using various techniques

Quads, tris, stripes.

### Connect with a physics engine to use as a renderer and offload the physics

- https://brm.io/matter-js
- http://wellcaffeinated.net/PhysicsJS
- http://piqnt.com/planck.js
- https://github.com/lo-th/Oimo.js
- https://github.com/kripken/box2d.js

### Implement the mesh + model transform & world transform model

### Try to implement face overlapping using gradients/masks

When the faces are not overlapping, ordering them from back to front in camera
order should preserve the correct depth perception.

When faces to overlap, the face being overlapped could instead of having a solid
fill have a fill which consists of a linear gradient (if the face is split in
half) or a more complex mask to make it obscure a part of itself which is not
supposed to be seen.

This same thing won't work for strokes, so perhaps faces which have a material
should only have fill and those who don't should only have stroke, so the user
can either opt into having a wireframe be rendered or a textured mesh.

This same thing could also work for strokes maybe if all strokes were rendered
as polylines if there is a CSS/SVG way to render the various polyline segments
with a different stroke. This way, the line could be chopped up (in the points
attribute, not duplicated in the SVG DOM) at line intersections.

If this works, it would also enable wireframes where hidden edges are drawn in a
different stroke.

### Add support for JSON (or whatever) models which could use edges, too
