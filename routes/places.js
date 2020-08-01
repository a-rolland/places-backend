const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const uploader = require('../config/cloudinary-setup');

// include the model:
const Place = require('../models/place')

router.get('/', (req, res, next) => {
  Place.find()
    .then(resp => res.status(200).json(resp))
    .catch(err => next(err))
})

router.get('/highlights', (req, res, next) => {

  const quantity = req.query.quantity

  console.log(quantity)

  // Place.find({highlight..... << crear aqui tu query})
  //   .then(resp => res.status(200).json(resp))
  //   .catch(err => next(err))

  res.status(200).json({ message: "aguardando implementacion. " })

})

router.get("/search", (req, res, next) => {

  const miles = req.query.miles
  const lat = req.query.lat
  const lng = req.query.lng
  console.log("Recibiendo query params miles, lat, lng: ", miles, lat, lng)

  const milesToRadian = function (miles) {
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
  }

  const query = {
    "loc": {
      $geoWithin: {
        $centerSphere: [[lat, lng], milesToRadian(miles)]
      }
    }
  }

  Place.find(query)
    .then(resp => res.status(200).json(resp))
    .catch(err => next(err))

})

router.get('/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      res.json(place)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/', (req, res, next) => {
  Place.create(req.body)
  .then(place => {
    // console.log('Created new thing: ', aNewThing);
    res.status(200).json(place)
  })
  .catch(err => next(err))
})
//FILE UPLOAD AQUI

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
  // console.log('file is: ', req.file)
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ path: req.file.path });
})

router.get('/highlights', (req, res, next) => {
  const quantity = Number(req.query.quantity)
  console.log(quantity)
  Place.find({highlight: {$eq: true}}).limit(quantity)
  .then(resp => res.status(200).json(resp))
  .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  // to do
  //req.params.id
  res.status(200).json({ message: "DELETE aguardando implementacion. " })

})

router.patch('/:id', (req, res, next) => {
  // to do
  //req.params.id
  res.status(200).json({ message: "PATCH aguardando implementacion. " })

})

router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' })
    return
  }

  Place.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Place id ${req.params.id} updated successfully.` })
    })
    .catch(error => {
      res.json(error)
    })
})


module.exports = router
