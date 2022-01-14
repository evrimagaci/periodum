const { Sequelize } = require('sequelize')
const cache = require('memory-cache')
const Compound = require('../models/Compound')
const Isotope = require('../models/Isotope')

const dbConnection = require('./db_connection')

async function getElements() {
  const key = 'elements'
  const elements = await dbConnection.query('Select * from elements', {
    type: Sequelize.QueryTypes.SELECT,
  })
  cache.put(key, elements, 60 * 60 * 1000, (key, value) => cache.put(`temp_${key}`, value, 24 * 60 * 60 * 1000))
  return elements
}

async function getIsotopes() {
  const key = 'isotopes'
  const isotopes = await Isotope.findAll()
  cache.put(key, isotopes, 60 * 60 * 1000, (key, value) => cache.put(`temp_${key}`, value, 24 * 60 * 60 * 1000))
  return isotopes
}

function findAllByFormula(formula) {
  return Compound.findAll({ where: { formula } })
}

async function findAllCompounds() {
  const key = 'compounds'
  const compounds = await Compound.findAll({ attributes: ['formula'] })
  cache.put(key, compounds, 60 * 60 * 1000, (key, value) => cache.put(`temp_${key}`, value, 24 * 60 * 60 * 1000))
  return compounds
}

module.exports = {
  getElements,
  findAllByFormula,
  findAllCompounds,
  getIsotopes,
}
