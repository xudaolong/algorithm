export default class FenwickTree<T> {
  arraySize: number
  treeArray: number[]

  /**
   * Constructor creates empty fenwick tree of size 'arraySize',
   * however, array size is size+1, because index is 1-based.
   */
  constructor(arraySize: number) {
    this.arraySize = arraySize

    // Fill tree array with zeros.
    this.treeArray = Array(this.arraySize + 1).fill(0)
  }

  /**
   * Adds value to existing value at position.
   */
  increase(position: number, value: number): FenwickTree<T> {
    if (position < 1 || position > this.arraySize) {
      throw new Error('Position is out of allowed range')
    }

    for (let i = position; i <= this.arraySize; i += i & -i) {
      this.treeArray[i] += value
    }

    return this
  }

  /**
   * Query sum from index 1 to position.
   */
  query(position: number): number {
    if (position < 1 || position > this.arraySize) {
      throw new Error('Position is out of allowed range')
    }

    let sum = 0

    for (let i = position; i > 0; i -= i & -i) {
      sum += this.treeArray[i]
    }

    return sum
  }

  /**
   * Query sum from index leftIndex to rightIndex.
   */
  queryRange(leftIndex: number, rightIndex: number): number {
    if (leftIndex > rightIndex) {
      throw new Error('Left index can not be greater than right one')
    }

    if (leftIndex === 1) {
      return this.query(rightIndex)
    }

    return this.query(rightIndex) - this.query(leftIndex - 1)
  }
}
