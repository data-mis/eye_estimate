import { Icon } from "@iconify/react";

const ModalSlideBar = (prop) => {
  return (
    <div className="modal-slideBar-body" id="modalSlideBody">
      <div className="modal-slideBar-content" id="modalSlideContent">
        <div className="modalSlideBar-content-menu">
          <button
            id="btnMenu-Modalstudent"
            onClick={() => {
              prop.settingContent("student");
            }}
          >
            <Icon icon="mdi:account-school"></Icon>
          </button>
          <button id="btnMenu-ModalDoctor">
            <Icon icon="fontisto:doctor"></Icon>
          </button>
          <button id="btnMenu-ModalGroup">
            <Icon icon="el:group"></Icon>
          </button>
          <button id="btnMenu-ModalList">
            <Icon icon="ep:list"></Icon>
          </button>
          <button id="btnMenu-ModalSetting">
            <Icon icon="uil:setting"></Icon>
          </button>
          <button id="btnMenu-ModalReport">
            <Icon icon="mdi:file-outline"></Icon>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalSlideBar;
