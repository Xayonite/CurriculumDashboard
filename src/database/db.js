import { openDB } from 'idb';

const DB_NAME = 'FileManagerDB';
const STORE_NAME = 'files';
const DB_VERSION = 2;  // increment this whenever schema changes

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion < DB_VERSION) {
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
        }
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'fileName' });
        
        store.createIndex('deptIndex', 'deptIndex', { unique: false });
      }
    }
  });
};

export const addFile = async (file, deptIndex) => {
  const db = await initDB();
  await db.add(STORE_NAME, {
    deptIndex,
    fileName: file.name,
    file: file,
    timestamp: new Date().toISOString()
  });
};

export const getFileByFileName = async (fileName) => {
  const db = await initDB();
  return db.get(STORE_NAME, fileName);
};

export const getFilesByDept = async (deptIndex) => {
  const db = await initDB(); 
  const allFiles = await db.getAll(STORE_NAME); 
  return allFiles.filter(file => file.deptIndex === deptIndex); 
};

export const previewFileByFileName = async (fileName) => {
  const db = await initDB();
  const fileRecord = await db.get(STORE_NAME, fileName);

  if (!fileRecord || !fileRecord.file) {
    alert('File not found or not stored correctly.');
    return;
  }

  const url = URL.createObjectURL(fileRecord.file);
  window.open(url);
};

export const deleteFileByName = async (fileName) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  await store.delete(fileName);
  
  await tx.done;
};
