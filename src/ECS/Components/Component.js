const Component = function Component(componentName, entityUID) {
    this.componentName = componentName;
    this.parentEntity = entityUID;
}

Component.prototype.getName = function getName() {
    return this.componentName;
}

// Component.prototype.update = function update() {
//     // * Do update...
// }

export default Component;
