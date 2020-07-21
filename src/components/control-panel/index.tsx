import React, { Component } from 'react';

import plusIconImage from '../../assets/svg/plus.svg';
import findIconImage from '../../assets/svg/find.svg';

import './index.css';

interface IControlPanelProps {}

interface IControlPanelState {
    addFormOpened: boolean;
    searchFormOpened: boolean;
}

export default class ControlPanel extends Component<IControlPanelProps, IControlPanelState> {
    state: IControlPanelState = {
        addFormOpened: false,
        searchFormOpened: false,
    }

    openAddForm = () => {
        this.setState({ addFormOpened: !this.state.addFormOpened });
    }

    openSearchForm = () => {
        this.setState({ searchFormOpened: !this.state.searchFormOpened });
    }

    render () {
        return (
            <div className='control-panel'>
                <div className='control-panel__buttons-bar'>
                    <button className={`control-panel__button ${this.state.addFormOpened ? 'control-panel__button_active' : ''}`} onClick={this.openAddForm} disabled={this.state.searchFormOpened}>
                        <img className='button-icon' src={plusIconImage} alt='Add new record' />
                        Добавить
                    </button>
                    <button className={`control-panel__button ${this.state.searchFormOpened ? 'control-panel__button_active' : ''}`} onClick={this.openSearchForm} disabled={this.state.addFormOpened}>
                        <img className='button-icon' src={findIconImage} alt='Find records' />
                        Найти
                    </button>
                </div>
                <section className={`control-panel__input-form ${this.state.addFormOpened ? 'control-panel__input-form_opened' : ''}`}>
                    <h1>Добавить новую запись</h1>
                    <div className='control-panel__input-box'>
                        <label className='control-panel__input-field'>
                            Имя
                            <input className='control-panel__input' type='text' placeholder='Введите имя' required />
                        </label>
                    </div>
                    <div className='control-panel__input-box'>
                        <label>
                            Телефон
                            <input className='control-panel__input' type='phone' placeholder='Введите номер' required />
                        </label>
                    </div>
                    <button className='control-panel__input-form-button'>Добавить</button>
                </section>
                <section className={`control-panel__input-form ${this.state.searchFormOpened ? 'control-panel__input-form_opened' : ''}`}>
                    <h1>Найти номер по имени</h1>
                    <div className='control-panel__input-box'>
                        <input className='control-panel__input' type='text' placeholder='Введите имя' required />
                    </div>
                    <button className='control-panel__input-form-button'>Найти</button>
                </section>
            </div>
        );
    }
}