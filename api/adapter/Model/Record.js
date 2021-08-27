import mongoose from 'mongoose'

// Schema for 'record' collection in DB
const RSchema = new mongoose.Schema(
	{
		key: String,
		createdAt: Date,
		counts: [Number],
	}
)

export default mongoose.model('Record', RSchema);