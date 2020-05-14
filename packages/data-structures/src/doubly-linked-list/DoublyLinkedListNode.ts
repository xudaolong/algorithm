export default class DoublyLinkedListNode {
  value: any
  next?: DoublyLinkedListNode
  previous?: DoublyLinkedListNode

  constructor(
    value: any,
    next?: DoublyLinkedListNode,
    previous?: DoublyLinkedListNode
  ) {
    this.value = value
    this.next = next
    this.previous = previous
  }

  toString(callback?: any) {
    return callback ? callback(this.value) : `${this.value}`
  }
}
