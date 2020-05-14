import LinkedList from '../linked-list/LinkedList'
import GraphEdge from './GraphEdge'
import LinkedListNode from '../linked-list/LinkedListNode'

export default class GraphVertex {
  value: any
  edges: LinkedList
  /**
   * @param {*} value
   */
  constructor(value: any) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }

    /**
     * @param {GraphEdge} edgeA
     * @param {GraphEdge} edgeB
     */
    const edgeComparator = (edgeA: GraphEdge, edgeB: GraphEdge) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1
    }

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value
    this.edges = new LinkedList(edgeComparator)
  }

  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */
  addEdge(edge: GraphEdge): GraphVertex {
    this.edges.append(edge)

    return this
  }

  /**
   * @param {GraphEdge} edge
   */
  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge)
  }

  /**
   * @returns {GraphVertex[]}
   */
  getNeighbors(): GraphVertex[] {
    const edges = this.edges.toArray()

    /** @param {LinkedListNode} node */
    const neighborsConverter = (node: LinkedListNode) => {
      return node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex
    }

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter)
  }

  /**
   * @return {GraphEdge[]}
   */
  getEdges(): GraphEdge[] {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value)
  }

  /**
   * @return {number}
   */
  getDegree(): number {
    return this.edges.toArray().length
  }

  /**
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge: GraphEdge): boolean {
    const edgeNode = this.edges.find({
      callback: (edge: GraphEdge) => edge === requiredEdge
    })

    return !!edgeNode
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex: GraphVertex): boolean {
    const vertexNode = this.edges.find({
      callback: (edge: { startVertex: GraphVertex; endVertex: GraphVertex }) =>
        edge.startVertex === vertex || edge.endVertex === vertex
    })

    return !!vertexNode
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {(GraphEdge|null)}
   */
  findEdge(vertex: GraphVertex): GraphEdge | null {
    const edgeFinder = (edge: {
      startVertex: GraphVertex
      endVertex: GraphVertex
    }) => {
      return edge.startVertex === vertex || edge.endVertex === vertex
    }

    const edge = this.edges.find({ callback: edgeFinder })

    return edge ? edge.value : null
  }

  /**
   * @returns {string}
   */
  getKey(): string {
    return this.value
  }

  /**
   * @return {GraphVertex}
   */
  deleteAllEdges(): GraphVertex {
    this.getEdges().forEach(edge => this.deleteEdge(edge))

    return this
  }

  toString(callback: Function): string {
    return callback ? callback(this.value) : `${this.value}`
  }
}
