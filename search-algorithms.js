class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.left = null
        this.right = null
    }

    dfs(values = []) {
        if (this.left) {
            values = this.left.dfs(values)
        }
        values.push(this.value)

        if (this.right) {
            values = this.right.dfs(values)
        }
        return values
    }

    bfs(tree, values = []) {
        const queue = new Queue()
        const node = tree.root
        queue.enqueue(node)
        while (queue.length) {
            const node = queue.dequeue() //remove from queue
            values.push(node.value) //add value to array

            if (node.left) {
                queue.enqueue(node.left) //add left child to queue
            }

            if (node.right) {
                queue.enqueue(node.right) //add right child to queue
            }
        }

        return values
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
    }

    enqueue(data) {
        const node = new _Node(data)

        if (this.first === null) {
            this.first = node
        }

        if (this.last) {
            this.last.next = node
        }

        this.last = node
    }

    dequeue() {
        if (this.first === null) {
            return
        }

        const node = this.first
        this.first = this.first.next

        if (node === this.last) {
            this.last = null
        }

        return node.value
    }


}

