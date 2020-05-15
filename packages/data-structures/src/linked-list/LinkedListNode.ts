class LinkedListNode {
  value: any
  next?: LinkedListNode

  constructor(value: any, next?: LinkedListNode) {
    this.value = value
    this.next = next
  }

  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

export default LinkedListNode
