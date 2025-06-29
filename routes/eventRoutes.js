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


// GET all events by a specific user
router.get('/my-events/:name', async (req, res) => {
  try {
    const myEvents = await Event.find({ name: req.params.name });
    res.json(myEvents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events' });
  }
});

// UPDATE an event
router.put('/update/:id', async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// DELETE an event
router.delete('/delete/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
