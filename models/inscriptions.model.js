export default class Inscription {
  #id;
  #course_schedule;
  #student_id;
  #register_date;
  #active;

  constructor(id = null, course_schedule = null, student_id = null, register_date = null, active = 1) {
    this.#id = id;
    this.#course_schedule = course_schedule;
    this.#student_id = student_id;
    this.#register_date = register_date;
    this.#active = active;
  }

  set id(id) { this.#id = id; }
  set course_schedule(course_schedule) { this.#course_schedule = course_schedule; }
  set student_id(student_id) { this.#student_id = student_id; }
  set register_date(register_date) { this.#register_date = register_date; }
  set active(active) { this.#active = active; }

  get id() { return this.#id; }
  get course_schedule() { return this.#course_schedule; }
  get student_id() { return this.#student_id; }
  get register_date() { return this.#register_date; }
  get active() { return this.#active; }
}
