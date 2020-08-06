import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

// aula 01 1:51:00 - interfaces e react function component
// aula 03 6:00
interface PageHeaderProps {
    // title?: string --> ? não orbrigatória
    title: string;
    description?: string;
}

// React.FC
// (props) == props.title
const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                {/* aula 03 7:00  */}
                {props.description ? <p>{props.description}</p> : null}
                {/* {props.description && <p>{props.description}</p>} */}
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;