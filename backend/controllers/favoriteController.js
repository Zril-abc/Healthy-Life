const Favorite = require('../models/Favorite');

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.userId })
      .populate('content')
      .sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { contentId } = req.params;
    const existing = await Favorite.findOne({ user: req.userId, content: contentId });
    if (existing) return res.status(400).json({ message: 'Sudah ada di favorit' });

    const favorite = await Favorite.create({ user: req.userId, content: contentId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ user: req.userId, content: req.params.contentId });
    res.json({ message: 'Dihapus dari favorit' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};
