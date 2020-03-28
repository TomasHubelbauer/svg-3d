# [SVG 3D](https://tomashubelbauer.github.io/svg-3d)

![](screencast.svg)

**Note:** GitHub doesn't seem to support SVG SMIL animation in readme previews,
until I develop a SVG CSS animator, please click the empty space above to go to
the SVG file preview directly.

This is a proof of concept application for rendering SVG 3D animations and to an
extend rendering interactive 3D scenes in the browser.

SVG (SMIL) animations are used to make the rendered SVG 3D scene come to life.
CSS in SVG animations could also potentially work, but are not tested yet.

This application benefits from the scene having a static amount of vertices,
edges and faces. The animation generator right now assumes this and while the
in-browser renderer can replace the SVG children on the fly to accomodate
varying shape count, the DOM hit is likely to not make this a worthwhile effort.

I do not intend to compete with WebGL or `canvas` (which is GPU accelerated I
think) in terms of performance, ease of use or anything else. However, SVG
rendering might also be GPU accelerated and if that's the case, it should be
equally fast barring any parsing and rasterizing overhead. This is going to
depend on the SVG rendered of the given browser.

The main selling point of this application is that it is able to generate 3D
animated scenes in SVGs which are supported in VS Code and GitHub MarkDown
previews, providing an alternative to GIFs.

Theoretically, animations could be made at least somewhat interactive using SMIL
animation triggers (probably not in the SVG CSS animation case), but that's not
an avenue I am pursuing at the moment.

## Support

| Animator | GitHub Readme Preview | GitHub SVG File Preview | VS Code MarkDown Preview |
|----------|-----------------------|-------------------------|--------------------------|
| SMIL     | No?                   | Yes                     | Yes                      |
| CSS      | Yes                   | Yes                     | Yes                      |

## Maintenance Status

This application is not really maintained.

## Similar Projects

There is [Z-Dog](https://zzz.dog/) and also a lot of other people's pet projects
having to do with SVG and 3D.

## To-Do

### Povide camera position and orientation to `render` from the outside

### Attach rotation and translation to a transform array on the mesh

Right now they sit in `render`. Once the `rotate` function is in `esm-matrix`,
add one for translation and then a combining one for rotation around origin and
use those in index to position the model before rendering it. Rendering will
then only accept camera position and orientation and the mesh with its transform
array.

### Figure out why the SVG SMIL animation does not play on GitHub

It renders an empty SVG in the readme preview on the repo home page, but going
to the screencast file page directly, the preview there renders the SMIL
animation. If this ends up being unsuppoted by GitHub, definitely support both
SMIL and CSS animators and use the CSS animator in the readme, which I already
know works, because I've used in
[`svg-screencast`](https://github.com/tomashubelbauer/svg-screencast).

Also see if this is true only for the readme or any MarkDown preview.

### Consider adding a tabbed UI with dynamic and static tabs

Dynamic would host the SVG whose DOM gets updated using `requestAnimationFrame`
and static would host the SVG with baked animation which only gets updated when
the animation parameters change.

### Implement SVG CSS animation too and compare the sizes of the two generators

### Implement orbit control for camera navigation in the browser scene

Either UI controls or 2D to 3D cursor approximation.

### Pull out the `rotate` transformation and implement other transformations

Add translate, scale, skew. Move these either to the `esm-matrix` library or a
whole new library.

### Prototype depth-sensitive strokes in another project

Find a way to render edges as polylines or multiple line elements whose strokes
gradually vary in relation to their depth respective to the camera.

If there is no way to do this using a polyline and multiple lines have to be
used, it is not a good fit for this project, as in this project, a static number
of DOM elements in the SVG is one of the goals, but it will still be cool to
have this as an experiment somewhere.

### Consider pre-rendering the browser preview animations to SVG too

Reset only when a user interaction happens (unsupported at the moment, so we
would only be animating the time). This might not be economical, so keep the
mount+reconcile flow as an alternative / the sole solution if this doesn't work
out.

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

Another thing this could help enable would be to hide shapes which are fully or
partially behind the camera. Right now they appear and are distorted. When only
partially outside (or behind) of the viewport, the Bresenham algorithm could be
used on the edges of the face (in case of a shape with an area) in order to sort
of "ray-trace" the length of the edge until it meets the edge and then use the
above techniques to cull the rest of the edges and mask away the hidden portion
of the shape's fill.

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

### Support ellipses and see if their perspective representation can be approximated

I will have to research this, but I believe an ellipse in 3D might still be
representable using an ellipse in 2D even accounting for its orientation and
perspective distortion. And if not an ellipse, perhaps a combination of ars,
say two Beziers making up a single ellipse?

The question is whether it is worth the effort, if the reduced DOM node count
will matter when faced with the rasterization complexity of ellipses as opposed
to polylines (is it more expensive?).

### Fix the cottage model missing most faces in the render

### Fix the cat and dog models being too far away from the camera and flat

### Introduce mutating methods for matrix and point manipulationin `esm-matrix`

Mutating the matrices in place is faster than generating new instances and
replacing the references, so all matrix operations will need to be updated to
reflect this.

### Introduce a reproducible Puppeteer harness for profiling performance

This is so that I am able to switch around the render logic and run it through
it and it would run it a few times and collect the performance metrics and then
I could compare them.

Puppeteer has a profiling API which will be very useful for this and I should
also be able to maybe control `requestAnimationFrame` rate if I need that.

### Figure out what's broken in `render-wip` compared to `render`

The WIP version is much faster, because it cuts down on allocations, but I made
a mistake somewhere and now the mesh slides towards the origin as it rotates.
