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
        className={`input ${classNames ? classNames.join(' ') : ''}`}
        value={value}
        onChange={onChangeHandler}
        type={type || 'text'}
        placeholder={placeholder || ''}
        required={Boolean(required)}
        tabIndex={tabIndex || 0}
      />
    );
  }
}
