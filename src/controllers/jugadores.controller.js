import {pool} from '../db.js'

export const ping = async (req,res) => {
    res.send('pong')
}

export const TraerJugadores = async (req,res) => {
    try {

        // const [result] = await pool.query('call spTraerJugadores')
        const [result] = await pool.query('select id, usuario, IFNULL(secs_played, 0) as secs_played from jugadores')
        res.json(result)
    } catch (error) {
        console.log(error)
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
        console.log(error)
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}

export const Registrar = async (req,res) => {
    try {
        const {usuario, password} = req.body 
        if(!isNullOrEmpty(usuario) && !isNullOrEmpty(password)){
            // const [result] = await pool.query('call spCrearUsuario (?,?)',
            const [result] = await pool.query('insert into jugadores(usuario, password) values(?,?)',
            [usuario, password])
            const [row] = await pool.query('select id from jugadores where usuario = ? and password = ?',
                [usuario, password])
            return res.json(row)
        }
        return res.status(404).json({message: 'campos vacios'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}
export const EmpezarContador = async (req,res) => {
    try {
        const {id} = req.body
        // const [result] = await pool.query('call spEmpezarContador (?)',
        // [id])
        const [result] = await pool.query('update jugadores set session_start = now() where id = ?',
        [id])
        // res.json(result[0])
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Ocurrio un error'})
    }
}
export const DetenerContador = async (req,res) => {
    try {
        const {id} = req.body
        // const [result] = await pool.query('call spDetenerContador (?)',
        // [id])
        await pool.query('update jugadores set session_end = now()where id = ?',
        [id])
        await pool.query('update jugadores set secs_played = IFNULL(secs_played, 0) + TIMESTAMPDIFF(SECOND, session_start, session_end) where id = ?',
        [id])
        // res.json(result[0])
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}