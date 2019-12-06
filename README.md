# JS Game Engine Project

Game Engine Project under development using Three.js and much better development patterns than my previous babylon.js based project.

-   Engine Manager (handle updates)
-   Graphics Manager (handle rendering, render updates and scene)
-   Actor Manager (handle actors)
-   Actor Factory (create actors)

TODOs:

-   Object disposal
-   Write Scene Creation Guide
-   Mesh merge

## Usage Nots

## Creating an Actor (WIP)

-   Define if Single or Combined (nested?)
-   for each actor object:
-   Define as Mesh or Actor (potential others - ie. Trigger Actor?)
-   Add settings object
    Meshes:
-   Define Mesh Type - PRIMITIVE | CUSTOM
-   Primitive for basic shapes, custom for custom build
    Lights:
-

Other details - rotation, position, materials etc

Actors can be made up of many meshes / light objects
Actors can have child actors

## Three JS Notes (for memory)

-   1 ThreeJS unit equates to 1 metre
