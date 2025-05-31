function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

self.onmessage = function (event) {
    const max = event.data;
    const start = performance.now();

    let count = 0;
    for (let i = 2; i <= max; i++) {
        if (isPrime(i)) count++;
    }

    const end = performance.now();

    self.postMessage({
        count,
        time: Math.round(end - start),
    });
};
