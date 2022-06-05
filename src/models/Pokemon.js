import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema(
    {
        id: {type: String},
        nomePokemon: {type: String, required: true},
        numeroPokemon: {type: Number},
        velocidade: {type: Number},
        hp: {type: Number},
        ataque: {type: Number},
        defesa: {type: Number},
        ataqueEspecial: {type: Number},
        defesaEspecial: {type: Number},
        linkDaFoto: {type: String, required: true}
    }    
);

const pokemons = mongoose.model('pokemons', pokemonSchema);

export default pokemons;