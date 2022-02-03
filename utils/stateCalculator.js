import unitCalculator from './unitCalculator'

export default (element, temp, unit) => {
  const ref = unitCalculator(unit, temp).k

  if (element.boil_use === '' && element.melt_use === '') {
    return 'unknown'
  }
  if (element.boil_use === '') {
    return ref >= element.melt_use ? 'unknown' : 'solid'
  }
  if (element.melt_use === '') {
    return ref >= element.boil_use ? 'gas' : 'unknown'
  }
  if (ref >= element.boil_use) {
    return 'gas'
  } else if (ref >= element.melt_use) {
    return 'liquid'
  } else {
    return 'solid'
  }
}
