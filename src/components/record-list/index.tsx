import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Record from '../record';

import {IRecordListProps} from '../../../common/types';

import './index.styl';

export default class RecordList extends Component<IRecordListProps> {
  render() {
    return (
      // <article className='record-list'>
      //   {this.props.records.map(record => (
      //     <Record deleteHandler={this.props.deleteHandler} record={record} key={record.id} />
      //   ))}
      // </article>
      <TransitionGroup className='record-list'>
        {this.props.records.map(record => (
          <CSSTransition
            key={record.id}
            timeout={500}
            classNames="item"
          >
            <Record deleteHandler={this.props.deleteHandler} record={record} key={record.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}