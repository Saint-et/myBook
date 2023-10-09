import { useState } from "react";


export const IndexedDB = () => {

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pic-v', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Créez un objectStore (collection) pour stocker vos données
      const objectStore = db.createObjectStore('workspace', { keyPath: 'id' });

      // Définissez l'index 'timestamp' dans l'objectStore
      objectStore.createIndex('timestamp', 'timestamp', { unique: false });

      // Vous pouvez également définir d'autres index si nécessaire
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


// Dans votre fichier IndexedDB.js
export const recupererTousLesElements = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readonly'); // 'workspace' est le nom de l'object store
    const store = transaction.objectStore('workspace');

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
        elements.push({
          id: element.id,
          name: element.name,
          miniature: element.miniature,
          type: element.type,
        });
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



export const ajouterElement = (db, nouvelElement) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['workspace'], 'readwrite');
    const store = transaction.objectStore('workspace');

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