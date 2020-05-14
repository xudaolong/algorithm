export default class GraphEdge {
  startVertex: any
  endVertex: any
  weight: number
  /**
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @param {number} [weight=1]
   */
  constructor(startVertex: any, endVertex: any, weight = 0) {
    this.startVertex = startVertex
    this.endVertex = endVertex
    this.weight = weight
  }

  /**
   * @return {string}
   */
  getKey(): string {
    const startVertexKey = this.startVertex.getKey()
    const endVertexKey = this.endVertex.getKey()

    return `${startVertexKey}_${endVertexKey}`
  }

  /**
   * @return {GraphEdge}
   */
  reverse(): GraphEdge {
    const tmp = this.startVertex
    this.startVertex = this.endVertex
    this.endVertex = tmp

    return this
  }

  /**
   * @return {string}
   */
  toString(): string {
    return this.getKey()
  }
}
