/**
 * -----------------------------------------------------------------
 * NODE CLASS
 * -----------------------------------------------------------------
 * Represents a single link in the chain. It's a "dumb" container.
 * It only knows about its own value and the *next* node in the chain.
 */
class Node {
  constructor(value) {
    this.value = value; // The data (e.g., 21)
    this.next = null;   // The pointer to the next node, or null if it's the last
  }
}

/**
 * -----------------------------------------------------------------
 * LINKED LIST CLASS
 * -----------------------------------------------------------------
 * The "manager" of the list. It holds the blueprint for all the
 * methods and keeps track of three key pieces of information:
 *
 * 1. `this.head`: The entry point, or the *first* node.
 * 2. `this.tail`: The exit point, or the *last* node.
 * 3. `this.length`: The total number of nodes.
 *
 * Keeping a `tail` is an optimization that allows O(1) (constant time)
 * additions to the end (`push`).
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * ----------------------------------------
   * PUSH: Adds a new node to the *end*
   * ----------------------------------------
   *
   * Time Complexity: O(1) - Constant Time
   *
   * **Interview-Worthy Explanation:**
   * This is O(1) *because* we maintain a `this.tail` pointer. We don't
   * have to loop through the list to find the end. We just tell the
   * current tail to point to our new node, and then we update `this.tail`
   * to *be* that new node.
   */
  push(value) {
    const newNode = new Node(value);

    // Edge Case: The list is empty
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Case 2: The list is NOT empty
      this.tail.next = newNode; // Point the old tail to the new node
      this.tail = newNode;      // Update the tail to be the new node
    }
    this.length++;
    return this; // Return the list for chaining (e.g., list.push(1).push(2))
  }

  /**
   * ----------------------------------------
   * POP: Removes a node from the *end*
   * ----------------------------------------
   *
   * Time Complexity: O(n) - Linear Time
   *
   * **Interview-Worthy Explanation:**
   * This is the classic "weakness" of a Singly Linked List. To remove
   * the last node, we must find the *second-to-last* node (so we can
   * set its `next` to null). Because we can only move *forward*,
   * we MUST traverse the entire list from `this.head` (`O(n)`)
   * to find it.
   */
  pop() {
    // Edge Case 1: The list is empty
    if (!this.head) return undefined;

    // Use two pointers, 'temp' and 'pre' (previous)
    let temp = this.head;
    let pre = this.head;

    // Loop until 'temp' is the *last* node
    while (temp.next) {
      pre = temp;       // 'pre' will be the node *before* temp
      temp = temp.next; // 'temp' moves one step forward
    }
    // When the loop stops:
    // 'temp' is the last node (the one we want to remove)
    // 'pre' is the second-to-last node

    // 1. Set the new tail to be the second-to-last node
    this.tail = pre;
    // 2. "Cut off" the old tail by setting the new tail's 'next' to null
    this.tail.next = null;
    // 3. Decrement length
    this.length--;

    // Edge Case 2: We just removed the only item.
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return temp; // Return the removed node
  }

  /**
   * ----------------------------------------
   * UNSHIFT: Adds a new node to the *beginning*
   * ----------------------------------------
   *
   * Time Complexity: O(1) - Constant Time
   *
   * **Interview-Worthy Explanation:**
   * This is a key *strength* of a Linked List. Unlike an array, where
   * adding to the front is `O(n)` (because all elements must be
   * re-indexed), here we just do a quick pointer swap. We tell the
   * new node to point to the old head, and then we update `this.head`
   * to be the new node.
   */
  unshift(value) {
    const newNode = new Node(value);

    // Edge Case: The list is empty
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Case 2: The list is NOT empty
      newNode.next = this.head; // Point the new node to the old head
      this.head = newNode;      // Update the head to be the new node
    }
    this.length++;
    return this;
  }

  /**
   * ----------------------------------------
   * SHIFT: Removes a node from the *beginning*
   * ----------------------------------------
   *
   * Time Complexity: O(1) - Constant Time
   *
   * **Interview-Worthy Explanation:**
   * Like `unshift`, this is `O(1)` and a major advantage over arrays
   * (which would be `O(n)`). We just move the `head` pointer one
   * step forward to the second node.
   */
  shift() {
    // Edge Case 1: The list is empty
    if (!this.head) return undefined;

    // 1. Store the old head (so we can return it)
    let temp = this.head;
    // 2. Move the head pointer to the next node
    this.head = this.head.next;
    // 3. Decrement length
    this.length--;

    // Edge Case 2: If we just removed the last item
    if (this.length === 0) {
      this.tail = null;
    }
    
    // 4. Clean up the removed node's 'next' pointer
    temp.next = null;
    
    return temp; // Return the removed node
  }

  /**
   * ----------------------------------------
   * GET: Retrieves a node by its *index*
   * ----------------------------------------
   *
   * Time Complexity: O(n) - Linear Time
   *
   * **Interview-Worthy Explanation:**
   * This is a key *weakness* of Linked Lists. Unlike an array, which
   * has `O(1)` indexed access (e.g., `arr[10]`), we cannot jump
   * directly to a node. We *must* start at `this.head` and
   * "walk" `n` steps to find the node at that index.
   */
  get(index) {
    // **FIXED BUG:** Check must be `index >= this.length`, not `>`.
    // Valid indices are 0 to (length - 1).
    if (index < 0 || index >= this.length) return null;

    let counter = 0;
    let temp = this.head;

    while (counter !== index) {
      temp = temp.next;
      counter++;
    }
    return temp;
  }

  /**
   * ----------------------------------------
   * SET: Changes the value of a node at an index
   * ----------------------------------------
   *
   * Time Complexity: O(n) - Linear Time
   *
   * **Interview-Worthy Explanation:**
   * This operation is dominated by the `get` method. The time
   * to *find* the node is `O(n)`. Once we find it, the time
   * to *update* its value is just `O(1)`.
   * Total time: O(n) + O(1) = O(n).
   */
  set(index, value) {
    // **FIXED BUG:** Must call `this.get()`, not just `get()`.
    let foundNode = this.get(index);

    if (foundNode) {
      foundNode.value = value;
      return true; // Return success
    }
    return false; // Return failure
  }

  /**
   * ----------------------------------------
   * INSERT: Adds a new node at a specific index
   * ----------------------------------------
   *
   * Time Complexity: O(n) - Linear Time
   *
   * **Interview-Worthy Explanation:**
   * This is `O(n)` because we must `get` the node *before* the
   * insertion point. However, the *insertion itself* (the pointer
   * manipulation) is `O(1)`. This is still much better than an
   * array, where inserting in the middle is `O(n)` to find the
   * spot AND `O(n)` to shift all subsequent elements.
   */
  insert(index, value) {
    // **FIXED BUG:** Logic was `!index < 0`, should be `index < 0`.
    // `index > this.length` is also invalid (can't insert at index 10 if length is 3)
    if (index < 0 || index > this.length) return false;

    // Use existing O(1) methods if possible
    if (index === this.length) {
      return !!this.push(value); // `!!` converts the list (truthy) to `true`
    }
    if (index === 0) {
      return !!this.unshift(value);
    }

    // **FIXED BUG:** Must use `new Node()`, not just `Node()`.
    const newNode = new Node(value);
    // 1. Get the node *before* the insertion point
    let temp = this.get(index - 1);

    // 2. "Cut in line": Point the new node to the one it's cutting in front of
    newNode.next = temp.next;
    // 3. Point the "before" node to the new node
    temp.next = newNode;

    this.length++;
    return true;
  }

  /**
   * ----------------------------------------
   * REMOVE: Removes a node from a specific index
   * ----------------------------------------
   *
   * Time Complexity: O(n) - Linear Time
   *
   * **Interview-Worthy Explanation:**
   * Same logic as `insert`. We have O(1) special cases for the
   * beginning (`shift`) and end (`pop`). For everything in
   * the middle, we must `get` the node *before* the one we
   * want to remove (`O(n)`), and then perform an `O(1)`
   * "pointer skip" to remove it.
   */
  remove(index) {
    // Case 1: Invalid index
    if (index < 0 || index >= this.length) return undefined;

    // Case 2: Remove from the beginning (O(1))
    if (index === 0) return this.shift();

    // Case 3: Remove from the end (O(n))
    if (index === this.length - 1) return this.pop();

    // Case 4: Remove from the middle
    // 1. Get the node *before* the one to remove
    let beforeNode = this.get(index - 1);
    // 2. Store the node to be removed (so we can return it)
    let temp = beforeNode.next;

    // 3. This is the "pointer skip". We tell the 'before' node
    //    to point to the node *after* the one we're removing.
    beforeNode.next = temp.next;

    // 4. Clean up the removed node
    temp.next = null;
    this.length--;
    
    return temp; // Return the removed node
  }

  /**
   * ----------------------------------------
   * UTILITY: Prints the list (for debugging)
   * ----------------------------------------
   */
  printList() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    console.log(`
--------------------------------
  List: ${arr.join(" -> ")}
  Length: ${this.length}
  Head: ${this.head ? this.head.value : "null"}
  Tail: ${this.tail ? this.tail.value : "null"}
--------------------------------
    `);
  }
}

// --- Example Usage (Now with a print method!) ---

const mylinkedlist = new LinkedList();

mylinkedlist.push(21);
mylinkedlist.push(26);
mylinkedlist.push(29);
mylinkedlist.printList();
/*
  List: 21 -> 26 -> 29
  Length: 3
  Head: 21
  Tail: 29
*/

// **FIXED COMMENT:** `pop()` removes from the end.
console.log("Popping node:", mylinkedlist.pop().value); // Popping node: 29
mylinkedlist.printList();
/*
  List: 21 -> 26
  Length: 2
  Head: 21
  Tail: 26
*/

// **FIXED COMMENT:** `unshift()` adds to the *beginning*.
mylinkedlist.unshift(10);
mylinkedlist.printList();
/*
  List: 10 -> 21 -> 26
  Length: 3
  Head: 10
  Tail: 26
*/

mylinkedlist.insert(1, "INSERTED");
mylinkedlist.printList();
/*
  List: 10 -> INSERTED -> 21 -> 26
  Length: 4
  Head: 10
  Tail: 26
*/

mylinkedlist.remove(2);
mylinkedlist.printList();
/*
  List: 10 -> INSERTED -> 26
  Length: 3
  Head: 10
  Tail: 26
*/