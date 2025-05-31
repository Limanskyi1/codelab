📌 What is a Web Worker?
A Web Worker is a background thread in a browser that allows JavaScript code 
to be executed outside of the main UI thread so as not to slow down the interface.

✅ Why use it?
For heavy computations (e.g., big data processing, cryptography)
For non-blocking logic so that the interface does not freeze
To improve responsiveness and UX

🚫 What is not allowed in workers?
No access to DOM (document, window)
Alert, confirm, and prompt cannot be used
No localStorage, but IndexedDB is available
Cannot work directly with HTML