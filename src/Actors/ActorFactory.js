import ActorPrototype from './Actor.js';

const ActorFactory = function ActorFactory() {

    // * Current Actor Unique ID
    this.cAuID = 1;

    this.createActor = function createActor(settings) {
        settings.id = this.cAuID++;
        const actor = new ActorPrototype(settings);

        this.createMesh(actor, settings);

        return actor;
    }

    this.createMesh = function createMesh(actor, settings) {
        let geometry = this.createGeometry(settings.meshData);
        let material = this.createMaterial(settings.materialData);

        actor.actorMesh = new THREE.Mesh(geometry, material);
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

}

export default ActorFactory;
