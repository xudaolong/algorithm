class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value
    this.next = next || null
  }

  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

export default LinkedListNode
