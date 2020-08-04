import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinute';

export default class ClassesController {

    async index(request: Request, response: Response) {
        // listagem das aulas
        // filtros: dia da semana, materia, horário req.query
        // http://localhost:3333/classes?week_day=1&subject=matem%C3%A1tica&time=9%3A00
        const filters = request.query

        // !filters.subject || !filters.week_day || !filters.time
        if (!filters.subject || !filters.week_day || !filters.time) {
            return response.status(400).json({ error: "missing filter to search classes" })
        }

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // aula 02 2:01:00
        // const timeInMinutes = convertHourToMinute(filters.time as string)
        const timeInMinutes = convertHourToMinute(time)

        console.log(timeInMinutes)

        // pegando os dados no banco de dados
        // aula 02 2:03:00 - 2:15:00
        const classes = await db('classes')
            // aula 02 2:06:00
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_Schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            // incluir os dados do usuário por meio do user_id
            // juntar com a tabela user onde o user_id é igual ao id da tabela users
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        // rota de criação das aulas
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body

        // aula 02 1:49:00 transactions
        const trx = await db.transaction();

        try {

            // nome da tabela e inserir as colunas
            // retorna o id do usuário (lista, entao lembre-se de pegar a primeira nesse caso)
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            const user_id = insertedUsersIds[0];

            const insertedclassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const class_id = insertedclassesIds[0];

            // aula 02 1:40:00 convertendo o horário para minutos
            // transformar a hora do from e to em minutos
            interface ScheduleItem {
                week_day: number;
                from: string;
                to: string;
            }
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to)
                };
            })

            await trx("class_schedule").insert(classSchedule)

            // insere tudo ao mesmo tempo no db
            // para evitar erros
            await trx.commit();

            // console.log(data)
            return response.status(201).send();
        } catch (error) {
            // desfazer qualquer alteração no banco de dados
            await trx.rollback();

            console.log(error)
            return response.status(400).json({ error: 'Unexpected error while creating new class' })
        }
    }
}