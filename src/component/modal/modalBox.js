const ModalBox = (props) => {
  const { idbox, content, thisTitle, styleconfigbody, styleconfignav } = props;
  const handleCloseModalBox = () => {
    document.getElementById(idbox).style.display = "none";
    props.statusClose(true);
  };

  return (
    <div className="modal-box" id={idbox}>
      <div className="modal-box-body" style={styleconfigbody}>
        <nav className="header-nav-modalBox" style={styleconfignav}>
          <div className="header-col">
            <span>{thisTitle}</span>
          </div>
          <div className="header-col">
            <button
              type="button"
              className="btn-modalbox-close"
              id={`thisbtnModalboxClose-${idbox}`}
              onClick={() => {
                handleCloseModalBox();
              }}
            >
              <i className="bi-x-circle" id="closeModalbox"></i>
            </button>
          </div>
        </nav>
        <div className="content-modal-box">{content}</div>
      </div>
    </div>
  );
};
export default ModalBox;
