import React from 'react';
import './style.css'

const FormAdd = ({newIncome, handleInputChange, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className='form'>

            <div className='transaction'>
                <label></label>
                <select name="type" value={newIncome.type} onChange={handleInputChange}>
                    <option value="income">Доход</option>
                    <option value="consumption">Расход</option>
                </select>
            </div>


            <div className='category'>
                <label>Категория:</label>
                <input type="text" name="category" value={newIncome.category} onChange={handleInputChange} required
                />
            </div>

            <div className='sum'>
                <label >Сумма:</label>
                <input type="number" name="amount" value={newIncome.amount} onChange={handleInputChange} required
                />
            </div>

            <button type="submit" className='btn-transaction'>Добавить</button>

        </form>

    );
};

export default FormAdd;