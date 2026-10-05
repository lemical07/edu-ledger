export default class Topic {
  #id;
  #course_id;
  #code;
  #title;
  #description;
  #active;

  constructor(id = null, course_id = null, code = '', title = '', description = null, active = 1) {
    this.#id = id;
    this.#course_id = course_id;
    this.#code = code;
    this.#title = title;
    this.#description = description;
    this.#active = active;
  }

  set id(id) { this.#id = id; }
  set course_id(course_id) { this.#course_id = course_id; }
  set code(code) { this.#code = code; }
  set title(title) { this.#title = title; }
  set description(description) { this.#description = description; }
  set active(active) { this.#active = active; }

  get id() { return this.#id; }
  get course_id() { return this.#course_id; }
  get code() { return this.#code; }
  get title() { return this.#title; }
  get description() { return this.#description; }
  get active() { return this.#active; }
}
