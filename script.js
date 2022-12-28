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

let arr = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];

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

function levelOrder(tree1, cb) {
  let queue = [];
  queue.push(tree1);
  while (queue.length) {
    let current = queue.shift();
    cb(current);
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
}

function inorder() {}

function preorder() {}

function postorder() {}

function height() {}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree1 = createBST(arr);
prettyPrint(tree1);
