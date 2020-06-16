import BinarySearchTreeNode from './BinarySearchTreeNode'
import Comparator from '@algorithm/utils/src/comparator/Comparator'

export default class BinarySearchTree<T> {
  root: BinarySearchTreeNode<T>
  nodeComparator: Comparator

  constructor(nodeValueCompareFunction?: Function) {
    this.root = new BinarySearchTreeNode<T>(null, nodeValueCompareFunction)

    // Steal node comparator from the root.
    this.nodeComparator = this.root.nodeComparator
  }

  insert(value: T): BinarySearchTreeNode<T> {
    return this.root.insert(value)
  }

  contains(value: T): boolean {
    return this.root.contains(value)
  }

  remove(value: T): boolean | void {
    return this.root.remove(value)
  }

  toString(): string {
    return this.root.toString()
  }
}
