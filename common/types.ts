interface IPhoneBookRecord {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface IPhoneBookProps {}

export interface IPhoneBookState {
  records: Array<IPhoneBookRecord>;
}

export interface IControlPanelProps {}

export interface IControlPanelState {
  addFormOpened: boolean;
  searchFormOpened: boolean;
}

export interface IRecordListProps {
  records: Array<IPhoneBookRecord>;
  deleteHandler: Function;
}

export interface IRecordProps {
  record: IPhoneBookRecord;
  deleteHandler: Function;
}
