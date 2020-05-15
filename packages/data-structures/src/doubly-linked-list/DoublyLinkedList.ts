import DoublyLinkedListNode from './DoublyLinkedListNode'
import Comparator from '@algorithm/utils/src/comparator/Comparator'

/**
 * 双向链表
 * - 无长度
 * - 若干个节点组成，每个节点包含上一个节点（previous） 和下一个节点（next）
 * - 添加和删除时需要维护双指针
 */
export default class DoublyLinkedList<T> {
  // 双指针仅当维护增删改查用
  head: DoublyLinkedListNode<T> | null // 头指针
  tail: DoublyLinkedListNode<T> | null // 尾指针
  compare: Comparator

  /**
   * 无需指定链表的长度, 示意图: img/empty.drawio.svg
   */
  constructor(comparatorFunction?: Function) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   *  左添加（代替当前上一个节点）时需要同时维护 head 和 tail 指针
   *  - 处理新节点的next和当前节点的previous
   */
  prepend(value: T): DoublyLinkedList<T> {
    // 默认将当前头指针为改节点的next节点
    const node = new DoublyLinkedListNode(value, this.head, null)

    // 空指针时代表为新链表, 双指针指向新节点
    if (!this.head) {
      this.head = node
      this.tail = node
      return this
    }

    // 若非空链表时
    // 修改当前指针节点的上一个节点
    this.head.previous = node
    // 修改当前头指针
    this.head = node

    return this
  }

  /**
   *  右添加时需要同时维护 head 和 tail 分支
   *  - 处理新节点的previous和当前节点的next
   */
  append(value: T): DoublyLinkedList<T> {
    // 默认将当前尾指针为改节点的previous节点
    const node = new DoublyLinkedListNode(value, null, this.tail)

    // 空指针时代表为新链表, 双指针指向新节点
    if (!this.tail) {
      this.head = node
      this.tail = node
      return this
    }

    // 若非空链表时
    // 修改当前指针节点的下一个节点
    this.tail.next = node
    // 修改当前尾指针
    this.tail = node

    return this
  }

  /**
   * 删除时需要同时维护 head 和 tail 指针
   */
  delete(value: T): DoublyLinkedListNode<T> | null {
    // 空链表
    if (!this.head) {
      return null
    }

    let deletedNode: DoublyLinkedListNode<T> | null = null
    let currNode = this.head

    // 遍历找值相等的节点
    while (currNode) {
      // 当匹配相同节点值时
      if (this.compare.equal(currNode.value, value)) {
        deletedNode = currNode

        // 若为HEAD指针
        if (deletedNode === this.head) {
          // 返回
          this.head = deletedNode.next
          if (this.head) {
            this.head.previous = null
          }
          if (deletedNode === this.tail) {
            this.tail = null
          }
        }
        // 若为TAIL指针
        else if (deletedNode === this.tail) {
          this.tail = deletedNode.previous
          if (this.tail) {
            this.tail.next = null
          }
        }
        // 若为中间节点, 不需要修改双指针
        else {
          const previousNode = deletedNode.previous
          const nextNode = deletedNode.next

          if (previousNode) {
            previousNode.next = nextNode
          }
          if (nextNode) {
            nextNode.previous = previousNode
          }
        }
      }

      // 若没找到相关的节点则返回
      if (!currNode.next) {
        break
      }

      currNode = currNode.next
    }

    return deletedNode
  }

  find({
    value,
    callback
  }: {
    value?: any
    callback?: Function
  }): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null
    }

    let currNode = this.head

    while (currNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currNode.value)) {
        return currNode
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currNode.value, value)) {
        return currNode
      }

      // 若没找到相关的节点则返回
      if (!currNode.next) {
        break
      }

      currNode = currNode.next
    }

    return null
  }

  deleteTail(): DoublyLinkedListNode<T> | null {
    if (!this.tail) {
      // No tail to delete.
      return null
    }

    if (this.head === this.tail) {
      // There is only one node in linked list.
      const deletedTail = this.tail
      this.head = null
      this.tail = null

      return deletedTail
    }

    // If there are many nodes in linked list...
    const deletedTail = this.tail

    this.tail = this.tail.previous

    if (this.tail) {
      this.tail.next = null
    }

    return deletedTail
  }

  deleteHead(): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  toArray(): DoublyLinkedListNode<T>[] {
    const nodes: DoublyLinkedListNode<T>[] = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {DoublyLinkedList}
   */
  fromArray(values: T[]): DoublyLinkedList<T> {
    values.forEach(value => this.append(value))

    return this
  }

  toString(callback?: T): string {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString()
  }

  /**
   * 反转
   */
  reverse(): DoublyLinkedList<T> {
    let currNode = this.head
    let prevNode: DoublyLinkedListNode<T> | null = null
    let nextNode: DoublyLinkedListNode<T> | null = null

    while (currNode) {
      // Store next node.
      nextNode = currNode.next
      prevNode = currNode.previous

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode
      currNode.previous = nextNode

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
