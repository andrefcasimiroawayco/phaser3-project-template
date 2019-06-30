import Phaser from "phaser"
import GAME_CONFIGS from "./data/Global"
import MAP from "./data/Map"
import SPRITES from "./data/Sprites"
import { addPlatform } from "./helpers/platforms"
import { handleInput } from "./helpers/input"
import { generateSpriteAnimations } from "./helpers/anims"

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
// System variables
let anims
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

  anims = this.anims
  generateSpriteAnimations(SPRITES.player.key)

  // Set collision dynamic between player and ground
  this.physics.add.collider(player, platforms)

  cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  handleInput()
}

// We return whatever the helper methods need to handle various game logic here
export const getReference = key => {
  switch(key) {
    case "platforms":
      return platforms
    case "cursors":
      return cursors
    case "player":
      return player
    case "anims":
      return anims
    default:
      return null
  }
}
