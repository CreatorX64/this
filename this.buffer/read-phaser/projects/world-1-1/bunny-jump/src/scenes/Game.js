import Phaser from "../lib/Phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", "assets/bg_layer1.png");

    this.load.image("platform", "assets/ground_grass.png");

    this.load.image("bunny-stand", "assets/bunny1_stand.png");
  }

  create() {
    this.add.image(240, 320, "background");

    // this.add.image(240, 320, "platform").setScale(0.5);
    // this.physics.add.staticImage(240, 320, "platform").setScale(0.5);

    const platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    const player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    this.physics.add.collider(platforms, player);
  }
}
