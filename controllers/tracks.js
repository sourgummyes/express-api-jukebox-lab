const express = require('express');
const router = express.Router();
const Track = require('../models/track.js')

router.get('/', async (req, res) => {
    try {
      const foundTracks = await Track.find();
      res.status(200).json(foundTracks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const createdTrack = await Track.create(req.body);
      res.status(201).json(createdTrack);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const foundTrack = await Track.findById(req.params.id);
      if (!foundTrack) {
        res.status(404);
        throw new Error('Track not found.');
      }
      res.status(200).json(foundTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedTrack) {
        res.status(404);
        throw new Error('Track not found.');
      }
      res.status(200).json(updatedTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deletedTrack = await Track.findByIdAndDelete(req.params.id);
      if (!deletedTrack) {
        res.status(404);
        throw new Error('Review not found.');
      }
      res.status(200).json(`${deletedTrack.title} has been deleted.`);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });


  module.exports = router;