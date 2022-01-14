const Sequelize = require('sequelize')
const connection = require('../server/db_connection')

const Isotope = connection.define(
  'isotope',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    atomic_number_unique: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    known_isotopes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    stable_isotopes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    is_monoisotopic: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    atomic_number_notunique: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    mass: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    abundance: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    mass_number: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    mass_uncertainty: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
    is_radioactive: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    half_life: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
    half_life_unit: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
    spin: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    g_factor: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    quadrupole_moment: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
  },
  { timestamps: false }
)

module.exports = Isotope
