import React, { useState, FormEvent } from 'react';
// aula 03 1:38:50 Link - history
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader'
import './styles.css';
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';

function TeacherForm() {

    const history = useHistory();

    //aula 03 58:00 state
    // 1:05:00 desestruturação
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

    // aula 03 1:17:00 onChange states
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    function addNewScheduleItem() {
        console.log('teste')

        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: "",
                to: ""
            }
        ])
    }

    // aula 03 1:22:00 FormEvent
    function handleCreateClass(e: FormEvent) {

        e.preventDefault();

        // aula 03 1:34:00
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            // porque no backend está como schedule, usaremos alias
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')

            // aula 03 1:38:50 Link - history
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro!')
        })

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
    }

    // aula 03 1:24:00 Horários disponíveis setState + criar função setScheduleItemValue()
    // aula 03 1:26:00
    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        })

        console.log(updatedScheduleItems)
        setScheduleItems(updatedScheduleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição" />

            {/* //aula 03 10:00 */}
            <main>
                <form onSubmit={handleCreateClass} >
                    <fieldset>
                        <legend>Seu dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }} />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        {/* aula 03 43:00 passar as opcoes pro select  */}
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
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                    <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {/* // aula 03 1:24:00 Horários disponíveis setState + criar função setScheduleItemValue() */}
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        value={scheduleItem.week_day}
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
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={scheduleItem.to}
                                    />
                                </div>
                            );
                        })}

                    </fieldset>



                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
Importante! <br />
Preencha todos os dados
                    </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;