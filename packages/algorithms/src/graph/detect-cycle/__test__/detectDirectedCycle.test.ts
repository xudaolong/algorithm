import GraphVertex from '@algorithm/data-structures/src/graph/GraphVertex'
import GraphEdge from '@algorithm/data-structures/src/graph/GraphEdge'
import Graph from '@algorithm/data-structures/src/graph/Graph'
import detectDirectedCycle from '../detectDirectedCycle'

describe('detectDirectedCycle', () => {
  it('should detect directed cycle', () => {
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const vertexE = new GraphVertex('E')
    const vertexF = new GraphVertex('F')

    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeBC = new GraphEdge(vertexB, vertexC)
    const edgeAC = new GraphEdge(vertexA, vertexC)
    const edgeDA = new GraphEdge(vertexD, vertexA)
    const edgeDE = new GraphEdge(vertexD, vertexE)
    const edgeEF = new GraphEdge(vertexE, vertexF)
    const edgeFD = new GraphEdge(vertexF, vertexD)

    const graph = new Graph(true)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC)
      .addEdge(edgeDA)
      .addEdge(edgeDE)
      .addEdge(edgeEF)

    expect(detectDirectedCycle(graph)).toBeNull()

    graph.addEdge(edgeFD)

    expect(detectDirectedCycle(graph)).toEqual({
      D: vertexF,
      F: vertexE,
      E: vertexD
    })
  })
})
