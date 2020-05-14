interface IStorage {
  get(index: any): boolean
  set(index: any): void
}

export default class BloomFilter {
  size: number
  storage: IStorage

  constructor(size = 100) {
    // Bloom filter size directly affects the likelihood of false positives.
    // The bigger the size the lower the likelihood of false positives.
    this.size = size
    this.storage = this.createStore(size)
  }

  /**
   * Creates the data store for our filter.
   * We use this method to generate the store in order to
   * encapsulate the data itself and only provide access
   * to the necessary methods.
   */
  createStore(size: number): IStorage {
    const storage = new Array(size).fill(false)

    return {
      get(index) {
        return storage[index]
      },
      set(index) {
        storage[index] = true
      }
    }
  }

  insert(item: string) {
    this.hashValues(item).forEach(hash => this.storage.set(hash))
  }

  mayExist(item: string): boolean {
    return !this.hashValues(item).some(hash => !this.storage.get(hash)) // or this.getHashValues(item).every(hash => this.storage.getValue(hash))
  }

  hash1(item: string): number {
    const hash = item.split('').reduce((prev, o, idx) => {
      const char = item.charCodeAt(idx)
      prev = (prev << 5) + prev + char
      prev &= prev // Convert to 32bit integer
      prev = Math.abs(prev)
      return prev
    }, 0)

    return hash % this.size
  }

  hash2(item: string): number {
    const hash = item.split('').reduce((prev, o, idx) => {
      const char = item.charCodeAt(idx)
      prev = (prev << 5) + prev + char /* hash * 33 + c */
      return prev
    }, 5381)

    return Math.abs(hash % this.size)
  }

  hash3(item: string): number {
    const hash = item.split('').reduce((prev, o, idx) => {
      const char = item.charCodeAt(idx)
      prev = (prev << 5) - prev
      prev += char
      prev &= prev // Convert to 32bit integer
      return prev
    }, 0)

    return Math.abs(hash % this.size)
  }

  /**
   * Runs all 3 hash functions on the input and returns an array of results.
   */
  hashValues(item: string): number[] {
    return [this.hash1(item), this.hash2(item), this.hash3(item)]
  }
}
