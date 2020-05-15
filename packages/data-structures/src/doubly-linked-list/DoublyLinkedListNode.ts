/**
 * 每个节点包含上一个节点（head） 和下一个节点（tail）
 */
export default class DoublyLinkedListNode<T> {
  value: T
  next: DoublyLinkedListNode<T> | null
  previous: DoublyLinkedListNode<T> | null

  constructor(
    value: T,
    next?: DoublyLinkedListNode<T> | null,
    previous?: DoublyLinkedListNode<T> | null
  ) {
    this.value = value
    this.next = next || null
    this.previous = previous || null
  }

  toString(callback?: any) {
    return callback ? callback(this.value) : `${this.value}`
  }
}
