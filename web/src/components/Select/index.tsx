// aula 03 20:30 => InputHTMLAttributes
import React, { SelectHTMLAttributes } from 'react';
import './styles.css';
// ideias para estilizar o select
// https://react-select.com/home

// aula 03 17:30 FC e interface
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    // options é um array com objectos e cada objeto tem dois valores 
    options: Array<{
        value: string;
        label: string;
    }>;

}

// colocaremos na variável rest todos os atributos que um Select pode receber
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                {/* aula 03 47:00 */}
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;