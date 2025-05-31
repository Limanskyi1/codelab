const input = document.getElementById('input');
const button = document.getElementById('start');
const status = document.getElementById('status');

const worker = new Worker('worker.js');

const setStatus = (message) => status.textContent = message;

const getNumber = () => {
    const number = parseInt(input.value);
    if (isNaN(number)) {
        status.textContent = 'Put a valid number';
        return;
    }
    return number;
}

button.onclick = () => {
  const number = getNumber();
  setStatus('Counting processing...');
  worker.postMessage(number);
};

worker.onmessage = (event) => {
  const { count, time } = event.data;
  setStatus(`Found ${count} prime numbers in ${time} ms.`);
};