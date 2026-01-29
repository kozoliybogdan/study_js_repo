import React from 'react';
import parrots from './assets/images/parrot.jpg';

export default function App() {
    return (
        <div className="container">
            <h1>Приклад проєкту з Webpack</h1>
            <p>
                Перевірка: <b>SCSS</b>, <b>локальні шрифти</b>, <b>зображення</b>, <b>hashing</b>, <b>vendor optimization</b>.
            </p>

            <img className="image" src={parrots} alt="parrot" />

            <div className="card">
                У межах завдання підключено SCSS-стилі, локальний шрифт та зображення.
                Також налаштовано хешування файлів і оптимізацію збірки для production-режиму.
            </div>
        </div>
    );
}