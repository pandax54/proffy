import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import Input from '../../components/input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

import PageHeader from '../../components/PageHeader'
// aula 03 1:53:00
import TeacherItem, { Teacher } from '../../components/TeacherItem'

// aula 03 1:44:00 button

function TeacherList() {
    // aula 03 1:48:00
    const [teachers, setTeachers] = useState([])
    // criar os estados para filtro
    // aula 03 1:41:00
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        // aula 03 1:46:00 query params para filtro
        // agora o api com async await
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });



        console.log({
            subject,
            week_day,
            time
        })

        console.log(response.data)
        setTeachers(response.data);
    }


    return (
        <div id="page-teacher-list" className="container">
            {/* aula 01 1:58:00 colocar conteúdo dentro do component props.children  */}
            <PageHeader title="Estes sãos os proffys disponíveis.">
                <form action="" id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: "Artes" },
                            { value: 'Biologia', label: "Biologia" },
                            { value: 'Educação Física', label: "ducação Física" },
                            { value: 'Física', label: "Física" },
                            { value: 'Geografia', label: "Geografia" },
                            { value: 'História', label: "História" },
                            { value: 'Matemática', label: "Matemática" },
                            { value: 'Português', label: "Português" },
                            { value: 'Química', label: "Química" }

                        ]} />

                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: "Domingo" },
                            { value: '1', label: "Segunda-feira" },
                            { value: '2', label: "Terça-feira" },
                            { value: '3', label: "Quarta-feira" },
                            { value: '4', label: "Quinta-feira" },
                            { value: '5', label: "Sexta-feira" },
                            { value: '6', label: "Sábado" }

                        ]} />

                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        // aula 03 1:43:00 onChange (pois sem botão)
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}

            </main>
        </div>
    )
}

export default TeacherList;