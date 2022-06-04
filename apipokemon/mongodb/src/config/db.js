import mongoose from "mongoose"

mongoose.connect("mongodb+srv://pokemon:123@pokemon.xyyn278.mongodb.net/pokemon");

let db = mongoose.connection;

export default db;