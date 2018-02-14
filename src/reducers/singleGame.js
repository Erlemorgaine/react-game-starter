import { UPDATE_GAME } from '../actions/game/update'

const singleGame = {
  squares: Array(9).fill(null),
  xIsNext: true
}

export default (state = singleGame, { type, payload } = {}) => {
  switch (type) {
      case UPDATE_GAME :
        return payload
      default :
        return state
  }
}
