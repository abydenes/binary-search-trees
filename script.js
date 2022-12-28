class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }
}

class Tree {
  constructor(root, array) {
    this.root = root;
  }
}

let arr2 = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];
let tree1 = createBST(arr2);
prettyPrint(tree1);

function createBST(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;
  let mid = Math.ceil((start + end) / 2);
  let root = new Node(arr[mid]);

  root.setLeft(createBST(arr, start, mid - 1));
  root.setRight(createBST(arr, mid + 1, end));

  return root;
}

function insertNode(tree, value) {
  if (tree === null) {
    tree = new Node(value);
    return tree;
  }

  if (value < tree.value) {
    tree.left = insertNode(tree.left, value);
  }

  if (value > tree.value) {
    tree.right = insertNode(tree.right, value);
  }
  return tree;
}

function deleteNode(tree, value) {
  if (tree.value === value) {
    if (tree.left === null && tree.right === null) {
      tree = null;
    } else if (tree.left === null || tree.right === null) {
      tree.left === null ? (tree = tree.right) : (tree = tree.left);
    } else {
      tree.value = findMin(tree.right).value;
      deleteNode(tree.right, findMin(tree.right).value);
    }
    return tree;
  }

  if (value < tree.value) {
    tree.left = deleteNode(tree.left, value);
  }

  if (value > tree.value) {
    tree.right = deleteNode(tree.right, value);
  }
  return tree;
}

function find(tree, value) {
  if (tree == null) {
    return null;
  }

  if (tree.value == value) {
    return tree;
  }

  if (value < tree.value) {
    return find(tree.left, value);
  }

  if (value > tree.value) {
    return find(tree.right, value);
  }
}

function findMin(tree) {
  if (tree.left === null) {
    return tree;
  } else return findMin(tree.left);
}

function levelOrder(tree, cb) {
  let queue = [];
  queue.push(tree);
  while (queue.length) {
    let current = queue.shift();
    cb(current);
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
}

function inorder(tree, cb) {
  if (tree === null) {
    return;
  } else {
    inorder(tree.left, cb);
    cb(tree);
    inorder(tree.right, cb);
  }
}

function preorder(tree, cb) {
  if (tree === null) {
    return;
  } else {
    cb(tree);
    preorder(tree.left, cb);
    preorder(tree.right, cb);
  }
}

function postorder(tree, cb) {
  if (tree === null) {
    return;
  } else {
    postorder(tree.left, cb);
    postorder(tree.right, cb);
    cb(tree);
  }
}

function height(tree) {
  if (tree === null) {
    return 0;
  }

  let leftHeight = height(tree.left);
  let rightHeight = height(tree.right);
  return Math.max(leftHeight, rightHeight) + 1;
}

// I don't really understand the function below :(
function depth(tree, value) {
  if (tree == null) {
    return -1;
  }

  if (tree.value == value) {
    return 0;
  }

  let leftDepth = depth(tree.left, value);
  let rightDepth = depth(tree.right, value);

  if (leftDepth == -1 && rightDepth == -1) {
    return -1;
  } else if (leftDepth != -1) {
    return 1 + leftDepth;
  } else {
    return 1 + rightDepth;
  }
}

function isBalanced(tree) {
  return height(tree.left) === height(tree.right);
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function tieItAllTogether(length, min, max) {
  let array = createRandomNumAr(length, min, max);
  let tree = createBST(array);
  printSequence(tree);
  insertNode(tree, 113);
  insertNode(tree, 266);
  insertNode(tree, 335);
  insertNode(tree, 590);
  insertNode(tree, 591);
  insertNode(tree, 592);
  insertNode(tree, 593);
  insertNode(tree, 594);
  insertNode(tree, 595);
  tree = rebalance(tree);
  printSequence(tree);
}

function printSequence(tree) {
  console.log("Printing tree in level order...");
  levelOrder(tree, console.log);
  console.log("Printing tree in preorder...");
  preorder(tree, console.log);
  console.log("Printing tree in postorder...");
  postorder(tree, console.log);
  console.log("Printing tree in inorder...");
  inorder(tree, console.log);
  prettyPrint(tree);
  console.log(`Is tree balanced? = ${isBalanced(tree)}`);
}

function createRandomNumAr(length, min, max) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (max - min) + min));
  }
  return removeDuplicatesAndSort(arr);
}

function removeDuplicatesAndSort(array) {
  return [...new Set(array)].sort();
}

function rebalance(tree) {
  let arr3 = [];
  const push = (item) => arr3.push(item.value);
  inorder(tree, push);
  return createBST(arr3);
}
