import React, {useEffect, useState} from 'react';
import './style.css'
import FormAdd from "../formAdd/FormAdd";





const Main = () => {

    const [income, setIncome] = useState(() => {
        const savedIncome = localStorage.getItem('income')
        return savedIncome ? JSON.parse(savedIncome) : [
            {id: 1, type: 'income', category: 'Зарплата', amount: 0},
            {id: 2, type: 'income', category: 'Аванс', amount: 0},
            {id: 3, type: 'income', category: 'Прочее', amount: 0},
        ]
    })


    const [consumptions, setConsumptions] = useState(() => {
        const savedConsumption = localStorage.getItem('consumption')
        return savedConsumption ? JSON.parse(savedConsumption) : [
            {id: 4, type: 'consumption', category: 'Расход',  expectation: [] , amount: 0},
            {id: 5, type: 'consumption', category: 'Интернет', expectation:  [], amount: 0},
            {id: 6, type: 'consumption', category: 'Еда', expectation: [], amount: 0},
        ]
    })


    const [newIncome, setNewIncome] = useState({
        type: 'income',
        category: '',
        amount: '',
    })

    const generateUniqueId = () => Date.now() + Math.random();

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = parseFloat(newIncome.amount);
        if (!isNaN(amount)) {
            const incomeToAdd = {
                ...newIncome,
                id: generateUniqueId(),
                amount: amount
            };

            if (newIncome.type === 'income') {
                setIncome([...income, incomeToAdd]);
            } else {
                setConsumptions([...consumptions, incomeToAdd]);
            }

            setNewIncome({ type: 'income', category: '', amount: '' });
        } else {
            alert("Введите корректное числовое значение.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewIncome((prevIncome) => ({
            ...prevIncome,
            [name]: value,
        }))
    }

    const handleAmountClick = (id, type) => {
        const newAmount = parseFloat(prompt("Введите сумму"));
        if (!isNaN(newAmount)) {
            if (type === 'income') {
                setIncome((prevIncome) =>
                    prevIncome.map((transaction) =>
                        transaction.id === id ? { ...transaction, amount: newAmount } : transaction
                    )
                );
            } else {
                setConsumptions((prevConsumption) =>
                    prevConsumption.map((transaction) =>
                        transaction.id === id ? { ...transaction, amount: newAmount } : transaction
                    )
                );
            }
        } else {
            alert("Введите корректное числовое значение.");
        }
    };

    const handleExpectation = (id) => {
        const newExpectation = parseFloat(prompt("Введите сумму"));
        if (!isNaN(newExpectation)) {
            setConsumptions((prevConsumption) =>
                prevConsumption.map((transaction) =>
                    transaction.id === id ? { ...transaction, expectation: newExpectation } : transaction
                )
            );
        } else {
            alert("Введите корректное числовое значение.");
        }
    };

    const calculateTotalBalance = () => {
        const totalIncome = income.reduce((total, transaction) => total + transaction.amount, 0);
        const totalConsumptions = consumptions.reduce((total, transaction) => total + transaction.amount, 0);
        const balance = totalIncome - totalConsumptions;

        return `${balance.toLocaleString('ru-RU')} ₽`;
    };

    useEffect(() => {
        localStorage.setItem('income', JSON.stringify(income))
    })

    useEffect(() => {
        localStorage.setItem('consumption', JSON.stringify(consumptions))
    })



    return (
        <>
            <div className='title-name'>
                <h3 className='first'>April</h3>
                <h3 className='second'>{calculateTotalBalance()}</h3>
            </div>

            <div className='block'>
                <div className="grid-container">
                    {/* Левый столбец: Доходы */}
                    <div className="grid-column grid-column--left">
                        <h3 className="column-title">Доходы</h3>
                        {income.map((transaction) => (
                            <div className="grid-row" key={transaction.id}>
                                <span>{transaction.category}</span>
                                <span onClick={() => handleAmountClick(transaction.id, 'income')}>
                                    {transaction.amount.toLocaleString('ru-RU')} ₽
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Правый столбец: Расходы */}
                    <div className="grid-column">
                        <h3 className="column-title">Расходы</h3>
                        {consumptions.map((transaction) => (
                            <div className="grid-row" key={transaction.id}>
                                <span>
                                    {transaction.category}
                                </span>
                                <span onClick={() => handleExpectation(transaction.id, 'consumption')}>
                                    {transaction.expectation} ₽
                                </span>
                                <span onClick={() => handleAmountClick(transaction.id, 'consumption')}>
                                    {transaction.amount} ₽
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FormAdd newIncome={newIncome} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
        </>
    );
};

export default Main;