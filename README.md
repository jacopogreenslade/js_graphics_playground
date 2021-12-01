# js_graphics_playground
An umbrella repo for Rebecca and I to mess around with graphics in js

## ECS (entity component system)
The ECS code lives in the `/test/ecs/` directory.
At the moment I'm importing this as individual files into the HTML, which sucks. But I don't want to deal with it.

The goal is to have something that can easily be set up with components and that will render some basic shapes with `p5`. As we need more we can simply implement them in the renderer, which should give us access to any functionality we write into components. REUSE!!!