const getID = (id) => {
  return document.getElementById(id);
};

export function handleOpenModalbox(idbox) {
  getID(idbox).style.display = "flex";
}

export function handleModalNavSlide(mode, idbox, body, content) {
  if (mode) {
    getID(idbox).style.display = "flex";
    getID(body).style.animation = "openSlideNav 0.75s normal";
    setTimeout(() => {
      getID(body).style.height = "20%";
      getID(content).style.display = "block";
    }, 750);
  } else {
    getID(content).style.display = "none";
    getID(body).style.animation = "closeSlideNav 0.75s normal";
    setTimeout(() => {
      getID(body).style.height = "0%";
      getID(idbox).style.display = "none";
    }, 750);
  }
}
