const ModalBox = (props) => {
  const handleCloseModalBox = () => {
    document.getElementById(props.idbox).style.display = "none";
    props.statusClose(true);
  };

  return (
    <div className="modal-box" id={`${props.idbox}`}>
      <div className="modal-box-body">
        <nav className="header-nav-modalBox">
          <div className="header-col">
            <span>{props.thisTitle}</span>
          </div>
          <div className="header-col">
            <button
              type="button"
              className="btn-modalbox-close"
              id="thisbtnModalboxClose"
              onClick={() => {
                handleCloseModalBox();
              }}
            >
              <i className="bi-x-circle" id="closeModalbox"></i>
            </button>
          </div>
        </nav>
        <div className="content-modal-box">{props.content}</div>
      </div>
    </div>
  );
};
export default ModalBox;
