import React, {Component} from 'react';

import Record from '../record';

import {IRecordListProps} from '../../../common/types';

export default class RecordList extends Component<IRecordListProps> {
  render() {
    return (
      <article className='record-list'>
        {this.props.records.map(record => (
          <Record deleteHandler={this.props.deleteHandler} record={record} key={record.id} />
        ))}
      </article>
    );
  }
}