const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/add', async (req, res) => {
  const { title, name, date, time, location, description } = req.body;

  try {
    const newEvent = new Event({
      title,
      name,
      date,
      time,
      location,
      description,
      attendeeCount: 0,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add event" });
  }
});

module.exports = router;
