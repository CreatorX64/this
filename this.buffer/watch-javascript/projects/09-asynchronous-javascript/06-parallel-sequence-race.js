function promisfy(item, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(item), delay));
}

function a() {
  return promisfy("a", 100);
}
function b() {
  return promisfy("b", 5000);
}
function c() {
  return promisfy("c", 3000);
}

// Parallel: Running promises in parallel.
async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `parallel is done: ${output1} ${output2} ${output3}`;
}

// Race: Use the return value of first promise that completes.
async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

// Sequence: Run promises in sequence.
async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done: ${output1} ${output2} ${output3}`;
}

parallel().then(console.log);
race().then(console.log);
sequence().then(console.log);
