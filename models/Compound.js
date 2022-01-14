const Sequelize = require('sequelize')
const connection = require('../server/db_connection')

const Compound = connection.define(
  'compound',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    cas_number: {
      type: Sequelize.STRING(11),
      allowNull: true,
    },
    dtp_names: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    formula: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    number_of_atom_stereocenters: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    number_of_bond_stereocenters: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    structure_evaluation: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    molecular_weight: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    NCICADD_FICUS_ID: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    NCICADD_FICTS_ID: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    NCICADD_UUUUU_ID: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    standard_in_chi: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    standard_in_chi_key: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    smiles: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    full_atom_and_bond_stereospecification: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  { timestamps: false }
)

module.exports = Compound
