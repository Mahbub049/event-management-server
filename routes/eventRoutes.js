const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const moment = require('moment');

// 🔹 Create new event
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

// 🔹 Get all events (descending by date & time)
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1, time: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// 🔹 Join an event
router.patch('/join/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.attendeeCount += 1;
    await event.save();
    res.json({ message: 'You joined the event!', attendeeCount: event.attendeeCount });
  } catch (err) {
    res.status(500).json({ message: 'Join failed' });
  }
});

module.exports = router;
