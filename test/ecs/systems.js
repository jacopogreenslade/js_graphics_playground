ECS.Systems = {};

ECS.Systems.Renderer = function Renderer(entities) {
    entities.filter(entity => entity.components.renderer && entity.components.transform).forEach(entity => {
        // Implementing the render here would cause 
        // ugly if statements...
        
    });
}