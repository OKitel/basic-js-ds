const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (this._root === null) {
      this._root = node;
    } else {
      this._insertNode(this._root, node);
    }
  }

  _insertNode(root, node) {
    if (node.data < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this._insertNode(root.left, node);
      }
    } else {
      if (root.right === null) {
        root.right = node;
      } else {
        this._insertNode(root.right, node);
      }
    }
  }

  has(data) {
    return hasValue(this._root, data);

    function hasValue(root, value) {
      if (!root) {
        return false;
      }

      if (root.data === value) {
        return true;
      }

      return value < root.data
        ? hasValue(root.left, value)
        : hasValue(root.right, value);
    }
  }

  find(data, root = this._root) {
    if (root === null) {
      return null;
    } else if (data < root.data) {
      return this.find(data, root.left);
    } else if (data > root.data) {
      return this.find(data, root.right);
    } else {
      return root;
    }
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(root, value) {
    if (root === null) {
      return null;
    } else if (value < root.data) {
      root.left = this._removeNode(root.left, value);
      return root;
    } else if (value > root.data) {
      root.right = this._removeNode(root.right, value);
      return root;
    } else {
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      }
      if (root.left === null) {
        root = root.right;
        return root;
      }
      if (root.right === null) {
        root = root.left;
        return root;
      }

      let minRightValue = root.right;
      while (minRightValue.left) {
        minRightValue = minRightValue.left;
      }

      root.data = minRightValue.data;
      root.right = this._removeNode(root.right, minRightValue.data);
      return root;
    }
  }

  min() {
    if (!this._root) {
      return null;
    }
    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) {
      return null;
    }
    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
