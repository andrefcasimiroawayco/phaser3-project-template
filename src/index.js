import Phaser from "phaser"
import GAME_CONFIGS from "./data/Global"
import MAP from "./data/Map"
import SPRITES from "./data/Sprites"
import { addPlatform } from "./helpers/platforms"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: GAME_CONFIGS.screenWidth,
  height: GAME_CONFIGS.screenHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
}

const game = new Phaser.Game(config)
// World variables
let player, platforms
// Input manager
let cursors

function preload() {
  // Get sprites and load them into the scene
  Object.values(SPRITES).forEach(spriteProperty =>
    this.load.spritesheet(
      spriteProperty.key,
      spriteProperty.path,
      { ...spriteProperty.frameInfo },
    )
  )

  // Get level assets and load them into the scene
  Object.values(MAP).forEach(mapProperty =>
    this.load.image(
      mapProperty.key,
      mapProperty.path,
    )
  )
}

function create() {

  // Draw background
  this.add.image(400, 300, MAP.background.key)

  // Add platforms
  platforms = this.physics.add.staticGroup()

  platforms
    .create(400, 568, MAP.platform.key)
    .setScale(2)
    .refreshBody()

  // Add more platforms
  addPlatform(600, 400)
  addPlatform(50, 250)
  addPlatform(750, 220)

  player = this.physics.add.sprite(100, 450, SPRITES.player.key)
  player.setBounce(0.2)
  player.setCollideWorldBounds(true)

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers(
      SPRITES.player.key,
      {
        start: 0,
        end: 3,
      },
    ),
    frameRate: 10,
    repeat: -1,
  })
  this.anims.create({
    key: 'turn',
    frames: [
      {
        key: SPRITES.player.key,
        frame: 4,
      }
    ],
    frameRate: 20,
  })
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers(
      SPRITES.player.key,
      {
        start: 5,
        end: 8,
      },
    ),
    frameRate: 10,
    repeat: -1,
  })

  // Set collision dynamic between player and ground
  this.physics.add.collider(player, platforms)

  cursors = this.input.keyboard.createCursorKeys()

}

function update() {

  // Left
  if (cursors.left.isDown)
  {
    player.setVelocityX(-GAME_CONFIGS.playerWalkVelocity)
    player.anims.play('left', true)
  }
  // Right
  else if (cursors.right.isDown)
  {
    player.setVelocityX(GAME_CONFIGS.playerWalkVelocity)
    player.anims.play('right', true)
  }
  // Stop
  else
  {
    player.setVelocityX(0)
    player.anims.play('turn', true)
  }

  // Jump
  if (cursors.up.isDown)
  {
    player.body.touching.down && player.setVelocityY(-GAME_CONFIGS.playerJumpVelocity)
  }
}

// We return whatever the helper methods need to handle various game logic here
export const getReference = (key) => {
  switch(key) {
    case "platforms":
      return platforms
    default:
      return null
  }
}
