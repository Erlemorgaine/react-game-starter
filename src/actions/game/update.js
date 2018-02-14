import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const UPDATE_GAME = 'UPDATE_GAME'

const api = new API()

export default (updatedGame) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_GAME,
      payload: updatedGame
    })
  }
}
