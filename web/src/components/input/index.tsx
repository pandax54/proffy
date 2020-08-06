// aula 03 20:30 => InputHTMLAttributes
import React, { InputHTMLAttributes } from 'react';
import './styles.css';


// aula 03 17:30 FC e interface
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;

}

// colocaremos na variável rest todos os atributos que um input pode receber
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;