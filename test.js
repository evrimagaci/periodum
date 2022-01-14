const formula = 'C2H5OH'
const availableElements = []
const elements = [
  {
    symbol: 'C',
    count: 2,
  },
  {
    symbol: 'H',
    count: 1,
  },
]
const finalized = []
let symbol = ''
let count = ''
let flagElement = false
const chars = formula.split('')

chars.forEach((char, index) => {
  if (!flagElement && isNaN(char * 1) && char === char.toUpperCase()) {
    symbol += char
    flagElement = true
  } else if (isNaN(char * 1) && char === char.toLowerCase()) {
    symbol += char
  } else if (!isNaN(char * 1)) {
    count += char
  } else {
    availableElements.push({
      symbol,
      count: count === '' ? 1 : Number(count),
    })
    symbol = char
    count = ''
  }
  pushAvailableElement(index)
})

let foundIndex = null
const lastElement = elements[elements.length - 1]
availableElements.forEach((availableElement, index) => {
  if (foundIndex !== null && lastElement.symbol === availableElement.symbol) {
    if (lastElement.count < availableElement.count) {
      finalized.push(availableElement.symbol)
    }
    foundIndex = index
  } else if (index > foundIndex) {
    finalized.push(availableElement.symbol)
  }
})

function pushAvailableElement(index) {
  if (chars.length - 1 === index) {
    availableElements.push({
      symbol,
      count: count === '' ? 1 : Number(count),
    })
  }
}

console.log(availableElements)
console.log(finalized)
