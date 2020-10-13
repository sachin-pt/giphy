export default function (getState) {
  const state = getState && getState()
  const { shell: { useragent: { vernac } } = {} } = state || {}
  if (vernac && window) {
    window.open = (function (open) {
      return function (url, name, features) {
        if (!/.*?housing\.com/.test(url) && url.indexOf(vernac) !== 0) {
          url = vernac + url
        }
        return open.call(window, url, name, features)
      }
    })(window.open)
  }
}
