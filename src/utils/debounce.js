export function debounce(fn, wait) {
  let timeout
  // eslint-disable-next-line func-names
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
