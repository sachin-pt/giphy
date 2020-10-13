import { createBrowserHistory } from 'history'

let history

export default () => {
  history = history || createBrowserHistory()
  return history
}
