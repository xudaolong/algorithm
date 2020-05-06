class Node<T> {
  #next: Node<T> | null
  #prev: Node<T> | null
  #value: T

  constructor(value: T) {
    this.#next = null
    this.#prev = null
    this.#value = value
  }

  get next() {
    return this.#next
  }

  set next(node) {
    this.#next = node
  }

  get prev() {
    return this.#prev
  }

  set prev(node) {
    this.#prev = node
  }

  get value() {
    return this.#value
  }

  set value(value) {
    this.#value = value
  }
}

export { Node }
