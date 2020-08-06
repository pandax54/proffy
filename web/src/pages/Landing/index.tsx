import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api';

import './styles.css'


function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);

    // aula 03 1:11:00 - acionar mudanças com useEffect
    useEffect(() => {
        // aula 03 1:12:00 promise
        api.get('/connections').then(response => {
            console.log(response)
            const { total } = response.data

            setTotalConnections(total);
        })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos on-line</h2>
                </div>
                <img src={landingImg} alt="plataforma de estudos" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="dar aulas" />
                        Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">Total de {totalConnections} conexões já realizadas
                <img src={purpleHeartIcon} alt="coracao roxo" />
                </span>
            </div>
        </div>
    )
}


export default Landing;