import { Icon } from "@iconify/react";

const ModalSlideBar = (props) => {
  return (
    <div className="modal-slideBar-body" id="modalSlideBody">
      <div className="modal-slideBar-content" id="modalSlideContent">
        <div className="modalSlideBar-content-menu">
          <button
            type="button"
            id="btnMenu-Modalstudent"
            onClick={() => {
              props.settingContent("student");
              props.close(true);
            }}
          >
            <Icon icon="mdi:account-school"></Icon>
          </button>
          <button
            id="btnMenu-ModalDoctor"
            type="button"
            onClick={() => {
              props.settingContent("doctor");
              props.close(true);
            }}
          >
            <Icon icon="fontisto:doctor"></Icon>
          </button>
          <button
            id="btnMenu-ModalGroup"
            type="button"
            onClick={() => {
              props.settingContent("groupStudent");
              props.close(true);
            }}
          >
            <Icon icon="el:group"></Icon>
          </button>
          <button
            id="btnMenu-ModalList"
            type="button"
            onClick={() => {
              props.settingContent("workDoctor");
              props.close(true);
            }}
          >
            <Icon icon="ep:list"></Icon>
          </button>
          <button
            id="btnMenu-ModalSetting"
            type="button"
            onClick={() => {
              props.settingContent("assessmentForm");
              props.close(true);
            }}
          >
            <Icon icon="uil:setting"></Icon>
          </button>
          <button
            id="btnMenu-ModalReport"
            type="button"
            onClick={() => {
              props.settingContent("report");
              props.close(true);
            }}
          >
            <Icon icon="mdi:file-outline"></Icon>
          </button>
          <button
            id="btnMenu-Modallogout"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.settingContent("logout");
            }}
          >
            <i className="bi-box-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalSlideBar;
