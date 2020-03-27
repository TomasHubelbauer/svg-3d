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

### Implement orbit control for camera navigation in the scene

Either UI controls or 2D to 3D cursor approximation.

### Pull out the `rotate` transformation and implement other transformations

Add translate, scale, skew.

### Prototype depth-sensitive strokes in another project

Find a way to render edges as polylines or multiple line elements whose strokes
gradually vary in relation to their depth respective to the camera.

If there is no way to do this using a polyline and multiple lines have to be
used, it is not a good fit for this project, as in this project, a static number
of DOM elements in the SVG is one of the goals, but it will still be cool to
have this as an experiment somewhere.

### Implement SVG or CSS (in SVG) animations (like lazy susan)

Use CSS in SVG or SVG `animate` to control line and polyline coordinates.

Examples implemented in [`test.html`](test.html):

```xml
<line stroke="black">
  <animate attributeName="x1" values="100;200;100" dur="1s" repeatCount="indefinite" />
  <animate attributeName="y1" values="100;200;100" dur="1s" repeatCount="indefinite" />
  <animate attributeName="x2" values="400;300;400" dur="1s" repeatCount="indefinite" />
  <animate attributeName="y2" values="400;300;400" dur="1s" repeatCount="indefinite" />
</line>
```

```xml
<polyline stroke="black" fill="none">
  <animate attributeName="points" values="100,200 400,300 200,300;200,100 300,400 300,200;100,200 400,300 200,100;100,200 400,300 200,300" dur="1s" repeatCount="indefinite" />
</polyline>
```

Use this to represent baked animation either in both the viewport and the export
or in export only if it is not economical to do this in the viewport where the
animation is not baked (is dependent on user interaction).

### Implement object tesselation functions and consider pulling them out

Example tesselators: box, prism, sphere (of tris, quads, spool-like stripes, …).
Also the Utah teapot and maybe Suzanne depending on complexity.

### Add an example OBJ which uses the line shape and update box and prism to it

Wavefront OBJ supports a `l` element so it can be used.

### Consider implementing the hierarchy transformation model: world, scene, mesh

This is the standard in 3D and video game industries so it might make sense to
adopt it if I want to make this robust eventually.

### Experiment with shape culling solutions using stroke and fill gradient/mask

SVG has a few interesting bits related to stroke and fill styling. Perhaps these
could be used to implement wireframe or even textured edge and face culling.

https://en.wikipedia.org/wiki/Back-face_culling

In the image here, culled shapes are hidden, but they could also be made semi-
transparent etc.

![](culling.png)

For this to work, the shapes need to be rendered back to front to begin with,
which should be just a matter of sorting them that way when inserting to the
fragment and rearranging them when reconciling. Not sure how to do this in the
SVG or CSS in SVG animation if I get around to that.

Something like this could be then made to work:

![](overlapping.png)

The triangles, at the place where they overlap, would use a fill mask to implant
the texture from the shared area of the shape that overlaps them at that area.

Useful links for this:

- https://stackoverflow.com/q/42874203/2715716
- https://css-tricks.com/svg-line-animation-works

### Connect with a physics engine to use as a renderer and offload the physics

- https://brm.io/matter-js
- http://wellcaffeinated.net/PhysicsJS
- http://piqnt.com/planck.js
- https://github.com/lo-th/Oimo.js
- https://github.com/kripken/box2d.js

See how these are in terms of integration with 3rd paties. I don't want their
rendering and I want to be able to simply send in the meshes in a basic format
instead of adopting something which is too complex for my needs.

It would also be useful to filter out those which support dead body indication
so I could use that as a marker for the end of an animation when doing animation
in the SVG or using CSS in SVG.

### Add ellipses among the supported shapes and see if their perspective representation can be approximated

I will have to research this, but I believe an ellipse in 3D might still be
representable using an ellipse in 2D even accounting for its orientation and
perspective distortion. And if not an ellipse, perhaps a combination of ars,
say two Beziers making up a single ellipse?

The question is whether it is worth the effort, if the reduced DOM node count
will matter when faced with the rasterization complexity of ellipses as opposed
to polylines (is it more expensive?).

### Fix the cottage model missing most faces in the render

### Fix the cat and dog models being too far away from the camera and flat

### Introduce mutating methods for matrix and point manipulation to avoid allocations

Mutating the matrices in place is faster than generating new instances and
replacing the references, so all matrix operations will need to be updated to
reflect this.

I might want to take a look at pulling the matrix operations out to their own
ESM module and providing pairs for each operations, one which returns a new copy
and one which mutates the arguments.

### Introduce a reproducible Puppeteer harness for profiling performance

This is so that I am able to switch around the render logic and run it through
it and it would run it a few times and collect the performance metrics and then
I could compare them.

Puppeteer has a profiling API which will be very useful for this and I should
also be able to maybe control `requestAnimationFrame` rate if I need that.

### Figure out what's broken in `render-wip` compared to `render`

The WIP version is much faster, because it cuts down on allocations, but I made
a mistake somewhere and now the mesh slides towards the origin as it rotates.
