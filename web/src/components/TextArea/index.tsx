// aula 03 20:30 => InputHTMLAttributes
import React, { TextareaHTMLAttributes } from 'react';
import './styles.css';


// aula 03 17:30 FC e interface
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;

}

// colocaremos na variável rest todos os atributos que um Textarea pode receber
const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
    );
}

export default Textarea;