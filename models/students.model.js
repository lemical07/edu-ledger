export default class Student {
  #id;
  #code;
  #firstName;
  #lastName;
  #identification_type_id;
  #identificationNumber;
  #gender;
  #birthdate;
  #email;
  #address;
  #city_id;

  constructor(id = null, code = '', firstName = '', lastName = '', identification_type_id = null, identificationNumber = '', gender = '', birthdate = null, email = null, address = null, city_id = null) {
    this.#id = id;
    this.#code = code;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#identification_type_id = identification_type_id;
    this.#identificationNumber = identificationNumber;
    this.#gender = gender;
    this.#birthdate = birthdate;
    this.#email = email;
    this.#address = address;
    this.#city_id = city_id;
  }

  set id(id) { this.#id = id; }
  set code(code) { this.#code = code; }
  set firstName(firstName) { this.#firstName = firstName; }
  set lastName(lastName) { this.#lastName = lastName; }
  set identification_type_id(identification_type_id) { this.#identification_type_id = identification_type_id; }
  set identificationNumber(identificationNumber) { this.#identificationNumber = identificationNumber; }
  set gender(gender) { this.#gender = gender; }
  set birthdate(birthdate) { this.#birthdate = birthdate; }
  set email(email) { this.#email = email; }
  set address(address) { this.#address = address; }
  set city_id(city_id) { this.#city_id = city_id; }

  get id() { return this.#id; }
  get code() { return this.#code; }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get identification_type_id() { return this.#identification_type_id; }
  get identificationNumber() { return this.#identificationNumber; }
  get gender() { return this.#gender; }
  get birthdate() { return this.#birthdate; }
  get email() { return this.#email; }
  get address() { return this.#address; }
  get city_id() { return this.#city_id; }
}
