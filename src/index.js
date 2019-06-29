import Phaser from "phaser"
import { drawAtCenter } from "./common/draw"
import GAME_CONFIGS from "./configs"
import MAP from "./components/Map"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: GAME_CONFIGS.screenWidth,
  height: GAME_CONFIGS.screenHeight,
  scene: {
    preload,
    create,
  },
}

const game = new Phaser.Game(config)

function preload() {
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
  drawAtCenter(MAP.background, this)

}

