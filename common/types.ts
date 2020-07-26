import { FormEvent } from 'react';

export interface IPhoneBookRecord {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface IPhoneBookProps {}

export interface IPhoneBookState {
  records: Array<IPhoneBookRecord>;
  searchValue: string;
  addFormOpened: boolean;
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
  searchString: string;
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

export interface IInputProps {
  onChangeHandler: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  placeholder: string;
  type: string;
  classNames: Array<string>;
}
