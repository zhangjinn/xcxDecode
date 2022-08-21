import { handleActions } from 'redux-actions'
import { LOADING_MSG, SHOW_POPUP_TOAST } from '@/store/types/loading'

export default handleActions({
  [LOADING_MSG] (state, action) {
    const { loading } = state
    const { payload } = action
    return {
      ...state,
      loading: payload || !loading
    }
  },
  [SHOW_POPUP_TOAST] (state, action) {
    const { payload } = action
    return {
      ...state,
      popup: payload
    }
  }
}, {
  loading: false,
  popup: {
    show: false,
    info: ''
  }
})
