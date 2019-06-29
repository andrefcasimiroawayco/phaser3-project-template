
/**
 * Will draw an image at the center of the screen.
 * Achieved by dividing its width and height by two.
 * @param {*} target should contain a key name and a file path
 * @param {*} reference refers to local 'this' from the phaser3 methods
 */
export const drawAtCenter = (
  target, reference
) => {
  const { key, path } = target

  let width, height = 0

  // Create a tmp image to get its width and height
  let image = new Image()
  image.src = path

  // On loaded, extract its width and height divided by 2
  image.onload = function() {
    width = this.width / 2
    height = this.height / 2
  }

  // add an event listener so that, on image load event, we fire the
  // phaser3 method for adding images to the screen.
  image.addEventListener(
    "load",
    () => {
      reference.add.image(width, height, key)
    }
  )
}
