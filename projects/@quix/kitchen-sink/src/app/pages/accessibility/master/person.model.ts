export class Person {
  constructor(
    public name: string,
    public gender: string,
    public height: string,
    public mass: string,
    public id: string,
    public hair_color?: string,
    public skin_color?: string,
    public eye_color?: string,
    public birth_year?: string,
    public homeworld?: string,
    public films?: [],
    public species?: [],
    public vehicles?: [],
    public starships?: [],
    public created?: string,
    public edited?: string,
    public url?: string
  ) {}
}
