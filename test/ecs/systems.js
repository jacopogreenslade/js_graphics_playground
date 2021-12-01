ECS.Systems = {};

ECS.Systems.Renderer = function Renderer(entities) {
  entities
    .filter((entity) => entity.components.look && entity.components.transform)
    .forEach((entity) => {
      // Implementing the render here would cause
      // ugly if statements...
      //
      // TODO: Should we have change flags to prevent rerendering over and over?

      if (
        entity.components.transform &&
        entity.components.look &&
        entity.components.shape
      ) {
        // console.log(entity.components);
        const { look, transform, shape } = entity.components;

        // Most shapes have this stuff so I'm doing it out here
        fillColor = color(look.fill.r, look.fill.g, look.fill.b);
        fill(fillColor);
        stroke(color(look.stroke.r, look.stroke.g, look.stroke.b));
        strokeWeight(look.strokeWeight);
        drawingContext.setLineDash(look.dashed);

        switch (shape.type) {
          case "line":
            if (shape.points.length > 1) {
              push();
              rotate(transform.rotation);
              line(
                shape.points[0].x + transform.position.x,
                shape.points[0].y + transform.position.y,
                shape.points[1].x + transform.position.x,
                shape.points[1].y + transform.position.y
              );
              pop();
            }
          case "circle":
            push();
            translate(transform.position.x, transform.position.y);
            circle(0, 0, 2 * shape.radius);
            pop();
            break;
          case "rect":
          default:
            // render the rect
            push();
            // By using translate instead of points we can then rotate the shape easily
            translate(transform.position.x, transform.position.y);
            rotate(transform.rotation);
            rect(
              //   transform.position.x,
              //   transform.position.y,
              0,
              0,
              shape.dimensions.w,
              shape.dimensions.h
            );
            pop();
            break;
        }
      }
    });
};
