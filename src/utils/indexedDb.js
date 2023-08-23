import { openDB } from 'idb';

const dbName = 'eventMediaDB';
const storeName = 'eventMediaStore';

let dbInstance = null;

export const initializeDB = async () => {
    console.log("Initializing DB...");
    if (!dbInstance || dbInstance?.isClosed) {
        dbInstance = await openDB(dbName, 2, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            }
        });
        console.log("created db");
        console.log(dbInstance);
    }
    return dbInstance;
};

export const storeBlob = async (key, blob) => {
    if (!dbInstance) await initializeDB();

    console.log("STORE BLOB");
    console.log(dbInstance);

    await dbInstance.put(storeName, blob, key);
};

export const getBlob = async (key) => {
    if (!dbInstance) await initializeDB();
    console.log("GET BLOB");
    console.log(dbInstance);

    const blob = await dbInstance.get(storeName, key);
    if (blob) {
        // Log the type of the blob
        console.log("Blob type:", blob.type);
        
        // Log the size of the blob
        console.log("Blob size:", blob.size, "bytes");

        // Optionally, display it as an image URL in the console
        const imageUrl = URL.createObjectURL(blob);
        console.log("Image URL:", imageUrl);
        // Note: If you do this, remember to revoke the object URL after using it to avoid memory leaks
        // URL.revokeObjectURL(imageUrl);
    } else {
        console.log("No blob found for the given key");
    }

    return blob;
};

export const clearBlob = async (key) => {
    if (!dbInstance) await initializeDB();

    
    console.log("CLEAR BLOB");
    console.log(dbInstance);

    const tx = dbInstance.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(key);
};


export const clearAll = async () => {
    if (!dbInstance) await initializeDB();
    
    console.log("CLEAR ALL FROM DB");
    console.log(dbInstance);

    const tx = dbInstance.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.clear(); // This will clear all entries in the object store.
};
