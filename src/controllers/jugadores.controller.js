import {pool} from '../db.js'

export const ping = async (req,res) => {
    res.send('pong')
}

export const TraerJugadores = async (req,res) => {
    try {
        const [result] = await pool.query('call spTraerJugadores')
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}

export const TraerJugador = async (req,res) => {
    try {
        const [result] = await pool.query('select * from jugadores where id = ?',
            [req.params.id]
        )
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}

export const Registrar = async (req,res) => {
    try {
        const {usuario, password} = req.body 
        if(!isNullOrEmpty(usuario) && !isNullOrEmpty(password)){
            console.log(usuario)
            const [result] = await pool.query('call spCrearUsuario (?,?)',
            [usuario, password])
            res.json(result[0])
        }
        return res.status(404).json({message: 'campos vacios'})
    } catch (error) {
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}
export const EmpezarContador = async (req,res) => {
    try {
        const {id} = req.body
        const [result] = await pool.query('call spEmpezarContador (?)',
        [id])
        // res.json(result[0])
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}
export const DetenerContador = async (req,res) => {
    try {
        const {id} = req.body
        const [result] = await pool.query('call spDetenerContador (?)',
        [id])
        // res.json(result[0])
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}

function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}