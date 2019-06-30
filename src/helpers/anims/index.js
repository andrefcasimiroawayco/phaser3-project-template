import { getReference } from "../../index"

const SPRITE_TYPE = {
  LTR: "left_turn_right",
}

let anims

export const generateSpriteAnimations = (key, type = SPRITE_TYPE.LTR) => {
  if (!anims) {
    anims = getReference("anims")
  }

  switch(type) {
    case SPRITE_TYPE.LTR:
    default:
      return generateLTR(key)
  }
}

const generateLTR = (key) => {
  anims.create({
    key: 'left',
    frames: anims.generateFrameNumbers(
      key,
      {
        start: 0,
        end: 3,
      },
    ),
    frameRate: 10,
    repeat: -1,
  })
  anims.create({
    key: 'turn',
    frames: [
      {
        key,
        frame: 4,
      }
    ],
    frameRate: 20,
  })
  anims.create({
    key: 'right',
    frames: anims.generateFrameNumbers(
      key,
      {
        start: 5,
        end: 8,
      },
    ),
    frameRate: 10,
    repeat: -1,
  })
}

