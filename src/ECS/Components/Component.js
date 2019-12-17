const Component = function Component(componentName) {
    this.componentName = componentName;
}

Component.prototype.getName = function getName() {
    return this.componentName;
}

// Component.prototype.update = function update() {
//     // * Do update...
// }

export default Component;
