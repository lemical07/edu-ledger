export default class IdentificationType {
  #id;
  #code;
  #name;
  #description;

  constructor(id = null, code = '', name = '', description = null) {
    this.#id = id;
    this.#code = code;
    this.#name = name;
    this.#description = description;
  }

  set id(id) { this.#id = id; }
  set code(code) { this.#code = code; }
  set name(name) { this.#name = name; }
  set description(description) { this.#description = description; }

  get id() { return this.#id; }
  get code() { return this.#code; }
  get name() { return this.#name; }
  get description() { return this.#description; }
}
