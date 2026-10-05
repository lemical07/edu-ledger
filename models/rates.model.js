export default class Rate {
  #id;
  #inscription_id;
  #rate;
  #comments;

  constructor(id = null, inscription_id = null, rate = 0, comments = null) {
    this.#id = id;
    this.#inscription_id = inscription_id;
    this.#rate = rate;
    this.#comments = comments;
  }

  set id(id) { this.#id = id; }
  set inscription_id(inscription_id) { this.#inscription_id = inscription_id; }
  set rate(rate) { this.#rate = rate; }
  set comments(comments) { this.#comments = comments; }

  get id() { return this.#id; }
  get inscription_id() { return this.#inscription_id; }
  get rate() { return this.#rate; }
  get comments() { return this.#comments; }
}
