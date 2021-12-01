ECS.Systems = {};

ECS.Systems.Renderer = function Renderer(entities) {
    entities.filter(entity => entity.components.look && entity.components.transform).forEach(entity => {
        // Implementing the render here would cause 
        // ugly if statements...
        // 
        // TODO: Should we have change flags to prevent rerendering over and over?
        
        if (entity.components.transform && entity.components.look && entity.components.shape) {
            console.log(entity.components)
            const { look, transform, shape } = entity.components;
            // console.log("components", look, transform);
            
            // Most shapes have this stuff so I'm doing it out here
            fillColor = color(look.fill.r, look.fill.g, look.fill.b);
            // console.log("fill", fillColor);
            fill(fillColor);
            stroke(color(look.stroke.r, look.stroke.g, look.stroke.b));
            strokeWeight(look.strokeWeight);
            console.log(look.dashed);
            drawingContext.setLineDash(look.dashed);
                        
            switch (shape.type) {
                case "line":
                console.log("asdfasdf")
                    if (shape.points.length > 1) {
                        line(shape.points[0].x, shape.points[0].y, shape.points[1].x, shape.points[1].y);
                    }
                case "rect":
                default:
                    // render the rect
                    rect(transform.position.x, transform.position.y, shape.dimensions.w, shape.dimensions.h);
                    
                    break;
            }
        }
    });
}