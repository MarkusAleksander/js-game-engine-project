import ActorPrototype from './Actor.js';

const ActorFactory = function ActorFactory() {

    // * Current Actor Unique ID
    this.cAuID = 1;

    this.createActor = function createActor(settings) {
        settings.id = this.cAuID++;
        const actor = new ActorPrototype(settings);

        let actorMesh = null;

        actorMesh = this.createMesh(settings);

        if (settings.initialPosition) {
            this.setInitialPosition(settings.initialPosition, actorMesh);
        }

        actor.actorMesh = actorMesh;
        return actor;
    }

    this.createMesh = function createMesh(settings) {
        let geometry = this.createGeometry(settings.meshData);
        let material = this.createMaterial(settings.materialData);

        return new THREE.Mesh(geometry, material);
    }

    this.createGeometry = function createGeometry(data) {
        const geometry = new THREE.BoxGeometry(
            data.dimensions.x,
            data.dimensions.y,
            data.dimensions.z
        );

        return geometry;
    }

    this.createMaterial = function createMaterial(data) {
        const material = new THREE.MeshBasicMaterial({
            color: data.color
        });

        return material;
    }

    this.setInitialPosition = function setInitialPosition(data, actor) {
        actor.position.x = data.x !== undefined ? data.x : 0;
        actor.position.y = data.y !== undefined ? data.y : 0;
        actor.position.z = data.z !== undefined ? data.z : 0
    }

}

export default ActorFactory;
