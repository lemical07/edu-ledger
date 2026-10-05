export default class Classroom {
  #id;
  #code;
  #description;
  #capacity;
  #active;

  constructor(id = null, code = '', description = null, capacity = 0, active = 1) {
    this.#id = id;
    this.#code = code;
    this.#description = description;
    this.#capacity = capacity;
    this.#active = active;
  }

  set id(id) { this.#id = id; }
  set code(code) { this.#code = code; }
  set description(description) { this.#description = description; }
  set capacity(capacity) { this.#capacity = capacity; }
  set active(active) { this.#active = active; }

  get id() { return this.#id; }
  get code() { return this.#code; }
  get description() { return this.#description; }
  get capacity() { return this.#capacity; }
  get active() { return this.#active; }
}
