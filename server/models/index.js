import mongoose from "mongoose"

const { Schema, model } = mongoose

const UserSchema = new Schema(
	{
		fullName: { required: true, type: String },
		email: { required: true, type: String, unique: true },
		password: { required: true, type: String },
		confirmed: { required: true, type: Boolean, default: false },
	},
	{ timestamps: true },
)

const UserModel = model("User", UserSchema)

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

const RiskModel = model("Risk", RiskSchema)

export { RiskModel, UserModel }
