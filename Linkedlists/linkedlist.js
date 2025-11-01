/**
 * Represents a single node (or link) in the chain.
 * Each node holds its own data and a pointer to the next node.
 */
class Node {
  constructor(value) {
    this.value = value; // The data stored in the node (e.g., 21, "hello", etc.)
    this.next = null; // A pointer to the next node in the list, null if it's the last node
  }
}

/**
 * Manages the entire chain of nodes.
 * It keeps track of the start (head), end (tail), and total length.
 */
class LinkedList {
  /**
   * Initializes a new, empty linked list.
   */
  constructor() {
    this.head = null; // The first node in the list
    this.tail = null; // The last node in the list
    this.length = 0; // The total number of nodes in the list
  }

  /**
   * Adds a new node to the *end* of the list.
   * Time Complexity: O(1) - very fast.
   * @param {*} value - The value to add to the new node.
   */
  push(value) {
    // 1. Create the new node
    const newNode = new Node(value);

    // 2. Check if the list is empty
    if (this.head == null) {
      // If it is, this new node is both the head and the tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 3. If the list is NOT empty:
      // Point the *current* tail's 'next' pointer to our new node
      this.tail.next = newNode;
      // Then, update the list's 'tail' to *be* the new node
      this.tail = newNode;
    }

    // 4. Increment the length and return the list for chaining
    this.length++;
    return this;
  }

  /**
   * Removes and returns the *last* node from the list.
   * Time Complexity: O(n) - slow, because it must traverse the whole list.
   */
  pop() {
    // Case 1: The list is empty. Nothing to pop.
    if (!this.head) return undefined;

    // We need to find the *second-to-last* node.
    // 'temp' will be the explorer (becomes the last node).
    // 'pre' will be the follower (becomes the second-to-last node).
    let pre = this.head;
    let temp = this.head;

    // Loop as long as 'temp' is NOT the last node (i.e., as long as temp.next exists)
    while (temp.next) {
      pre = temp; // 'pre' moves to where 'temp' was
      temp = temp.next; // 'temp' moves one step forward
    }
    // When the loop stops:
    // 'temp' is the last node (the one we want to remove)
    // 'pre' is the second-to-last node

    // 1. Set the new tail to be the second-to-last node
    this.tail = pre;
    // 2. "Cut off" the last node by setting the new tail's 'next' to null
    this.tail.next = null;
    // 3. Decrement the length
    this.length--;

    // Case 2: We just removed the *only* item in the list.
    // If the list is now empty, we must also reset the head and tail to null.
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }

    // 4. Return the node we removed
    return temp;
  }
}

// --- Example Usage ---

// Create a new, empty list
const mylinkedlist = new LinkedList();

// Add '21' to the end. List: [21]
mylinkedlist.push(21);
// Add '26' to the end. List: [21] -> [26]
mylinkedlist.push(26);
// Add '29' to the end. List: [21] -> [26] -> [29]
mylinkedlist.push(29);

// Remove the last item ('29')
mylinkedlist.pop();

// Print the final list structure
// Head should be '21', Tail should be '26', Length should be 2
console.log(mylinkedlist);