import { useState } from "react";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";

const ContentSetting = () => {
  const [statusCloseModalSetting, setStatusCloseModalSetting] = useState(false);
  const [statusCloseModalAdddoc, setStatusCloseModalAdddoc] = useState(false);

  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const handleContentModalSetting = () => {
    return (
      <div className="bodymodal-contentSetting">
        <div className="rowbox-contentSetting">
          <button
            className="btn-addreportDoc"
            type="button"
            onClick={() => {
              console.log("OMG");
              handleOpenModalbox("modalAddDocument");
            }}
          >
            {"เพิ่มแบบประเมิน"}
          </button>
          <button className="btn-addreportDoc" type="button">
            {"เพิ่มแบบประเมิน"}
          </button>
          <button className="btn-addreportDoc" type="button">
            {"เพิ่มแบบประเมิน"}
          </button>
        </div>
      </div>
    );
  };

  const handleContentmodalAdddoc = () => {
    return (
      <div>
        <div>
          <h1>{"addDocument"}</h1>
        </div>
      </div>
    );
  };

  return (
    <div className="body-contentSetting">
      <div className="header-nav-contentSetting">
        <div className="boxCol-navheader">
          <div className="btn-boxHeader">
            <button type="button">{"เพิ่มเอกสาร"}</button>
            <button type="button">{"เพิ่มรายละเอียด"}</button>
            <button type="button">{"ลบรายละเอียด"}</button>
          </div>
        </div>
        <div className="boxCol-navheader">
          <button
            className="btn-nav-menuopen"
            id="btnOpenNavmenu"
            type="button"
          >
            {"ปิด"}
          </button>
        </div>
      </div>
      <div className="content-contentSetting">
        <div className="box-table-type"></div>
      </div>
      <ModalBox
        idbox={"modalsetting-contentsetting"}
        statusClose={setStatusCloseModalSetting}
        content={handleContentModalSetting()}
      ></ModalBox>
      <ModalBox
        idbox={"modalAddDocument"}
        statusClose={setStatusCloseModalAdddoc}
        content={handleContentmodalAdddoc()}
      ></ModalBox>
    </div>
  );
};
export default ContentSetting;
