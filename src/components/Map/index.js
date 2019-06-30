import sky from "../../assets/sky.png"
import platform from "../../assets/platform.png"
import star from "../../assets/star.png"
import bomb from "../../assets/bomb.png"

const MAP = {
  background: {
    key: 'sky',
    path: sky,
  },
  platform: {
    key: 'ground',
    path: platform,
  },
  pickup: {
    key: 'star',
    path: star,
  },
  enemy: {
    key: 'bomb',
    path: bomb,
  },
}

export default MAP
