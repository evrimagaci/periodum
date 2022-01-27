const express = require('express')
const router = express.Router()
const cache = require('memory-cache')
const axios = require('axios')
const DBHandler = require('./DBHandler')

router.get('/api/elements', function (req, res) {
  try {
    const elements = cache.get('elements')
    if (elements) {
      res.status(200).send(elements)
      // refresh caches
      return DBHandler.getElements()
    } else {
      const tempElements = cache.get('temp_elements')
      if (tempElements) {
        res.status(200).send(tempElements)
        // refresh caches
        return DBHandler.getElements()
      } else {
        // refresh caches
        return DBHandler.getElements().then(({ data: elements }) => {
          res.status(200).send(elements)
        })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'something went wrong' })
  }
})

router.get('/api/isotopes', function (req, res) {
  try {
    const isotopes = cache.get('isotopes')
    if (isotopes) {
      res.status(200).send(isotopes)
      // refresh caches
      return DBHandler.getIsotopes()
    } else {
      const tempIsotopes = cache.get('temp_isotopes')
      if (tempIsotopes) {
        res.status(200).send(tempIsotopes)
        // refresh caches
        return DBHandler.getIsotopes()
      } else {
        // refresh caches
        return DBHandler.getIsotopes().then(({ data: isotopes }) => {
          res.status(200).send(isotopes)
        })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'something went wrong' })
  }
})

router.get('/api/compounds/:formula', async function (req, res) {
  const key = `compounds-${req.params.formula}`
  try {
    let compounds = cache.get(key)
    if (!compounds) {
      compounds = await DBHandler.findAllByFormula(req.params.formula)
      cache.put(key, compounds, 60000)
    }
    res.status(200).send(compounds)
  } catch (err) {
    res.status(500).send({ err })
  }
})

router.get('/api/compounds', function (req, res) {
  try {
    const compounds = cache.get('compounds')
    if (compounds) {
      res.status(200).send(compounds)
      // refresh caches
      return DBHandler.findAllCompounds()
    } else {
      const tempCompounds = cache.get('temp_compounds')
      if (tempCompounds) {
        res.status(200).send(tempCompounds)
        // refresh caches
        return DBHandler.findAllCompounds()
      } else {
        // refresh caches
        return DBHandler.findAllCompounds().then(({ data: compounds }) => {
          res.status(200).send(compounds)
        })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'something went wrong' })
  }
})

router.get('/api/contents/:id', async function (req, res) {
  try {
    const result = await axios.get(`https://evrimagaci.org/api/v2/content/${req.params.id}`)
    res.status(200).send(result.data)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'something went wrong' })
  }
})

router.get('/api/credits', function (req, res) {
  try {
    const result = require(`../credits.json`)
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ err: 'something went wrong' })
  }
})

router.get('/api/about', async function (req, res) {
  try {
    const result = await axios.get(`https://evrimagaci.org/api/v2/content/11003`)
    res.status(200).send(result.data.content)
  } catch (err) {
    res.status(500).send({ err: 'something went wrong' })
  }
})

module.exports = router
