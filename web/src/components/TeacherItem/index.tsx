import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';


function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/16025055?s=460&u=6015bc372526e5bf21e49040a5487862d7ef25c6&v=4" alt="Vinicius" />
                <div>
                    <strong>Vinicius Morais Dutra</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

            <footer>
                <p>Preço/hora
                    <strong>R$ 80</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />
                Entrar em contato
                </button>
            </footer>

        </article>
    )
}

export default TeacherItem;