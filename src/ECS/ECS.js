// * Entity
import Entity from './Entity/Entity.js';

// * Components
import Health from './Components/HealthComponent.js';
import Translation from './Components/TranslationComponent.js';

// * Systems
import HealthSystem from './Systems/HealthSystem.js';
import MovementSystem from './Systems/MovementSystem.js';

const ECS = {
    "Entity": Entity,
    "Components": {
        "Health": Health,
        "Translation": Translation
    },
    "Systems": {
        "HealthSystem": new HealthSystem(),
        "MovementSystem": new MovementSystem()
    }
};

export default ECS;
