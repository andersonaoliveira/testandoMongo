import express from "express";
import pokemons from "./pokemonsRoutes.js"
import albuns from "./albunsRoutes.js"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "testando"});
  })

  app.use(
    express.json(),
    pokemons,
    albuns
  )
}

export default routes