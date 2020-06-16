import BinarySearchTree from '../binary-search-tree/BinarySearchTree'
import BinarySearchTreeNode from '../binary-search-tree/BinarySearchTreeNode'
import BinaryTreeNode from '../BinaryTreeNode'

// Possible colors of red-black tree nodes.
const RED_BLACK_TREE_COLORS = {
  red: 'red',
  black: 'black'
}

// Color property name in meta information of the nodes.
const COLOR_PROP_NAME = 'color'

export default class RedBlackTree<T> extends BinarySearchTree<T> {
  insert(value: T): BinarySearchTreeNode<T> {
    const insertedNode = super.insert(value)

    // if (!this.root.left && !this.root.right) {
    if (this.nodeComparator.equal(insertedNode, this.root)) {
      // Make root to always be black.
      this.makeNodeBlack(insertedNode)
    } else {
      // Make all newly inserted nodes to be red.
      this.makeNodeRed(insertedNode)
    }

    // Check all conditions and balance the node.
    this.balance(insertedNode)

    return insertedNode
  }

  remove(value: T): boolean {
    throw new Error(
      `Can't remove ${value}. Remove method is not implemented yet`
    )
  }

  balance(node: BinarySearchTreeNode<T>) {
    // If it is a root node then nothing to balance here.
    if (this.nodeComparator.equal(node, this.root)) {
      return
    }

    // If the parent is black then done. Nothing to balance here.
    if (node.parent && this.isNodeBlack(node.parent)) {
      return
    }

    if (!node) {
      return
    }

    const grandParent = node.parent?.parent

    if (node.uncle && this.isNodeRed(node.uncle)) {
      // If node has red uncle then we need to do RECOLORING.

      // Recolor parent and uncle to black.
      this.makeNodeBlack(node.uncle)
      node.parent && this.makeNodeBlack(node.parent)

      if (!this.nodeComparator.equal(grandParent, this.root)) {
        // Recolor grand-parent to red if it is not root.
        grandParent && this.makeNodeRed(grandParent)
      } else {
        // If grand-parent is black root don't do anything.
        // Since root already has two black sibling that we've just recolored.
        return
      }

      // Now do further checking for recolored grand-parent.
      this.balance(grandParent as BinarySearchTreeNode<T>)
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      // If node uncle is black or absent then we need to do ROTATIONS.

      if (grandParent) {
        // Grand parent that we will receive after rotations.
        let newGrandParent

        if (this.nodeComparator.equal(grandParent.left, node.parent)) {
          // Left case.
          if (this.nodeComparator.equal(node.parent?.left, node)) {
            // Left-left case.
            newGrandParent = this.leftLeftRotation(grandParent)
          } else {
            // Left-right case.
            newGrandParent = this.leftRightRotation(grandParent)
          }
        } else {
          // Right case.
          if (this.nodeComparator.equal(node.parent?.right, node)) {
            // Right-right case.
            newGrandParent = this.rightRightRotation(grandParent)
          } else {
            // Right-left case.
            newGrandParent = this.rightLeftRotation(grandParent)
          }
        }

        // Set newGrandParent as a root if it doesn't have parent.
        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent

          // Recolor root into black.
          this.makeNodeBlack(this.root)
        }

        // Check if new grand parent don't violate red-black-tree rules.
        this.balance(newGrandParent)
      }
    }
  }

  /**
   * Left Left Case (p is left child of g and x is left child of p)
   */
  leftLeftRotation(
    grandParentNode: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ): BinarySearchTreeNode<T> | BinaryTreeNode<T> {
    // Memorize the parent of grand-parent node.
    const grandGrandParent = grandParentNode.parent

    // Check what type of sibling is our grandParentNode is (left or right).
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }

    // Memorize grandParentNode's left node.
    const parentNode = grandParentNode.left

    // Memorize parent's right node since we're going to transfer it to
    // grand parent's left subtree.
    const parentRightNode = parentNode?.right

    // Make grandParentNode to be right child of parentNode.
    parentNode?.setRight(grandParentNode)

    // Move child's right subtree to grandParentNode's left subtree.
    parentRightNode && grandParentNode.setLeft(parentRightNode)

    // Put parentNode node in place of grandParentNode.
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else if (parentNode) {
      // Make parent node a root
      parentNode.parent = null
    }

    // Swap colors of granParent and parent nodes.
    parentNode && this.swapNodeColors(parentNode, grandParentNode)

    // Return new root node.
    return parentNode as BinarySearchTreeNode<T> | BinaryTreeNode<T>
  }

  /**
   * Left Right Case (p is left child of g and x is right child of p)
   */
  leftRightRotation(
    grandParentNode: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // Memorize left and left-right nodes.
    const parentNode = grandParentNode.left
    const childNode = parentNode?.right

    // We need to memorize child left node to prevent losing
    // left child subtree. Later it will be re-assigned to
    // parent's right sub-tree.
    const childLeftNode = childNode?.left

    // Make parentNode to be a left child of childNode node.
    childNode?.setLeft(parentNode)

    // Move child's left subtree to parent's right subtree.
    childLeftNode && parentNode?.setRight(childLeftNode)

    // Put left-right node in place of left node.
    childNode && grandParentNode.setLeft(childNode)

    // Now we're ready to do left-left rotation.
    return this.leftLeftRotation(grandParentNode) as BinarySearchTreeNode<T>
  }

  /**
   * Right Right Case (p is right child of g and x is right child of p)
   */
  rightRightRotation(
    grandParentNode: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // Memorize the parent of grand-parent node.
    const grandGrandParent = grandParentNode.parent

    // Check what type of sibling is our grandParentNode is (left or right).
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }

    // Memorize grandParentNode's right node.
    const parentNode = grandParentNode.right

    // Memorize parent's left node since we're going to transfer it to
    // grand parent's right subtree.
    const parentLeftNode = parentNode?.left

    // Make grandParentNode to be left child of parentNode.
    parentNode?.setLeft(grandParentNode)

    // Transfer all left nodes from parent to right sub-tree of grandparent.
    parentLeftNode && grandParentNode.setRight(parentLeftNode)

    // Put parentNode node in place of grandParentNode.
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else if (parentNode) {
      // Make parent node a root.
      parentNode.parent = null
    }

    // Swap colors of granParent and parent nodes.
    parentNode && this.swapNodeColors(parentNode, grandParentNode)

    // Return new root node.
    return parentNode as BinarySearchTreeNode<T>
  }

  /**
   * Right Left Case (p is right child of g and x is left child of p)
   */
  rightLeftRotation(
    grandParentNode: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ): BinarySearchTreeNode<T> {
    // Memorize right and right-left nodes.
    const parentNode = grandParentNode.right
    const childNode = parentNode?.left

    // We need to memorize child right node to prevent losing
    // right child subtree. Later it will be re-assigned to
    // parent's left sub-tree.
    const childRightNode = childNode?.right

    // Make parentNode to be a right child of childNode.
    childNode?.setRight(parentNode)

    // Move child's right subtree to parent's left subtree.
    childRightNode && parentNode?.setLeft(childRightNode)

    // Put childNode node in place of parentNode.
    childNode && grandParentNode.setRight(childNode)

    // Now we're ready to do right-right rotation.
    return this.rightRightRotation(grandParentNode)
  }

  makeNodeRed(
    node: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ): BinarySearchTreeNode<T> | BinaryTreeNode<T> {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red)

    return node
  }

  makeNodeBlack(
    node: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ): BinarySearchTreeNode<T> | BinaryTreeNode<T> {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black)

    return node
  }

  isNodeRed(node: BinarySearchTreeNode<T> | BinaryTreeNode<T>): boolean {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red
  }

  isNodeBlack(node: BinarySearchTreeNode<T> | BinaryTreeNode<T>): boolean {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black
  }

  isNodeColored(node: BinarySearchTreeNode<T> | BinaryTreeNode<T>): boolean {
    return this.isNodeRed(node) || this.isNodeBlack(node)
  }

  swapNodeColors(
    firstNode: BinarySearchTreeNode<T> | BinaryTreeNode<T>,
    secondNode: BinarySearchTreeNode<T> | BinaryTreeNode<T>
  ) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME)
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME)

    firstNode.meta.set(COLOR_PROP_NAME, secondColor)
    secondNode.meta.set(COLOR_PROP_NAME, firstColor)
  }
}
