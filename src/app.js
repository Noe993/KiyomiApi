import express from 'express'
import jugadoresRoutes from './routes/jugadores.routes.js'
import cors from 'cors' 

const app = express()
const cors1 = cors()

app.use(express.json())
app.use(cors1)

app.use('/api',jugadoresRoutes)

app.use((req,res,next) =>{
    res.status(404).json({
        message: 'Ruta no encontrada'
    })
})

export default app;