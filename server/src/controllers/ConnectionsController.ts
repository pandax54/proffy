import { Request, Response } from 'express';
import db from '../database/connection';


export default class ConnectionsController {
    async index(request: Request, response: Response) {
        // aula 02 2:21:00
        const totalConnections = await db('connections').count('* as total')

        const { total } = totalConnections[0]

        return response.json({ total })
    }

    async create(request: Request, response: Response) {
        const { user_id } = request.body

        await db('connections').insert({
            user_id
        });

        return response.status(201).send()
    }
}