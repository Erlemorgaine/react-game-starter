import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { GAME_UPDATED } from '../games/subscribe'

//export const UPDATE_GAME = 'UPDATE_GAME'

const api = new API()

// export default (updatedGame) => {
//   return (dispatch) => {
//     dispatch({
//       type: UPDATE_GAME,
//       payload: updatedGame
//     })
//   }
// }

export const updateGame = (game) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.put(`/games/${game._id}`, game)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: GAME_UPDATED,
          payload: {
            game,
            players: result.body
          }
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
