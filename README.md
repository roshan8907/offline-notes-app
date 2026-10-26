# Offline Notes App — Starter Scaffold

## Run
```bash
npm install
npm run dev
```

## Build and preview
```bash
npm run build
npm run preview
```

## Assessment TODOs
- `src/db.js`: implement `openDB()` for `NotesDB` and the `notes` object store.
- `src/AddNotes.js`: persist a note in IndexedDB.
- `src/GetNotes.js`: read all records from IndexedDB.
- `public/service-worker.js`: implement install/activate/fetch caching.
- `src/App.jsx`: load notes from IndexedDB and refresh after saving.

The current UI works as a visual starter but stores notes only in React memory. Notes will not persist after refresh until IndexedDB is implemented. Offline support is not complete until the service worker is implemented and tested. Check the course AI policy before submitting.
