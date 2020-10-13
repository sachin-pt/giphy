import configureStore from 'shared/store'

let store
export const getStore = () => store
export default (initialState, helpers) => {
  store = configureStore(initialState, helpers)
  return store
}
