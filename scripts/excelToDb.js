const fs = require('fs')
const readFileAsync = require('util').promisify(fs.readFile)
const XLSX = require('xlsx')
const dbConnection = require('../server/db_connection')
const Isotope = require('../models/Isotope')

async function handleIsotopes() {
  const excelData = await readFileAsync('./sheets/pt.xlsx')
  const wb = XLSX.read(excelData, { type: 'buffer' })

  const data = XLSX.utils.sheet_to_json(wb.Sheets['mendeleev isotopes'], {
    header: 2,
    blankrows: false,
    raw: true,
    defval: null,
  })
  await Isotope.bulkCreate(data)
}

dbConnection
  .sync({ force: false })
  .then(() => {
    return handleIsotopes()
  })
  .then(() => {
    process.exit()
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  })
