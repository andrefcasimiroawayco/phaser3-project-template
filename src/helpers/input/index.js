import { getReference } from "../../index"
import GAME_CONFIGS from "../../data/Global"

let cursors, player

export const handleInput = () => {
  if (!cursors)
  {
    cursors = getReference("cursors")
  }
  if (!player)
  {
    player = getReference("player")
  }

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
