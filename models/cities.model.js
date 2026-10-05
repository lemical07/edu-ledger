export default class City {
  #id;
  #code;
  #name;

  constructor(id = null, code = '', name = '') {
    this.#id = id;
    this.#code = code;
    this.#name = name;
  }

  set id(id) { this.#id = id; }
  set code(code) { this.#code = code; }
  set name(name) { this.#name = name; }

  get id() { return this.#id; }
  get code() { return this.#code; }
  get name() { return this.#name; }
}
