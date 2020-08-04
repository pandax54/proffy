import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

import PageHeader from '../../components/PageHader'
import TeacherItem from '../../components/TeacherItem'

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            {/* aula 01 1:58:00 colocar conteúdo dentro do component props.children  */}
            <PageHeader title="Estes sãos os proffys disponíveis.">
                <form action="" id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="week_day">Dia da Semana</label>
                        <input type="text" id="subject" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="time">Hora</label>
                        <input type="text" id="time" />
                    </div>
                </form>
            </PageHeader>
            <main>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList;