import React, { Component, ReactNode } from 'react';

import { IRecordProps } from '../../../common/types';

import binImage from '../../assets/svg/bin.svg';

import './index.styl';

export default class Record extends Component<IRecordProps> {
  onDeleteClick = (): void => {
    this.props.deleteHandler(this.props.record.id);
  };

  render(): ReactNode {
    const {
      record: { name, phoneNumber },
      disableFocus,
    } = this.props;

    return (
      <section className="record">
        <div className="record__name">{name}</div>
        <div className="record__phone">{phoneNumber}</div>
        <button
          className="record__delete"
          onClick={this.onDeleteClick}
          tabIndex={disableFocus ? -1 : 0}
        >
          <img
            className="record__delete-icon"
            src={binImage}
            alt="Delete record"
          />
        </button>
      </section>
    );
  }
}
