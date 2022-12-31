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
  constructor(array) {
    let arr = [...new Set(array)].sort();
    this.root = this.buildTree(arr);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    let mid = Math.ceil((start + end) / 2);
    let root = new Node(arr[mid]);

    root.setLeft(this.buildTree(arr, start, mid - 1));
    root.setRight(this.buildTree(arr, mid + 1, end));

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insertNode(value, tree = this.root) {
    if (tree === null) {
      tree = new Node(value);
      return tree;
    }

    if (value < tree.value) {
      tree.left = this.insertNode(value, tree.left);
    }

    if (value > tree.value) {
      tree.right = this.insertNode(value, tree.right);
    }
    return tree;
  }

  deleteNode(value, tree = this.root) {
    if (tree.value === value) {
      if (tree.left === null && tree.right === null) {
        tree = null;
      } else if (tree.left === null || tree.right === null) {
        tree.left === null ? (tree = tree.right) : (tree = tree.left);
      } else {
        tree.value = this.findMin(tree.right).value;
        this.deleteNode(tree.right, this.findMin(tree.right).value);
      }
      return tree;
    }

    if (value < tree.value) {
      tree.left = this.deleteNode(tree.left, value);
    }

    if (value > tree.value) {
      tree.right = this.deleteNode(tree.right, value);
    }
    return tree;
  }

  find(value, tree = this.root) {
    if (tree == null) {
      return null;
    }

    if (tree.value == value) {
      return tree;
    }

    if (value < tree.value) {
      return this.find(tree.left, value);
    }

    if (value > tree.value) {
      return this.find(tree.right, value);
    }
  }

  findMin(tree = this.root) {
    if (tree.left === null) {
      return tree;
    } else return this.findMin(tree.left);
  }

  levelOrder(cb, tree = this.root) {
    let queue = [];
    queue.push(tree);
    while (queue.length) {
      let current = queue.shift();
      cb(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inorder(cb, tree = this.root) {
    if (tree === null) {
      return;
    } else {
      this.inorder(cb, tree.left);
      cb(tree);
      this.inorder(cb, tree.right);
    }
  }

  preorder(cb, tree = this.root) {
    if (tree === null) {
      return;
    } else {
      cb(tree);
      this.preorder(cb, tree.left);
      this.preorder(cb, tree.right);
    }
  }

  postorder(cb, tree = this.root) {
    if (tree === null) {
      return;
    } else {
      this.postorder(cb, tree.left);
      this.postorder(cb, tree.right);
      cb(tree);
    }
  }

  height(tree = this.root) {
    if (tree === null) {
      return 0;
    }

    let leftHeight = this.height(tree.left);
    let rightHeight = this.height(tree.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, tree = this.tree) {
    if (tree == null) {
      return -1;
    }

    if (tree.value == value) {
      return 0;
    }

    let leftDepth = this.depth(tree.left, value);
    let rightDepth = this.depth(tree.right, value);

    if (leftDepth == -1 && rightDepth == -1) {
      return -1;
    } else if (leftDepth != -1) {
      return 1 + leftDepth;
    } else {
      return 1 + rightDepth;
    }
  }

  isBalanced(tree = this.root) {
    return this.height(tree.left) === this.height(tree.right);
  }

  printSequence() {
    console.log("Printing tree in level order...");
    this.levelOrder(console.log);
    console.log("Printing tree in preorder...");
    this.preorder(console.log);
    console.log("Printing tree in postorder...");
    this.postorder(console.log);
    console.log("Printing tree in inorder...");
    this.inorder(console.log);
    this.prettyPrint();
    console.log(`Is tree balanced? = ${this.isBalanced()}`);
  }

  rebalance(tree = this.root) {
    let arr3 = [];
    const push = (item) => arr3.push(item.value);
    this.inorder(push, tree);
    this.root = this.buildTree(arr3);
  }
}

let arr2 = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];
let tree1 = new Tree(arr2);
tree1.prettyPrint();

function tieItAllTogether(length, min, max) {
  const createRandomNumAr = (length, min, max) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * (max - min) + min));
    }
    return [...new Set(arr)].sort();
  };
  let array = createRandomNumAr(length, min, max);
  let tree = new Tree(array);
  tree.printSequence();
  tree.insertNode(113);
  tree.insertNode(266);
  tree.insertNode(335);
  tree.insertNode(590);
  tree.insertNode(591);
  tree.insertNode(592);
  tree.insertNode(593);
  tree.insertNode(594);
  tree.insertNode(595);
  tree.rebalance();
  tree.printSequence();
}
