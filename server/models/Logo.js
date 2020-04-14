var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 5, max: 80  },
  backgroundColor: String,

  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 80 },
  borderWidth: { type: Number, min: 2, max: 80 },
  padding: { type: Number, min: 2, max: 80 },
  margin: { type: Number, min: 2, max: 80 },






  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);