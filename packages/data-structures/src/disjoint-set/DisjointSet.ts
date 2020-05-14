import DisjointSetItem from './DisjointSetItem'

export type IKeyCallback<T> = ((item: T) => string) | undefined

interface IItems<T> {
  [key: string]: DisjointSetItem<T>
}

export default class DisjointSet<T> {
  keyCallback: IKeyCallback<T>
  items: IItems<T>

  constructor(keyCallback?: IKeyCallback<T>) {
    this.keyCallback = keyCallback
    this.items = {}
  }

  /**
   * 初始化
   * - 并查集是多个树组成的森林(img/makeSet.webp)
   *
   */
  makeSet(value: T): DisjointSet<T> {
    const item = new DisjointSetItem(value, this.keyCallback)

    if (!this.items[item.key]) {
      this.items[item.key] = item
    }

    return this
  }

  /**
   * 合并
   */
  union(valueA: T, valueB: T): DisjointSet<T> {
    const itemA = this.find(valueA)
    const itemB = this.find(valueB)

    // 检测是否存在
    if (itemA === null || itemB === null) {
      throw new Error('One or two values are not in sets')
    }

    // 判断是否已属于同一个集合
    if (itemA.root.key === itemB.root.key) {
      return this
    }

    // 如果rootB的树更大，则使rootB成为新的根。
    if (itemA.root.getRank() < itemB.root.getRank()) {
      itemB.root.addChild(itemA.root)

      return this
    }

    // 否则同理
    itemA.root.addChild(itemB.root)

    return this
  }

  // 查询
  find(value: T): DisjointSetItem<T> | null {
    const item = new DisjointSetItem(value, this.keyCallback)
    const existItem = this.items[item.key]

    if (!existItem) {
      return null
    }

    return existItem
  }

  // 是否同一森林
  inSameSet(valueA: T, valueB: T): boolean {
    const itemA = this.find(valueA)
    const itemB = this.find(valueB)

    if (itemA === null || itemB === null) {
      throw new Error('One or two values are not in sets')
    }

    return itemA.root.key === itemB.root.key
  }
}
