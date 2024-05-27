export const IndexedDB = () => {

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pic-v', 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Créez un objectStore (collection) pour stocker vos données
      const objectStore = db.createObjectStore('workspace', { keyPath: 'id' });
      // Définissez l'index 'timestamp' dans l'objectStore
      objectStore.createIndex('timestamps', 'timestamp', { unique: false });
      //objectStore.createIndex('adminId', 'adminId', { unique: false });

      // Créez un objectStore (collection) pour stocker vos données
      const recently_viewedDB = db.createObjectStore('Recently_viewedDB', { keyPath: 'id' });

      // Définissez l'index 'timestamp' dans l'objectStore
      recently_viewedDB.createIndex('timestamp', 'timestamp', { unique: false });


      // Créez un objectStore (collection) pour stocker vos données
      const creative = db.createObjectStore('creative', { keyPath: 'id' });

      // Définissez l'index 'timestamp' dans l'objectStore
      creative.createIndex('timestamp', 'timestamp', { unique: false });

      // Créez un objectStore (collection) pour stocker vos données
      db.createObjectStore('BookMarkDB', { keyPath: 'id' });
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const DelIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase("pic-v", 1);

    deleteRequest.onsuccess = function () {
      window.alert('Suppression de la base de donner local effectué avec succès')
      resolve();
      console.log("La base de données a été supprimée avec succès");
    };

    deleteRequest.onerror = function (event) {
      reject();
      console.log("Erreur lors de la suppression de la base de données:", event.target.error);
    };

  });
};


// Dans votre fichier IndexedDB.js
export const recupererTousLesElements = (db, adminId) => {
  if (!adminId) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readonly'); // 'workspace' est le nom de l'object store
    const store = transaction.objectStore('workspace');

    // Obtenez l'index 'timestamp' dans l'object store
    const index = store.index('timestamps');

    const elements = [];
    const other_elements = [];

    // Ouvrez un curseur pour parcourir tous les éléments de l'object store en utilisant l'index 'timestamp'
    const cursorRequest = index.openCursor(null, 'prev'); // 'prev' pour l'ordre inverse

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        // Ajoutez chaque élément à un tableau
        const element = cursor.value;
        if (element.adminId === adminId) {
          elements.push({
            id: element.id,
            name: element.name,
            miniature: element.miniature,
            type: element.type,
          });
        } else {
          other_elements.push({
            id: element.id,
            name: element.name,
            miniature: element.miniature,
            type: element.type,
          });
        }
        cursor.continue();
      } else {
        // Lorsque le curseur atteint la fin, résolvez la promesse avec le tableau d'éléments
        resolve({ elements, other_elements });
      }
    };

    cursorRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};



export const ajouterElement = (db, nouvelElement) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readwrite');
    const store = transaction.objectStore('workspace');

    //console.log(nouvelElement);

    // Vérifiez d'abord si l'élément avec la même clé (ID) existe déjà
    const getRequest = store.get(nouvelElement.id);

    getRequest.onsuccess = (event) => {
      const existingElement = event.target.result;
      if (!existingElement) {
        // Si l'élément n'existe pas, ajoutez-le
        const ajoutRequest = store.add(nouvelElement);

        ajoutRequest.onsuccess = () => {
          resolve();
        };

        ajoutRequest.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        // Mettez à jour l'élément avec le nouveau contenu
        //existingElement = nouvelElement;
        existingElement.name = nouvelElement.name;
        existingElement.data = nouvelElement.data;
        existingElement.tags = nouvelElement.tags;
        existingElement.adult = nouvelElement.adult;
        existingElement.visibility = nouvelElement.visibility;
        existingElement.miniature = nouvelElement.miniature;
        existingElement.comments = nouvelElement.comments;
        existingElement.ai = nouvelElement.ai;
        existingElement.images = nouvelElement.images;
        existingElement.resize = nouvelElement.resize;
        existingElement.autoLayout = nouvelElement.autoLayout;
        existingElement.allowUserEditTag = nouvelElement.allowUserEditTag;
        existingElement.shop = nouvelElement.shop;
        existingElement.diamond = nouvelElement.diamond;
        existingElement.dataDescription = nouvelElement.dataDescription;



        //console.log(element.contenu = nouveauContenu);

        // Utilisez la méthode put pour mettre à jour l'élément
        const putRequest = store.put(existingElement);

        putRequest.onsuccess = () => {
          // L'élément a été mis à jour avec succès, résolvez la promesse
          resolve();
        };

        putRequest.onerror = (event) => {
          // Une erreur s'est produite lors de la mise à jour, rejetez la promesse avec l'erreur
          reject(event.target.error);
        };

        // Si l'élément existe déjà, vous pouvez gérer cette situation comme vous le souhaitez
        // Par exemple, rejeter la promesse avec un message d'erreur
        //reject(new Error('Élément avec la même clé déjà présent dans l object store'));
      }
    };
    getRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });


};




// Dans votre fichier IndexedDB.js
export const supprimerElement = (db, elementId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readwrite');
    const store = transaction.objectStore('workspace');

    // Utilisez la méthode `delete` pour supprimer l'élément par sa clé (ID)
    const deleteRequest = store.delete(elementId);

    deleteRequest.onsuccess = () => {
      resolve();
    };

    deleteRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Dans votre fichier IndexedDB.js
export const supprimerDesElements = (db, elementIdArray) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readwrite');
    const store = transaction.objectStore('workspace');

    const deleteRequests = elementIdArray.map((elementId) => {
      // Utilisez la méthode `delete` pour supprimer l'élément par sa clé (ID)
      return store.delete(elementId);
    });

    // Utilisez Promise.all pour attendre la résolution de toutes les opérations de suppression
    Promise.all(deleteRequests)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const chercherElement = (db, elementId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readonly');
    const store = transaction.objectStore('workspace');

    const request = store.get(elementId);

    request.onsuccess = (event) => {
      const element = event.target.result;
      if (element) {
        // L'élément a été trouvé, résolvez la promesse avec l'élément
        resolve(element);
      } else {
        // L'élément n'a pas été trouvé, résolvez la promesse avec null ou un autre indicateur
        resolve(null);
      }
    };

    request.onerror = (event) => {
      // Une erreur s'est produite lors de la recherche, rejetez la promesse avec l'erreur
      reject(event.target.error);
    };
  });
};

export const mettreAJourElement = (db, elementId, nouveauContenu) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readwrite');
    const store = transaction.objectStore('workspace');


    // Utilisez la méthode get pour obtenir l'élément existant
    const getRequest = store.get(elementId);


    getRequest.onsuccess = (event) => {
      const element = event.target.result;
      if (element) {
        // Mettez à jour l'élément avec le nouveau contenu
        element.name = nouveauContenu.name;
        element.data = nouveauContenu.data;
        element.tags = nouveauContenu.tags;
        element.adult = nouveauContenu.adult;
        element.visibility = nouveauContenu.visibility;
        element.miniature = nouveauContenu.miniature;
        element.comments = nouveauContenu.comments;
        element.ai = nouveauContenu.ai;
        element.images = nouveauContenu.images;
        element.resize = nouveauContenu.resize;
        element.autoLayout = nouveauContenu.autoLayout;
        element.allowUserEditTag = nouveauContenu.allowUserEditTag;
        element.shop = nouveauContenu.shop;
        element.diamond = nouveauContenu.diamond;
        element.dataDescription = nouveauContenu.dataDescription;

        // Utilisez la méthode put pour mettre à jour l'élément
        const putRequest = store.put(element);

        putRequest.onsuccess = () => {
          // L'élément a été mis à jour avec succès, résolvez la promesse
          resolve();
        };

        putRequest.onerror = (event) => {
          // Une erreur s'est produite lors de la mise à jour, rejetez la promesse avec l'erreur
          reject(event.target.error);
        };
      } else {
        // L'élément n'a pas été trouvé, résolvez la promesse avec un indicateur d'erreur
        resolve({ erreur: "Élément introuvable" });
      }
    };
    getRequest.onerror = (event) => {
      // Une erreur s'est produite lors de la recherche de l'élément, rejetez la promesse avec l'erreur
      reject(event.target.error);
    };
  });
};
// Dans votre fichier IndexedDB.js
export const clearTableWorkSpaceById = (db, array) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readwrite');
    const store = transaction.objectStore('workspace');

    const deleteRequests = array.map((elementId) => {
      // Utilisez la méthode `delete` pour supprimer l'élément par sa clé (ID)
      return store.delete(elementId.id);
    });

    // Utilisez Promise.all pour attendre la résolution de toutes les opérations de suppression
    Promise.all(deleteRequests)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const clearTableWorkSpace = (db) => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('workspace', 'readwrite'); // Replace 'yourObjectStoreName' with your actual object store name
      const objectStore = transaction.objectStore('workspace'); // Replace 'yourObjectStoreName' again

      const clear = objectStore.clear();

      clear.onsuccess = () => {
        // L'élément a été mis à jour avec succès, résolvez la promesse
        resolve();
      };

      clear.onerror = (event) => {
        // Une erreur s'est produite lors de la mise à jour, rejetez la promesse avec l'erreur
        reject(event.target.error);
      };

      console.log('Object store cleared successfully');
    } catch (error) {
      console.error('Error clearing object store:', error);
    }
  })
}

export const add_Recently_viewedDB = (db, nouvelElement) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['Recently_viewedDB'], 'readwrite');
    const store = transaction.objectStore('Recently_viewedDB');


    // Vérifiez d'abord si l'élément avec la même clé (ID) existe déjà
    const getRequest = store.get(nouvelElement.id);

    getRequest.onsuccess = (event) => {
      const existingElement = event.target.result;
      if (!existingElement) {
        // If the element doesn't exist, add it
        const ajoutRequest = store.add(nouvelElement);

        ajoutRequest.onsuccess = () => {
          const MAX_ITEMS = localStorage.getItem('numRecentViews') || 10;

          // Vérifie le nombre d'éléments dans la base de données
          const countRequest = store.count();

          countRequest.onsuccess = (event) => {
            const count = event.target.result;

            if (count > MAX_ITEMS) {
              // Si le nombre d'éléments dépasse la limite, recherchez l'élément avec la plus petite timestamp
              const indexRequest = store.index('timestamp').openCursor(null, 'next');

              indexRequest.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                  // Supprime l'élément avec la plus petite timestamp
                  const deleteRequest = store.delete(cursor.primaryKey);

                  deleteRequest.onsuccess = () => {
                    resolve();
                    console.log("Ancien élément supprimé avec succès.");
                  };

                  deleteRequest.onerror = (event) => {
                    console.error("Erreur lors de la suppression de l'ancien élément:", event.target.error);
                  };
                }
              };
            }

          }
        };

        ajoutRequest.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        // Use the put method to update the element
        const putRequest = store.put(nouvelElement);

        putRequest.onsuccess = () => {
          // The element has been successfully updated, resolve the promise
          resolve();
        };

        putRequest.onerror = (event) => {
          // An error occurred while updating, reject the promise with the error
          reject(event.target.error);
        };
      }
    };
    getRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Dans votre fichier IndexedDB.js
export const get_Recently_viewedDB = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['Recently_viewedDB'], 'readonly'); // 'workspace' est le nom de l'object store
    const store = transaction.objectStore('Recently_viewedDB');

    // Obtenez l'index 'timestamp' dans l'object store
    const index = store.index('timestamp');

    const elements = [];

    // Ouvrez un curseur pour parcourir tous les éléments de l'object store en utilisant l'index 'timestamp'
    const cursorRequest = index.openCursor(null, 'prev'); // 'prev' pour l'ordre inverse

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        // Ajoutez chaque élément à un tableau
        const element = cursor.value;
        elements.push(element);
        cursor.continue();
      } else {
        // Lorsque le curseur atteint la fin, résolvez la promesse avec le tableau d'éléments
        resolve(elements);
      }
    };

    cursorRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
export const del_Recently_viewedDB = (db) => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction('Recently_viewedDB', 'readwrite'); // Replace 'yourObjectStoreName' with your actual object store name
      const objectStore = transaction.objectStore('Recently_viewedDB'); // Replace 'yourObjectStoreName' again

      const clear = objectStore.clear();

      clear.onsuccess = () => {
        // L'élément a été mis à jour avec succès, résolvez la promesse
        resolve();
      };

      clear.onerror = (event) => {
        // Une erreur s'est produite lors de la mise à jour, rejetez la promesse avec l'erreur
        reject(event.target.error);
      };

      console.log('Object store cleared successfully');
    } catch (error) {
      console.error('Error clearing object store:', error);
    }
  })
}


export const add_BookMark_DB = (db, nouvelElement) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['BookMarkDB'], 'readwrite');
    const store = transaction.objectStore('BookMarkDB');

    // Vérifiez d'abord si l'élément avec la même clé (ID) existe déjà
    const getRequest = store.get(nouvelElement.id);

    getRequest.onsuccess = (event) => {
      const existingElement = event.target.result;
      if (!existingElement) {
        //console.log('add(nouvelElement)');
        // Si l'élément n'existe pas, ajoutez-le
        const ajoutRequest = store.add(nouvelElement);

        ajoutRequest.onsuccess = () => {
          resolve();
        };

        ajoutRequest.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        //console.log('put(existingElement)');
        // Mettez à jour l'élément avec le nouveau contenu
        existingElement.id = nouvelElement.id;
        existingElement.index = nouvelElement.index;

        // Utilisez la méthode put pour mettre à jour l'élément
        const putRequest = store.put(existingElement);

        putRequest.onsuccess = () => {
          // L'élément a été mis à jour avec succès, résolvez la promesse
          resolve();
        };

        putRequest.onerror = (event) => {
          // Une erreur s'est produite lors de la mise à jour, rejetez la promesse avec l'erreur
          reject(event.target.error);
        };

        // Si l'élément existe déjà, vous pouvez gérer cette situation comme vous le souhaitez
        // Par exemple, rejeter la promesse avec un message d'erreur
        //reject(new Error('Élément avec la même clé déjà présent dans l object store'));
      }
    };
    getRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export const get_BookMark_DB = (db, elementId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['BookMarkDB'], 'readonly');
    const store = transaction.objectStore('BookMarkDB');

    const request = store.get(elementId);

    request.onsuccess = (event) => {
      const element = event.target.result;
      if (element) {
        // L'élément a été trouvé, résolvez la promesse avec l'élément
        resolve(element);
      } else {
        // L'élément n'a pas été trouvé, résolvez la promesse avec null ou un autre indicateur
        resolve(null);
      }
    };

    request.onerror = (event) => {
      // Une erreur s'est produite lors de la recherche, rejetez la promesse avec l'erreur
      reject(event.target.error);
    };
  });
};

// Dans votre fichier IndexedDB.js
export const del_BookMark_DB = (db, elementId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['BookMarkDB'], 'readwrite');
    const store = transaction.objectStore('BookMarkDB');

    // Utilisez la méthode `delete` pour supprimer l'élément par sa clé (ID)
    const deleteRequest = store.delete(elementId);

    deleteRequest.onsuccess = () => {
      resolve();
    };

    deleteRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};


export const ajouterElementCreative = (db, nouvelElement) => {
  //if (nouvelElement.images_blob.length === 0) {
  //  return
  //}
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['creative'], 'readwrite');
    const store = transaction.objectStore('creative');

    //console.log(nouvelElement);

    // Vérifiez d'abord si l'élément avec la même clé (ID) existe déjà
    const getRequest = store.get(nouvelElement.id);

    getRequest.onsuccess = (event) => {
      const existingElement = event.target.result;
      if (!existingElement) {
        // Si l'élément n'existe pas, ajoutez-le
        const ajoutRequest = store.add(nouvelElement);

        ajoutRequest.onsuccess = () => {
          resolve();
        };

        ajoutRequest.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        // Mettez à jour l'élément avec le nouveau contenu
        //existingElement = nouvelElement;
        existingElement.adminId = nouvelElement.adminId;
        //existingElement.projet_name = nouvelElement.projet_name;
        //existingElement.imageUrl = nouvelElement.imageUrl;
        //existingElement.images_blob = nouvelElement.images_blob;
        //existingElement.file = nouvelElement.file;
        existingElement.type = nouvelElement.type;
        //existingElement.blob = nouvelElement.blob;




        //console.log(element.contenu = nouveauContenu);

        // Utilisez la méthode put pour mettre à jour l'élément
        const putRequest = store.put(existingElement);

        putRequest.onsuccess = () => {
          // L'élément a été mis à jour avec succès, résolvez la promesse
          resolve();
        };

        putRequest.onerror = (event) => {
          // Une erreur s'est produite lors de la mise à jour, rejetez la promesse avec l'erreur
          reject(event.target.error);
        };

        // Si l'élément existe déjà, vous pouvez gérer cette situation comme vous le souhaitez
        // Par exemple, rejeter la promesse avec un message d'erreur
        //reject(new Error('Élément avec la même clé déjà présent dans l object store'));
      }
    };
    getRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });


};

// Dans votre fichier IndexedDB.js
export const recupererTousLesElementsCreatives = (db, adminId) => {
  if (!adminId) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['creative'], 'readonly'); // 'workspace' est le nom de l'object store
    const store = transaction.objectStore('creative');

    // Obtenez l'index 'timestamp' dans l'object store
    const index = store.index('timestamp');

    const elements = [];

    // Ouvrez un curseur pour parcourir tous les éléments de l'object store en utilisant l'index 'timestamp'
    const cursorRequest = index.openCursor(null, 'prev'); // 'prev' pour l'ordre inverse

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        // Ajoutez chaque élément à un tableau
        const element = cursor.value;
        if (element.adminId === adminId) {
          elements.push({
            adminId: element.adminId,
            projet_name: element.projet_name,
            imageUrl: element.imageUrl,
            images_blob: element.images_blob,
            type: element.type,
          });
        }
        cursor.continue();
      } else {
        // Lorsque le curseur atteint la fin, résolvez la promesse avec le tableau d'éléments
        resolve(elements);
      }
    };

    cursorRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const chercherElementCreative = (db, elementId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['creative'], 'readonly');
    const store = transaction.objectStore('creative');

    const request = store.get(elementId);

    request.onsuccess = (event) => {
      const element = event.target.result;
      if (element) {
        // L'élément a été trouvé, résolvez la promesse avec l'élément
        resolve(element);
      } else {
        // L'élément n'a pas été trouvé, résolvez la promesse avec null ou un autre indicateur
        resolve(null);
      }
    };

    request.onerror = (event) => {
      // Une erreur s'est produite lors de la recherche, rejetez la promesse avec l'erreur
      reject(event.target.error);
    };
  });
};