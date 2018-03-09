class Queue {
  constructor (process, concurrency = 1) {
    this.isStarted = false
    this.q = []
    this.process = process
    this.concurrency = concurrency
  }

  getQueue () { return this.q }

  enqueue (elem) {
    this.q.push(...Array.isArray(elem) ? elem : [elem])

    // run immediately after you add things via for loop
    setImmediate(() => {
      if (!this.isStarted) {
        this.isStarted = true
        this.start()
      }
    })
  }

  dequeue () { return this.q.shift() }

  size () { return this.q.length }

  isEmpty () { return this.size() === 0 }

  start () {
    for (let i = 0; i <= this.concurrency && !this.isEmpty(); i++, this.concurrency--) {
      this.process(this.dequeue(), (!this.isEmpty()) ? this.start.bind(this) : () => {})
    }
    this.concurrency++

    if (this.isEmpty()) this.isStarted = false
  }
}

module.exports = Queue
