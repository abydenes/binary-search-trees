class Node {
  constructor(data, left, right) {
    this.data = data;
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

function insertNode() {}

function deleteNode() {}

function find() {}

function levelOrder() {}

function inorder() {}

function preorder() {}

function postorder() {}

function height() {}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree1 = createBST(arr);
prettyPrint(tree1);
