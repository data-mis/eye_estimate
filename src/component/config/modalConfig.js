const getID = (id) => {
  return document.getElementById(id);
};

export function handleOpenModalbox(idbox) {
    getID(idbox).style.display = "flex";
}
