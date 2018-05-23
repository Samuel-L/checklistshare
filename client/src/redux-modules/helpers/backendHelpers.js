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
  const promise = new Promise((resolve, reject) => {
    items.map(item => (
      axiosInstance({
        method: 'post',
        url: '/checklists/items/',
        data: {
          List: listId,
          name: item.name,
        },
      })
        .catch((error) => {
          reject(error);
        })
    ), resolve(true));
  });

  return promise;
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

export const deleteItemsFromBackend = (items) => {
  const promise = new Promise((resolve, reject) => {
    items.forEach((item) => {
      axiosInstance({
        method: 'delete',
        url: `/checklists/items/${item.id}/`,
      })
        .catch((error) => {
          reject(error);
        });
    }, resolve(true));
  });

  return promise;
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
