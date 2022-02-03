export default (unit, temp) => {
  let k = temp
  if (unit === 'c') {
    k = temp + 273.15
  } else if (unit === 'f') {
    k = (temp + 459.67) * 1.8
  }
  const c = k - 273.15
  const f = c * 1.8 - 459.67
  return {
    k: Number(k).toFixed(k % 1 !== 0 ? 2 : 0),
    c: c.toFixed(c % 1 !== 0 ? 2 : 0),
    f: f.toFixed(f % 1 !== 0 ? 2 : 0),
  }
}
