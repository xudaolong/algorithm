import MinHeap from '../heap/MinHeap'
import Comparator from '@algorithm/utils/src/comparator/Comparator'

// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
export default class PriorityQueue<T> extends MinHeap<T> {
  priorities: Map<any, any>
  compare: Comparator

  constructor() {
    // Call MinHip constructor first.
    super()

    // Setup priorities map.
    // eslint-disable-next-line no-undef
    this.priorities = new Map()

    // Use custom comparator for heap elements that will take element priority
    // instead of element value into account.
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * Add item to the priority queue.
   */
  add(item: T, priority = 0): PriorityQueue<T> {
    this.priorities.set(item, priority)
    super.add(item)
    return this
  }

  /**
   * Remove item from priority queue.
   * @param {*} item - item we're going to remove.
   * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
   * @return {PriorityQueue}
   */
  remove(item: any, customFindingComparator: Comparator): PriorityQueue<T> {
    super.remove(item, customFindingComparator)
    this.priorities.delete(item)
    return this
  }

  /**
   * Change priority of the item in a queue.
   */
  changePriority(item: any, priority: number): PriorityQueue<T> {
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)
    return this
  }

  /**
   * Find item by ite value.
   */
  findByValue(item: any): number[] {
    return this.find(item, new Comparator(this.compareValue))
  }

  /**
   * Check if item already exists in a queue.
   */
  hasValue(item: any): boolean {
    return this.findByValue(item).length > 0
  }

  /**
   * Compares priorities of two items.
   */
  comparePriority(a: any, b: any): number {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
  }

  /**
   * Compares values of two items.
   */
  compareValue(a: any, b: any): number {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}
