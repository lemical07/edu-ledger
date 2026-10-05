export default class Teacher {
  #id;
  #firstName;
  #lastName;
  #identification_type_id;
  #identificationNumber;
  #email;

  constructor(id = null, firstName = '', lastName = '', identification_type_id = null, identificationNumber = '', email = '') {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#identification_type_id = identification_type_id;
    this.#identificationNumber = identificationNumber;
    this.#email = email;
  }

  set id(id) { this.#id = id; }
  set firstName(firstName) { this.#firstName = firstName; }
  set lastName(lastName) { this.#lastName = lastName; }
  set identification_type_id(identification_type_id) { this.#identification_type_id = identification_type_id; }
  set identificationNumber(identificationNumber) { this.#identificationNumber = identificationNumber; }
  set email(email) { this.#email = email; }

  get id() { return this.#id; }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get identification_type_id() { return this.#identification_type_id; }
  get identificationNumber() { return this.#identificationNumber; }
  get email() { return this.#email; }
}
