import {
  cloneTree,
  getUncle,
  getGrandFather,
  getSibling,
  rotate,
  buildTree,
} from './functions';
import { RED, BLACK, LEFT, RIGHT } from './constants';

function add(tree, value) {
  const newNode = {
    value,
    left: null,
    right: null,
    parent: null,
    color: RED,
  };

  if (!tree) {
    newNode.color = BLACK;
    return newNode;
  }

  const resultTree = cloneTree(tree);

  let parentNode;
  let currentNode = resultTree;

  // Insert node
  while (currentNode) {
    parentNode = currentNode;
    if (currentNode.value === newNode.value) return resultTree;
    if (newNode.value > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      currentNode = currentNode.left;
    }
  }

  currentNode = newNode;
  currentNode.parent = parentNode;
  if (currentNode.value > parentNode.value) {
    parentNode.right = currentNode;
  } else {
    parentNode.left = currentNode;
  }

  while (
    currentNode.color === RED &&
    currentNode.parent &&
    currentNode.parent.color === RED
  ) {
    const uncle = getUncle(currentNode);
    const grandFather = getGrandFather(currentNode);
    const { parent } = currentNode;

    if (uncle && uncle.color === RED) {
      parent.color = BLACK;
      uncle.color = BLACK;
      grandFather.color = RED;
      currentNode = grandFather;
      if (!currentNode.parent) currentNode.color = BLACK;
      continue;
    }

    if (!uncle || uncle.color === BLACK) {
      let sideOfTree, anotherDir;
      if (parent === grandFather.left) {
        sideOfTree = LEFT;
        anotherDir = RIGHT;
      } else {
        sideOfTree = RIGHT;
        anotherDir = LEFT;
      }

      if (parent[sideOfTree] === currentNode) {
        currentNode = parent;
        // console.log('before' + currentNode.value);
        rotate(currentNode, anotherDir);
        // console.log('after' + currentNode.value);
        currentNode.color = BLACK;
        currentNode[anotherDir].color = RED;
      } else {
        // console.log('before' + currentNode.value);
        rotate(currentNode, sideOfTree);
        rotate(currentNode, anotherDir);
        // console.log('after' + currentNode.value);
        currentNode.color = BLACK;
        currentNode[anotherDir].color = RED;
      }
    }
  }
  return buildTree(currentNode);
}

function remove(tree, value) {
  const resultTree = cloneTree(tree);
  let deletedNode = resultTree;

  while (value !== deletedNode.value) {
    if (value > deletedNode.value) {
      deletedNode = deletedNode.right;
    } else {
      deletedNode = deletedNode.left;
    }
    if (!deletedNode) return resultTree;
  }

  let maxInLeft = deletedNode;
  if (deletedNode.left) {
    maxInLeft = deletedNode.left;
    while (maxInLeft.right) {
      maxInLeft = maxInLeft.right;
    }
  }

  deletedNode.value = maxInLeft.value;

  const currentNode = maxInLeft;
  const { parent } = currentNode;

  let direction, anotherDir;

  if (parent.left === currentNode) {
    direction = LEFT;
    anotherDir = RIGHT;
  } else {
    direction = RIGHT;
    anotherDir = LEFT;
  }
  // const direction = parent.left === currentNode ? LEFT : RIGHT;
  // const anotherDir = parent.left === currentNode ? RIGHT : LEFT;

  parent[direction] = null;

  while (currentNode.color === 0 && currentNode.parent) {
    const { parent: currentParent } = currentNode;
    const sibling = getSibling(currentNode);
    const nephewDirection = sibling[direction];
    const nephewAnother = sibling[anotherDir];
    if (!sibling) break;

    if (sibling.color === RED) {
      sibling.color = BLACK;
      currentParent.color = RED;
      rotate(sibling, direction);
      continue;
    }

    if (
      (!nephewDirection || nephewDirection.color === BLACK) &&
      (!nephewAnother || nephewAnother.color === BLACK)
    ) {
      sibling.color = RED;
      currentParent.color = BLACK;
      break;
    }

    if (
      nephewDirection &&
      nephewDirection.color === RED &&
      (!nephewAnother || nephewAnother.color === BLACK)
    ) {
      sibling.color = RED;
      nephewDirection.color = BLACK;
      rotate(nephewDirection, anotherDir);
      continue;
    }

    if (nephewAnother && nephewAnother.color === RED) {
      sibling.color = currentParent.color;
      currentParent.color = BLACK;
      nephewAnother.color = BLACK;
      rotate(sibling, direction);
      break;
    }
  }
  return buildTree(currentNode);
}

function search(tree, value) {
  let searchNode = tree;
  // search deleted node
  while (value !== searchNode.value) {
    if (value > searchNode.value) {
      searchNode = searchNode.right;
    } else if (value < searchNode.value) {
      searchNode = searchNode.left;
    } else {
      return true;
    }
    if (!searchNode) return false;
  }
}

export { add, remove, search };
