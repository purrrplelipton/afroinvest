import { Schema, model } from "mongoose"

const RiskSchema = new Schema({
	score: { required: true, type: Number, min: 0, max: 100 },
	stocks: {
		local: { required: true, type: Number, min: 0, max: 100 },
		foreign: { required: true, type: Number, min: 0, max: 100 },
		tech: { required: true, type: Number, min: 0, max: 100 },
		emerging: { required: true, type: Number, min: 0, max: 100 },
	},
	bonds: {
		local: { required: true, type: Number, min: 0, max: 100 },
		foreign: { required: true, type: Number, min: 0, max: 100 },
	},
	commodities: { required: true, type: Number, min: 0, max: 100 },
	"real estate": { required: true, type: Number, min: 0, max: 100 },
	"t-bills": { required: true, type: Number, min: 0, max: 100 },
	alternatives: { required: true, type: Number, min: 0, max: 100 },
})

export default model("Risk", RiskSchema)
