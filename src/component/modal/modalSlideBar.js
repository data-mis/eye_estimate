import { Icon } from "@iconify/react";

const ModalSlideBar = (prop) => {
  return (
    <div className="modal-slideBar-body" id="modalSlideBody">
      <div className="modal-slideBar-content" id="modalSlideContent">
        <div className="modalSlideBar-content-menu">
          <button
            type="button"
            id="btnMenu-Modalstudent"
            onClick={() => {
              prop.settingContent("student");
            }}
          >
            <Icon icon="mdi:account-school"></Icon>
          </button>
          <button
            id="btnMenu-ModalDoctor"
            type="button"
            onClick={() => {
              prop.settingContent("doctor");
            }}
          >
            <Icon icon="fontisto:doctor"></Icon>
          </button>
          <button
            id="btnMenu-ModalGroup"
            type="button"
            onClick={() => {
              prop.settingContent("groupStudent");
            }}
          >
            <Icon icon="el:group"></Icon>
          </button>
          <button
            id="btnMenu-ModalList"
            type="button"
            onClick={() => {
              prop.settingContent("workDoctor");
            }}
          >
            <Icon icon="ep:list"></Icon>
          </button>
          <button id="btnMenu-ModalSetting" type="button" onClick={() => {
            prop.settingContent("assessmentForm")
          }}>
            <Icon icon="uil:setting"></Icon>
          </button>
          <button id="btnMenu-ModalReport" type="button">
            <Icon icon="mdi:file-outline"></Icon>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalSlideBar;
