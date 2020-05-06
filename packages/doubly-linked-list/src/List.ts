import { Node } from './Node'

class List<T> {
  #head: Node<T> | null
  #last: Node<T> | null
  #length: number

  constructor() {
    this.#head = null
    this.#last = null
    this.#length = 0
  }

  isCircular() {
    return this.constructor.name === 'Circular'
  }

  isLinear() {
    return this.constructor.name === 'Linear'
  }

  isEmpty() {
    return this.length === 0 && !this.#head
  }

  get(index) {
    const node = this.node(index)
    return node?.value
  }

  node(index) {
    if (!this.isOutOfBounds(index)) {
      throw new RangeError('List index out of bounds')
    }

    if (index < this.length / 2) {
      return this.traverse(index)
    }

    return this.traverseRight(index)
  }

  set({ value, index }) {
    const node = this.node(index)
    if (node) {
      node.value = value
    }
    return this
  }

  get head() {
    return this.#head
  }

  get last() {
    return this.#last
  }

  get length() {
    return this.#length
  }

  private isOutOfBounds(index) {
    return index >= 0 && index < this.length
  }

  protected arrayify(x) {
    return Array.isArray(x) ? x : [x]
  }

  private traverse(index) {
    let count = 0
    let node = this.#head

    while (index !== count && node?.next) {
      node = node.next
      count++
    }

    return node
  }

  private traverseRight(index: number) {
    let count = this.length - (index + 1)
    let node = this.#last

    while (count !== 0 && node?.prev) {
      node = node.prev
      count--
    }

    return node
  }

  clear() {
    this.#head = null
    this.#last = null
    this.#length = 0
    return this
  }
}

export { List }
