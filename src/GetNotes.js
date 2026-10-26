import { openDB } from './db.js';

export async function getAllNotes() {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('notes', 'readonly');
    const store = transaction.objectStore('notes');
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}