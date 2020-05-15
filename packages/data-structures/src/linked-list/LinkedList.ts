import LinkedListNode from './LinkedListNode'
import Comparator from '@algorithm/utils/src/comparator/Comparator'

export default class LinkedList {
  head: LinkedListNode
  tail: LinkedListNode
  compare: Comparator

  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction?: Function) {
    this.head = null
    this.tail = null

    this.compare = new Comparator(comparatorFunction)
  }

  prepend(value: any): LinkedList {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  append(value: any): LinkedList {
    const newNode = new LinkedListNode(value)

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  delete(value: any): LinkedListNode {
    if (!this.head) {
      return null
    }

    let deletedNode = null

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deletedNode
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find({
    value,
    callback
  }: {
    value?: any
    callback?: Function
  }): LinkedListNode {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail(): LinkedListNode {
    const deletedTail = this.tail

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null
      this.tail = null

      return deletedTail
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deletedTail
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead(): LinkedListNode {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values: any[]): LinkedList {
    values.forEach(value => this.append(value))

    return this
  }

  toArray(): LinkedListNode[] {
    const nodes: LinkedListNode[] = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  toString(callback?: Function): string {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString()
  }

  reverse(): LinkedList {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Store next node.
      nextNode = currNode.next

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    return this
  }
}
