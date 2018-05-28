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
