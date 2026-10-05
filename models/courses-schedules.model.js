export default class CourseSchedule {
  #id;
  #course_id;
  #teacher_id;
  #classroom_id;
  #start_date;
  #end_date;
  #active;

  constructor(id = null, course_id = null, teacher_id = null, classroom_id = null, start_date = null, end_date = null, active = 1) {
    this.#id = id;
    this.#course_id = course_id;
    this.#teacher_id = teacher_id;
    this.#classroom_id = classroom_id;
    this.#start_date = start_date;
    this.#end_date = end_date;
    this.#active = active;
  }

  set id(id) { this.#id = id; }
  set course_id(course_id) { this.#course_id = course_id; }
  set teacher_id(teacher_id) { this.#teacher_id = teacher_id; }
  set classroom_id(classroom_id) { this.#classroom_id = classroom_id; }
  set start_date(start_date) { this.#start_date = start_date; }
  set end_date(end_date) { this.#end_date = end_date; }
  set active(active) { this.#active = active; }

  get id() { return this.#id; }
  get course_id() { return this.#course_id; }
  get teacher_id() { return this.#teacher_id; }
  get classroom_id() { return this.#classroom_id; }
  get start_date() { return this.#start_date; }
  get end_date() { return this.#end_date; }
  get active() { return this.#active; }
}
