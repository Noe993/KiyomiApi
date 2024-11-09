import { Router } from 'express'
import {pool} from '../db.js'
import {TraerJugadores, TraerJugador, Registrar, EmpezarContador, DetenerContador, ping} from '../controllers/jugadores.controller.js'

const router = Router()

router.get('/ping', ping)
// router.get('/pong', async (req,res) => {
//     const [result] = await pool.query('select 1 + 1 as result')
//     res.json(result[0])
// })

router.get('/TraerJugadores', TraerJugadores)
router.get('/TraerJugadores/:id', TraerJugador)
router.post('/Registrar', Registrar)
router.post('/EmpezarContador', EmpezarContador)
router.post('/DetenerContador', DetenerContador)

export default router