import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api';
import './styles.css';

// aula 03 1:49:00 // 1:54:00
export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    // aula 03 1:58:00
    function createNewConnection() {

        api.post('/connections', {
            user_id: teacher.id
        })

    }

    return (
        <article key={teacher.id} className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>Preço/hora
    <strong>R$ {teacher.cost}</strong>
                </p>
                {/* aula 03 1:55:00 whatsapp button // connection 1:58:00  */}
                <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="whatsapp" />
                Entrar em contato
                </a>
            </footer>

        </article>
    )
}

export default TeacherItem;