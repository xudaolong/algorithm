import { IKeyCallback } from '@algorithm/data-structures/src/disjoint-set/DisjointSet'

export default class DisjointSetItem<T> {
  value: T
  keyCallback: IKeyCallback<T>
  parent: DisjointSetItem<T> | null
  children: {}

  constructor(value: T, keyCallback?: IKeyCallback<T>) {
    this.keyCallback = keyCallback
    this.value = value

    this.parent = null
    this.children = {}
  }

  // 获取根节点
  get root(): DisjointSetItem<T> {
    if (this.parent === null) {
      return this
    }
    return this.parent.root
  }

  get key(): string {
    // 允许用户定义自定义密钥生成器。
    if (this.keyCallback) {
      return this.keyCallback(this.value)
    }
    if (typeof this.value !== 'string') {
      throw new Error('Please support keyCallback function')
    }
    // 否则，默认情况下将value用作键。
    return this.value
  }

  // 判断根节点
  isRoot(): boolean {
    return this.parent === null
  }

  /**
   * Rank basically means the number of all ancestors.
   */
  getRank(): number {
    const children = this.getChildren()
    if (children.length === 0) {
      return 0
    }

    return children.reduce((acc, o) => {
      acc += 1
      acc += o.getRank()
      return acc
    }, 0)
  }

  getChildren(): DisjointSetItem<T>[] {
    return Object.values(this.children)
  }

  setParent(
    parentItem: DisjointSetItem<T>,
    forceSettingParentChild = true
  ): DisjointSetItem<T> {
    this.parent = parentItem
    if (forceSettingParentChild) {
      parentItem.addChild(this)
    }

    return this
  }

  addChild(childItem: DisjointSetItem<T>): DisjointSetItem<T> {
    this.children[childItem.key] = childItem
    childItem.setParent(this, false)

    return this
  }
}
