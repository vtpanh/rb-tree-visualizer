import { LEFT, RIGHT } from './constants';

// Create a new deep copy
// Create a copy of the orginal object to prevent errors while editing
const cloneTree = (tree) => {
  const newTree = {};
  Object.keys(tree).forEach((key) => {
    if (tree[key] && typeof tree[key] === 'object') {
      if (tree === tree[key].parent) {
        newTree[key] = tree[key];
        newTree[key].parent = newTree;
      } else newTree[key] = cloneTree(tree[key]);
    } else {
      newTree[key] = tree[key];
    }
  });
  return newTree;
};

const getGrandFather = (node) => {
  const { parent } = node;
  const { parent: grandFather } = parent;
  return grandFather;
};

const getUncle = (node) => {
  const grandFather = getGrandFather(node);
  const { parent } = node;
  if (!grandFather) return null;
  if (parent === grandFather.left) {
    return grandFather.right;
  } else {
    return grandFather.left;
  }
};

const getSibling = (node) => {
  const { parent } = node;
  if (parent.left) {
    return parent.left;
  } else {
    return parent.right;
  }
};

const rotate = (node, direction) => {
  let anotherDir;
  if (direction === LEFT) {
    anotherDir = RIGHT;
  } else {
    anotherDir = LEFT;
  }
  const { parent } = node;
  const grandFather = getGrandFather(node);
  const temp = node[direction];

  node.parent = grandFather;

  if (grandFather) {
    let sideGrandfather;
    if (grandFather.left === parent) {
      sideGrandfather = LEFT;
    } else {
      sideGrandfather = RIGHT;
    }
    grandFather[sideGrandfather] = node;
  }
  node[direction] = parent;
  parent.parent = node;
  parent[anotherDir] = temp;
  if (temp) temp.parent = parent;
};

const buildTree = (node) => {
  while (node.parent) {
    node = node.parent;
  }
  return node;
};

export { cloneTree, getUncle, getGrandFather, getSibling, rotate, buildTree };
