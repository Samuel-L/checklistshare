import { axiosInstance } from '../../utils/axios-helpers';

export const createListOnBackend = (title) => {
  const promise = new Promise((resolve, reject) => {
    axiosInstance({
      method: 'post',
      url: '/checklists/lists/',
      data: {
        title,
      },
    })
     .then((response) => {
       resolve(response);
      })
     .catch((error) => {
       reject(error);
     });
  });

  return promise;
};

export const createItemsOnBackend = (listId, items) => {
};

export const deleteItemsFromBackend = (items) => {
};

export const patchItemsOnBackend = (items) => {
};

export const patchChecklistTitleOnBackend = (listId, title) => {
};

export const getItemsToBeDeleted = (unEditedChecklist, editedChecklist) => {
  const items = unEditedChecklist.items.filter((item) => {
    let exists;

    editedChecklist.items.forEach((eItem) => {
      if (item.id === eItem.id) {
        exists = true;
      }
    });

    if (!exists) {
      return item;
    }
    return null;
  });

  return items;
};

export const getItemsToBePatched = (unEditedChecklist, editedChecklist) => {
  const items = editedChecklist.items.filter((eItem) => {
    let edited;

    unEditedChecklist.items.forEach((item) => {
      if (item.id === eItem.id) {
        if (item.name !== eItem.name) {
          edited = true;
        }
      }
    });

    if (edited) {
      return eItem;
    }
    return null;
  });

  return items;
};

export const getItemsToBeAdded = (unEditedChecklist, editedChecklist) => {
  const items = editedChecklist.items.filter((eItem) => {
    let exists;

    unEditedChecklist.items.forEach((item) => {
      if (item.id === eItem.id) {
        exists = true;
      }
    });

    if (!exists && eItem.newlyAdded) {
      return eItem;
    }
    return null;
  });

  return items;
};
