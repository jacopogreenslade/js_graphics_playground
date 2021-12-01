ECS.Systems = {};

ECS.Systems.Renderer = function Renderer(entities) {
    entities.filter(entity => entity.components.look && entity.components.transform).forEach(entity => {
        // Implementing the render here would cause 
        // ugly if statements...
        
        if (entity.components.transform && entity.components.look) {
            console.log(entity.components)
            const { look, transform } = entity.components;
            // console.log("components", look, transform);
            
            // Most shapes have this stuff so I'm doing it out here
            fillColor = color(look.fill.r, look.fill.g, look.fill.b);
            // console.log("fill", fillColor);
            fill(fillColor);
            stroke(color(look.stroke.r, look.stroke.g, look.stroke.b));
            strokeWeight(look.strokeWeight);
            drawingContext.setLineDash(look.dashed);
            
            
            switch (look.type) {
                case "rect":
                default:
                    // render the rect
                    rect(transform.position.x, transform.position.y, look.dimensions.w, look.dimensions.h);
                    
                    break;
            }
        }
    });
}