export interface IEmailModel {
  id: string;
  subject: string;
  sender: string;
  body: string;
  tags: string[];
  date: any;
}

export enum TagType {
  inbox = 1,
  travel = 2,
  work = 3,
}
