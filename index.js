const Queue = require('./lib/Queue')

function process (x, cb) {
  // simulate some long running process
  setTimeout(() => {
    console.log(`${Date.now()} processed: ${x * x}`)
    cb()
  }, 500)
}

/*
 * Main
 */
const queue = new Queue(process, 4)

// for loop adding data to the queue
// the queue will immediately kick off the process and process the queue until the end
for (var i = 1; i < 10; i++) {
  queue.enqueue(i)
}

setInterval(() => queue.enqueue([Math.random(), Math.random(), Math.random()]), 1000)
