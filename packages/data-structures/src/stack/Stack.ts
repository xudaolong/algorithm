import LinkedList from '../linked-list/LinkedList'

export default class Stack<T> {
  linkedList: LinkedList<T>

  constructor() {
    // We're going to implement Stack based on LinkedList since these
    // structures are quite similar. Compare push/pop operations of the Stack
    // with prepend/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList()
  }

  isEmpty(): boolean {
    return !this.linkedList.head
  }

  peek(): T | null | undefined {
    if (this.isEmpty()) {
      return null
    }

    // Just read the value from the start of linked list without deleting it.
    return this.linkedList.head?.value
  }

  push(value: T) {
    // Pushing means to lay the value on top of the stack. Therefore let's just add
    // the new value at the start of the linked list.
    this.linkedList.prepend(value)
  }

  pop(): T | null {
    // Let's try to delete the first node (the head) from the linked list.
    // If there is no head (the linked list is empty) just return null.
    const removedHead = this.linkedList.deleteHead()
    return removedHead ? removedHead.value : null
  }

  toArray(): T[] {
    return this.linkedList.toArray().map(linkedListNode => linkedListNode.value)
  }

  toString(callback?: Function): string {
    return this.linkedList.toString(callback)
  }
}
