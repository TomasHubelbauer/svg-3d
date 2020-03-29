# [SVG 3D](https://tomashubelbauer.github.io/svg-3d)

![](screencast.svg)

**Note:** GitHub doesn't seem to support SVG SMIL animation in readme previews,
until I develop a SVG CSS animator, please click the empty space above to go to
the SVG file preview directly.

This application allows for creation of SVGs depicting wireframe 3D scenes with
true perspective. It is useful for generating educational and instructional SVGs
which can be included in MarkDown documents and rendered in GitHub and VS Code
MarkDown previews. Interactive scenes which host SVG in HTML are also supported.

## Motivation

Why pursue the SVG route to animation when WebGL and HTML `canvas` exist?

SVG is the only alternative to GIF animations when it comes to embedding them in
MarkDown documents which can be previewed on GitHub and in VS Code. GIFs are
ugly, large and slow. Some animation sharing sites already replace them with MP4
videos or WebP, but that's not an option for MarkDown (although maybe WebP is?).

I want a solution to hosting animated education and instructional content in
MarkDown documents which can be hosted and previewed on GitHub and in VS Code.
The ability to inspect the source of the animation and tweak it if desired is a
huge bonus, and so it the vector based nature of SVG compated to rasters. So,
even if WebP might be an option (I haven't checked its support in browsers and
on GitHub and in VS Code previews), it is a raster which is worse in terms of
tinkering with it.

Since SVG can also be hosted in HTML, there is a potential for interactivity and
I am somewhat entertaining this functionality, too, but it is a side-effect of
the animation focus, not a sole motivation.

## Interactivity

The SVG image can be hosted in HTML as well, allowing for the use of JavaScript
to tweak the scene in effect enabling animation and interactivity options.

This application supports reconciling existing SVG DOM instead of mounting a new
SVG DOM on each render, improving the performance of JavaScript-based usages.
However, where possible, having an unchanging count of vertices, faces and edges
in the scene provides the best performance as it fully cuts down on DOM tree
mutation and limits the interactivity to the SVG DOM attribute updates.

Theoretically, animations could be made at least somewhat interactive using SMIL
animation triggers (and maybe CSS animation using pseudo-states), but that's not
an avenue I am pursuing at the moment.

## Animation

Aside from using JavaScript to provide animation and interactivity to the scene,
an SVG based animation solution can also be used. This will preserve the effect
even when not manipulated using JavaScript, such when displayed using an `img`
element or when embedded in a MarkDown document and viewed in GitHub or VS Code
MarkDown preview.

Two "engines" for animation are available: SMIL and CSS.

### SMIL Animation

The `animate` SVG element is used to rearrange the shapes to create an illusion
of motion. Each vertex, edge and face is included once in the SVG and animated
this way. This produces small SVGs, however, GitHub lacks support for rendering
the animation when previewing MarkDown files which use the SVG as an image.

At the moment, SMIL animation support is as follows:

| Context                                      | Support |
|----------------------------------------------|---------|
| GitHub SVG file preview                      | Yes     |
| GitHub MarkDown file with SVG image preview  | No      |
| VS Code MarkDown file with SVG image preview | Yes     |

I have contacted GitHub support about the missing support in MarkDown previews
as it is inconsistent with the fact that SVG file preview renders the animation.

I will update this document whenever I hear back.

This type of animation benefits from the amount of vertices, edges and faces
staying constant during the course of the animation, because I have not yet
implemented adding and removing shapes using SMIL and am not certain that is
even possible. If it isn't, it could still be supported by mixing SMIL and CSS
animation, however, so this will eventually be supported one way or another.

### CSS Animation

CSS in SVG animation can be used, however it is limited to animating layout
properties, not general SVG attributes. This means that instead of animating
vertices, edges and faces by changing their values, these shapes need to be
duplicated in the animation for each frame and shown and hidden using the
`display` CSS property. This results in large files, but is supported in GitHub
MarkDown previews unlike the SMIL based solution, so both ways are currently
supported until GitHub begins to support SMIL animation in MarkDown previews.

At the moment, CSS animation support is as follows:

| Context                                      | Support |
|----------------------------------------------|---------|
| GitHub SVG file preview                      | Yes     |
| GitHub MarkDown file with SVG image preview  | Yes     |
| VS Code MarkDown file with SVG image preview | Yes     |

## Performance

The performance of the animation is up to the SVG renderer used. I am working on
browser SVG renderer peformance comparison to provide some hard numbers on this.

Additionally, JavaScript-interactive usages will incur a performance overhead in
the form of DOM.

## Comparison with WebGL and `canvas`

Both WebGL and `canvas` are accelerated, so both will be either more performant
or at best as performant as an SVG based animation, and in case of JavaScript-
interactive SVG scene, will likely always be more performant as they never
involve the DOM in the process.

To learn more, see [Performance](#performance) and to see why I am pursuing this
direction anyway, see [Motivation](#motivation).

## Support

See [Animation](#animation) to learn about the support of the individual engines
in GitHub and VS Code MarkDown previews.

Outside of those contexts, the support depends on the SVG renderer used and its
support for SMIL and CSS depending on the animation engine choice.

## Maintenance Status

This is a personal, spare-time project. I work on it when I have the time I want
to dedicate to this particular project. I don't work on it assuming anyone else
uses this or cares about this. In that way, this is more of a souce-available
type project as opposed to an actual open source project with a community.

If you find a use for this, let me know.

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

### Use Playwright to capture frame by frame progress of the animation and compare

Chrome, Firefox and Safari might all be supported. Capture a series of frames
from the SVG playback and compare them to the known baseline set of images made
by making `animate` yield the individual frames and track how much each frame
got delayed or not.
