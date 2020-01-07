// * Entity
import Entity from "./Entity/Entity.js";

// * Components
import Base from "./Components/BaseComponent.js";
import Health from "./Components/HealthComponent.js";
import Translation from "./Components/TranslationComponent.js";
import Render from "./Components/RenderComponent.js";
import Physics from "./Components/PhysicsComponent.js";
import gAnimation from "./Components/AnimationComponent.js";
import Control from "./Components/ControlComponent.js";

// * Systems
import HealthSystem from "./Systems/HealthSystem.js";
import MovementSystem from "./Systems/MovementSystem.js";
import PhysicsSystem from "./Systems/PhysicsSystem.js";
import RenderSystem from "./Systems/RenderSystem.js";
import AnimationSystem from "./Systems/AnimationSystem.js";
import BaseSystem from "./Systems/BaseSystem.js";
import ControlSystem from "./Systems/ControlSystem.js";

const ECS = {
    Entity: Entity,
    Components: {
        Base: Base,
        Health: Health,
        Translation: Translation,
        Render: Render,
        Physics: Physics,
        Animation: gAnimation,
        Control: Control,
    },
    Systems: {
        BaseSystem: new BaseSystem(),
        HealthSystem: new HealthSystem(),
        MovementSystem: new MovementSystem(),
        PhysicsSystem: new PhysicsSystem(),
        RenderSystem: new RenderSystem(),
        AnimationSystem: new AnimationSystem(),
        ControlSystem: new ControlSystem(),
    },
};

export default ECS;
