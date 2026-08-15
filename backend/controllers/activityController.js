const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.userId }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

exports.addActivity = async (req, res) => {
  try {
    const { type, value, notes, date } = req.body;
    if (!type || !value) {
      return res.status(400).json({ message: 'Tipe dan nilai aktivitas wajib diisi' });
    }
    const activity = await Activity.create({ user: req.userId, type, value, notes, date });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    await Activity.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Aktivitas dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};
