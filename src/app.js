import express from 'express'
import jugadoresRoutes from './routes/jugadores.routes.js'

const app = express()

app.use(express.json())

app.use('/api',jugadoresRoutes)

app.use((req,res,next) =>{
    res.status(404).json({
        message: 'Ruta no encontrada'
    })
})

export default app;