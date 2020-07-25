/**
 * Простая имитации чего-то делания с api
 * Для хоть какой-то правдоподобности возвращает промисы (почему бы и нет)
 */

import {IPhoneBookRecord} from './types';

const defaultRecordsList = [
  {
    id: 0,
    name: 'Robo Bobo',
    phoneNumber: '+72322323232'
  },
  {
    id: 1,
    name: 'Bobo Robo',
    phoneNumber: '+72322321112'
  },
  {
    id: 2,
    name: 'Оби-Ван Кеноби',
    phoneNumber: '+78002223535'
  },
  {
    id: 3,
    name: 'Генерал Гривус',
    phoneNumber: '2666666'
  },
]

export default class PhoneBookApiWorker {
  records: IPhoneBookRecord[];

  constructor (records: IPhoneBookRecord[] = defaultRecordsList) {
    this.records = records;
  }

  private getRecords() {
    return this.records.sort((firstRecord, secondRecord) => {
      return firstRecord.name.localeCompare(secondRecord.name);
    });
  }

  fetchGetRecordsRequest() {
    return Promise.resolve(this.getRecords());
  }

  fetchDeleteRequest(id: number) {
    const index = this.records.findIndex(record => record.id === id);

    if (index !== -1) {
      this.records.splice(index, 1);
    }

    return Promise.resolve(this.getRecords());
  }

  fetchAddRecordRequest(name: string, phoneNumber: string) {
    const id = this.records.length ? Math.max(...this.records.map(record => record.id)) + 1 : 0;

    this.records.push({
      id,
      name,
      phoneNumber
    });

    return Promise.resolve(this.getRecords());
  }
}