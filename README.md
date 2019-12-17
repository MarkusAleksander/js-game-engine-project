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
-   Entity Component System

## Notes

### Actor Objects

Everything in the scene is treated as and and referred to as an Actor:

-   Meshes
-   Lights
-   Trigger Points

Each Actor consists of a base scene graph node (in this case, a THREE.Object3D()) and attached child objects that represent that Actor.
This helps represent local space for the Actor, and a defined point of reference for the Actor in the world.

Actors are build via the ActorManager, which is passed an object defining the Actor.

Actor Creation details TBC

Actors then go through a 3 step process:

-   Register the Actor to the Actor Manager
    This is done explicitly so that the developer can choose when to add an Actor to the Manager
-   Added to the scene
    Actors then need to be added to the scene (at any point in time, but only after being registered)
-   Activated
    Actors then need to be activated to recieve updates and update themselves.

To remove, Actors go through the same process in reverse.

## Three JS Notes (for memory)

-   1 ThreeJS unit equates to 1 metre
