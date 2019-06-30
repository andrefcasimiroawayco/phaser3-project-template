import { getReference } from "../../index"
import MAP from "../../data/Map"

/**
 * Adds platforms to the scene
 * @param {*} x - the x position
 * @param {*} y - the y position
 * @param {*} key - the platform sprite key (Optional)
 */
export const addPlatform = (
  x,
  y,
  key = MAP.platform.key,
) => {
  getReference("platforms")
  .create(x, y, key)
}
