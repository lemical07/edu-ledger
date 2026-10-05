export default class Course {
  #id;
  #code;
  #description;
  #intensity;
  #weight;
  #active;

  constructor(id = null, code = '', description = null, intensity = 0, weight = 0, active = 1) {
    this.#id = id;
    this.#code = code;
    this.#description = description;
    this.#intensity = intensity;
    this.#weight = weight;
    this.#active = active;
  }

  set id(id) { this.#id = id; }
  set code(code) { this.#code = code; }
  set description(description) { this.#description = description; }
  set intensity(intensity) { this.#intensity = intensity; }
  set weight(weight) { this.#weight = weight; }
  set active(active) { this.#active = active; }

  get id() { return this.#id; }
  get code() { return this.#code; }
  get description() { return this.#description; }
  get intensity() { return this.#intensity; }
  get weight() { return this.#weight; }
  get active() { return this.#active; }
}
