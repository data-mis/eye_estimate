const ModalBox = (prop) => {
  return (
    <div className="modal-box" id="boxModal">
      <div className="modal-box-body">
        <nav className="header-nav-modalBox">
          <div className="header-col"></div>
          <div className="header-col">
            <button type="button" className="btn-modalbox-close">
              <i className="bi-x-circle" id="closeModalbox"></i>
            </button>
          </div>
        </nav>
        <div className="content-modal-box">{prop.content}</div>
      </div>
    </div>
  );
};
export default ModalBox;
