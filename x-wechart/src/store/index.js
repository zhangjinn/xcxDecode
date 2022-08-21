import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers/index'

/**
 * request 返回promise, 不管是resolve还是reject，到redux-promise-middleware后均会dispatch进reducer，
 * 而在reduce中，我们希望只接收正常处理返回后的数据，所以如果发生错误，要在此中间件中阻断promise进入reducer
 *
 */
function checkError(store) {
  return function wrapDispatchCheckError(next) {
    return function dispatchCheckError(action) {
      if (!action.error) {
        // next(action)后, result === action
        let result = next(action)
        return result
      } else {
        return action
      }
    }
  }
}

export const configStore = () => {
  const store = createStore(rootReducer, applyMiddleware(promiseMiddleware, checkError))
  return store
}
