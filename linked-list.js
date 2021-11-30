/** Node: node for a singly linked list. */

class Node {
  val = null;
  next = null;

  constructor(val, next=null) {
    this.val = val;
    this.next = next;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) this.tail = newNode;
    if (this.head !== null) newNode.next = this.head;

    this.head = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.head === null & this.tail === null) {
      throw new Error('Empty List');
    }

    let secondLast = this.head;
    let lastNode = this.tail;

    // if only one item in the list
    if (this.head !== null && this.head.next === null) {
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return lastNode.val;
    }

    // if there are multiple items in the list
    while (secondLast.next !== null && secondLast.next.next !== null) {
      secondLast = secondLast.next;
    }

    // in all cases, set the tail to point to null
    secondLast.next = null;
    this.tail = secondLast;
    this.length -= 1;

    return lastNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    // if (this.head === null & this.tail === null) {
    //   throw new Error('Empty List');
    // }

    // let firstNode = this.head;
    // let newFirstNode = this.head.next;

    // firstNode.next = null; // is this step necessary?
    // this.head = newFirstNode;

    // this.length -= 1;

    // return firstNode.val;
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error ('Invalid Index')
    }

    let idxCounter = 0;
    let current = this.head

    while (current !== null && idxCounter < idx) {
      current = current.next;
      idxCounter += 1;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error ('Invalid Index');
    }

    let idxCounter = 0;
    let current = this.head;

    while (current !== null && idxCounter < idx) {
      current = current.next;
      idxCounter += 1;
    }

    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error ('Invalid Index');
    }

    if (idx === 0) {
      this.unshift(val);
    } else if (idx === this.length) {
      this.push(val);
    } else {
      let idxCounter = 0;
      let current = this.head;
      let newNode = new Node (val);

      while (current !== null && idxCounter < idx - 1) {
        current = current.next;
        idxCounter += 1;
      }

      newNode.next = current.next;
      current.next = newNode;
      this.length += 1;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error ('Invalid Index');
    }

    // if removing first item in the list
    if (idx === 0) {
      let removeNode = this.head;
      this.head = removeNode.next;
      this.length -= 1;
      if (this.length < 2) {
        this.tail = this.head;
      }
      return removeNode.val;
    }

    let idxCounter = 0;
    let current = this.head;
    let next = this.head.next;
    let nextNext = this.head.next.next

    while (idxCounter < idx) {
      current = current.next;
      next = current.next.next;
      nextNext = current.next.next.next ? current.next.next.next : null;
    }

    current.next = nextNext;
    next.next = null; // is this step necessary?
    this.length -= 1;
    return next.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let sum = 0;
    let current = this.head;

    while (current !== null) {
      sum += current.val;
      current = current.next;
    }

    return sum/this.length;
  }

  print() {
    let current = this.head;
    while(current !== null) {
      console.log('current', current.val);
      current = current.next;
    }
  }
}

module.exports = LinkedList;
