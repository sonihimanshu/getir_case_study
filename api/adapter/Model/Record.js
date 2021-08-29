const mongoose = require('mongoose')

// Schema for 'record' collection in DB
const RSchema = new mongoose.Schema(
	{
		key: String,
		createdAt: Date,
		counts: [Number],
	}
)

module.exports = mongoose.model('Record', RSchema);