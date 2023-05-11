import { Person } from "./person.model";

export class PersonResponse {
  constructor (public count: number, public people: Person[]) {}
}
