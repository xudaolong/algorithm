import GraphVertex from '@algorithm/data-structures/src/graph/GraphVertex'
import GraphEdge from '@algorithm/data-structures/src/graph/GraphEdge'
import Graph from '@algorithm/data-structures/src/graph/Graph'
import detectUndirectedCycleUsingDisjointSet from '../detectUndirectedCycleUsingDisjointSet'

describe('detectUndirectedCycleUsingDisjointSet', () => {
  it('should detect undirected cycle', () => {
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const vertexE = new GraphVertex('E')
    const vertexF = new GraphVertex('F')

    const edgeAF = new GraphEdge(vertexA, vertexF)
    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeBE = new GraphEdge(vertexB, vertexE)
    const edgeBC = new GraphEdge(vertexB, vertexC)
    const edgeCD = new GraphEdge(vertexC, vertexD)
    const edgeDE = new GraphEdge(vertexD, vertexE)

    const graph = new Graph()
    graph
      .addEdge(edgeAF)
      .addEdge(edgeAB)
      .addEdge(edgeBE)
      .addEdge(edgeBC)
      .addEdge(edgeCD)

    expect(detectUndirectedCycleUsingDisjointSet(graph)).toBe(false)

    graph.addEdge(edgeDE)

    expect(detectUndirectedCycleUsingDisjointSet(graph)).toBe(true)
  })
})
