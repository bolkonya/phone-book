import React, {Component} from 'react';

import {IInputProps} from '../../../common/types';

import './index.styl';

export default class Input extends Component<IInputProps> {
  render() {
    const {classNames, value, onChangeHandler, type, placeholder, required} = this.props;

    return (
      <input className={`input ${classNames.join(' ')}`} value={value} onChange={onChangeHandler} type={type} placeholder={placeholder} required={required} />
    );
  }
}