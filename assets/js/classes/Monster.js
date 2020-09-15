class Monster extends Phaser.Physics.Arcade.Image {
    constructor (scene, x, y, key, frame, id, health, maxHealth) {
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.id = id;
        this.health = health;
        this.maxHealth = maxHealth;

        // enable physics
        this.scene.physics.world.enable(this);
        // set immovable if another object collides with our monster
        this.setImmovable(false);
        // scale our monster
        this.setScale(2);
        // collide with world bounds
        this.setCollideWorldBounds(true);
        // add the monster to our existing scene
        this.scene.add.existing(this);
        // updates the origin of the character and adds the health bar to each monster
        this.setOrigin(0);
        this.createHealthbar();
    }

    createHealthbar() {
        this.healthbar = this.scene.add.graphics();
        this.healthbar.fillStyle(0xffffff, 1);
        this.healthbar.fillRect(this.x, this.y - 8, 64, 5);
        this.healthbar.fillGradientStyle(0xff0000, 0xffffff, 4);
        this.healthbar.fillRect(this.x, this.y - 8, 64 * (this.health / this.maxHealth), 5);
    }

    updateHealthBar() {
        this.healthbar.clear();
        this.healthbar.fillStyle(0xffffff, 1);
        this.healthbar.fillRect(this.x, this.y - 8, 64, 5);
        this.healthbar.fillGradientStyle(0xff0000, 0xffffff, 4);
        this.healthbar.fillRect(this.x, this.y - 8, 64 * (this.health / this.maxHealth), 5);
    }

    updateHealth(health) {
        this.health = health;
        this.updateHealthBar();
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.body.checkCollision.none = false;
        this.updateHealthBar();
    }
    
    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body.checkCollision.none = true;
        this.healthbar.clear();
    }
}