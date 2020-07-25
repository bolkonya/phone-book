export interface IPhoneBookRecord {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface IPhoneBookProps {}

export interface IPhoneBookState {
  records: Array<IPhoneBookRecord>;
  dataIsFetching: boolean;
}

export interface IControlPanelProps {
  records: Array<IPhoneBookRecord>;
  addHandler: (name: string, phoneNumber: string) => void;
}

export interface IControlPanelState {
  addFormOpened: boolean;
}

export interface IRecordListProps {
  records: Array<IPhoneBookRecord>;
  deleteHandler: (id: number) => void;
}

export interface IRecordProps {
  record: IPhoneBookRecord;
  deleteHandler: (id: number) => void;
}

export interface IAddRecordFormProps {
  records: Array<IPhoneBookRecord>;
  isOpened: boolean;
  addHandler: (name: string, phoneNumber: string) => void;
  changeVisibility: () => void;
}

export interface IAddRecordFormState {
  nameValue: string;
  phoneValue: string;
  validationError: boolean;
  tip: string;
}
