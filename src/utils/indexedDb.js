/**
 * Utils for managing indexed db storage
 */

//Import dependencies
import { openDB } from 'idb';

//The name of db and storage name
const dbName = 'eventMediaDB';
const storeName = 'eventMediaStore';
//The instance for db transactions
let dbInstance = null;

/**
 * Initializes the indexed db
 * @returns Indexed Db instance
 */
export const initializeDB = async () => {
    console.log("Initializing db...");
    if (!dbInstance || dbInstance?.isClosed) {
        dbInstance = await openDB(dbName, 2, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            }
        });
        console.log("created indexed db instance");
        console.log(dbInstance);
    }
    return dbInstance;
};

/**
 * Store blob data in indexed db
 * @param {*} key 
 * @param {*} blob 
 */
export const storeBlob = async (key, blob) => {
    if (!dbInstance) await initializeDB();
    await dbInstance.put(storeName, blob, key);
};


/**
 * Gets blob data from indexed db
 * @param {*} key 
 * @returns 
 */
export const getBlob = async (key) => {
    if (!dbInstance) await initializeDB();
    const blob = await dbInstance.get(storeName, key);
    if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        console.log("Image URL:", imageUrl);
    } else {
        console.log("No blob found for the given key");
    }
    return blob;
};

/**
 * Clear blob data from indexed db
 * @param {*} key 
 */
export const clearBlob = async (key) => {
    if (!dbInstance) await initializeDB();
    const tx = dbInstance.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(key);
};


/**
 * Clear all blob data from indexed db
 */
export const clearAll = async () => {
    if (!dbInstance) await initializeDB();
    const tx = dbInstance.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.clear();
};
