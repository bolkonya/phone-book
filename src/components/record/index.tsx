import React, { Component } from 'react';

import {IRecordProps} from '../../../common/types';

import binImage from '../../assets/svg/bin.svg';

import './index.styl';

export default class Record extends Component<IRecordProps> {
  onDeleteClick = () => {
    this.props.deleteHandler(this.props.record.id);
  }

  render() {
    return (
      <section className='record'>
        <div className='record__name'>{this.props.record.name}</div>
        <div className='record__phone'>{this.props.record.phoneNumber}</div>
        <button className='record__delete' onClick={this.onDeleteClick}>
          <img className='record__delete-icon' src={binImage} alt='Delete record' />
        </button>
      </section>
    );
  }
}