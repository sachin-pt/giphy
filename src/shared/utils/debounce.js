function debounce (func, wait) {
  let ctx = this
  let timeout = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    const args = arguments
    timeout = setTimeout(() => {
      func.apply(ctx, args)
    }, wait)
  }
}
export default debounce
