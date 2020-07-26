import React, { Component, ReactNode } from 'react';

import { IInputProps } from '../../../common/types';

import './index.styl';

export default class Input extends Component<IInputProps> {
  render(): ReactNode {
    const {
      classNames,
      value,
      onChangeHandler,
      type,
      placeholder,
      required,
      tabIndex,
    } = this.props;

    return (
      <input
        className={`input ${classNames.join(' ')}`}
        value={value}
        onChange={onChangeHandler}
        type={type}
        placeholder={placeholder}
        required={required}
        tabIndex={tabIndex || 0}
      />
    );
  }
}
