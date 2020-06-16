import Heap from './Heap'

export default class MinHeap<T> extends Heap<T> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   */
  pairIsInCorrectOrder(firstElement: any, secondElement: any): boolean {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}
