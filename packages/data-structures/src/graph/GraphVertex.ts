import LinkedList from '../linked-list/LinkedList'
import GraphEdge from './GraphEdge'
import LinkedListNode from '../linked-list/LinkedListNode'

export default class GraphVertex<T> {
  value: string
  edges: LinkedList<GraphEdge<T>>

  constructor(value: string) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }

    const edgeComparator = (edgeA: GraphEdge<T>, edgeB: GraphEdge<T>) => {
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

  addEdge(edge: GraphEdge<T>): GraphVertex<T> {
    this.edges.append(edge)

    return this
  }

  deleteEdge(edge: GraphEdge<T>) {
    this.edges.delete(edge)
  }

  getNeighbors(): GraphVertex<T>[] {
    const edges = this.edges.toArray()

    /** @param {LinkedListNode} node */
    const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) => {
      return node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex
    }

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter)
  }

  getEdges(): GraphEdge<T>[] {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value)
  }

  getDegree(): number {
    return this.edges.toArray().length
  }

  hasEdge(requiredEdge: GraphEdge<T>): boolean {
    const edgeNode = this.edges.find({
      callback: (edge: GraphEdge<T>) => edge === requiredEdge
    })

    return !!edgeNode
  }

  hasNeighbor(vertex: GraphVertex<T>): boolean {
    const vertexNode = this.edges.find({
      callback: (edge: {
        startVertex: GraphVertex<T>
        endVertex: GraphVertex<T>
      }) => edge.startVertex === vertex || edge.endVertex === vertex
    })

    return !!vertexNode
  }

  findEdge(vertex: GraphVertex<T>): GraphEdge<T> | null {
    const edgeFinder = (edge: {
      startVertex: GraphVertex<T>
      endVertex: GraphVertex<T>
    }) => {
      return edge.startVertex === vertex || edge.endVertex === vertex
    }

    const edge = this.edges.find({ callback: edgeFinder })

    return edge ? edge.value : null
  }

  getKey(): string {
    return this.value
  }

  deleteAllEdges(): GraphVertex<T> {
    this.getEdges().forEach(edge => this.deleteEdge(edge))

    return this
  }

  toString(callback?: Function): string {
    return callback ? callback(this.value) : `${this.value}`
  }
}
