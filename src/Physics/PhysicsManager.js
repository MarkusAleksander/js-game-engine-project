import ManagerPrototype from "../ManagerPrototype/ManagerPrototype.js";

const PhysicsManager = function PhysicsManager(data) {
    this.physicsWorld = null;

    ManagerPrototype.call(this, data);

    this.initialise = function initialise(data) {
        // Ammo().then(start);

        ManagerPrototype.prototype.initialise.call(this);
    };

    this.setupPhysicsWorld = function setupPhysicsWorld() {};

    this.update = function update(dT) {
        ManagerPrototype.prototype.update.call(this);

        this.physicsWorld.step();
    };

    this.addPhysicsObject = function addPhysicsObject(pObj) {
        let o = null;

        this.physicsWorld.add(o);
    };
};

PhysicsManager.prototype = Object.create(ManagerPrototype.prototype);
PhysicsManager.prototype.constructor = PhysicsManager;

const PhysicsMgr = new PhysicsManager({
    managerName: "PhysicsManager",
});

export default PhysicsMgr;
