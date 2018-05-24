import axios from 'axios';

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
    const itemCreations = items.map(item => (
      axiosInstance({
        method: 'post',
        url: '/checklists/items/',
        data: {
          List: listId,
          name: item.name,
        },
      })
    ));

    axios.all(itemCreations)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const deleteItemsFromBackend = (items) => {
  const promise = new Promise((resolve, reject) => {
    const itemDeletions = items.map(item => (
      axiosInstance({
        method: 'delete',
        url: `/checklists/items/${item.id}/`,
      })
    ));

    axios.all(itemDeletions)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const patchItemsOnBackend = (items) => {
  const promise = new Promise((resolve, reject) => {
    const itemPatches = items.map(item => (
      axiosInstance({
        method: 'patch',
        url: `/checklists/items/${item.id}/`,
        data: {
          name: item.name,
        },
      })
    ));

    axios.all(itemPatches)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const patchChecklistTitleOnBackend = (listId, title) => {
  const promise = new Promise((resolve, reject) => {
    axiosInstance({
      method: 'patch',
      url: `/checklists/lists/${listId}/`,
      data: {
        title,
      },
    })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};
