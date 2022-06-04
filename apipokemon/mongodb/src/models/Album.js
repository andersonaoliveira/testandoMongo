import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
    },
    {
        versionKey: false
    }
)

const albuns = mongoose.model("albuns", albumSchema);

export default albuns;