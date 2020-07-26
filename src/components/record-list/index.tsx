import React, { Component, ReactNode } from 'react';

import Record from '../record';

import { IRecordListProps } from '../../../common/types';

export default class RecordList extends Component<IRecordListProps> {
  render(): ReactNode {
    const { records, disableFocus, deleteHandler } = this.props;
    const searchString = this.props.searchString.trim().toUpperCase();
    const shownRecords = searchString
      ? records.filter(
          ({ name, phoneNumber }) =>
            name.toUpperCase().includes(searchString) ||
            phoneNumber.includes(searchString)
        )
      : records;

    return (
      <article className="record-list">
        {shownRecords.map((record) => (
          <Record
            deleteHandler={deleteHandler}
            record={record}
            key={record.id}
            disableFocus={disableFocus}
          />
        ))}
      </article>
    );
  }
}
