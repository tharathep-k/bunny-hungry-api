module.exports = (req, res) => {
  res.status(404).json({ msg: "Resource not found on this server." });
};
