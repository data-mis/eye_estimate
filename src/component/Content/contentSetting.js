import { useState } from "react";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";

const ContentSetting = () => {
  const [statusCloseMDLeditHDdoc, setStatusCloseMDLeditHDdoc] = useState(false);
  const [statusCloseModalAdddoc, setStatusCloseModalAdddoc] = useState(false);

  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const handleAddDocument = () => {
    return (
      <div className="body-contentsetting-modal">
        <div className="title-contentsetting-modal">
          <div className="title-center">
            <span>{"เพิ่มข้อมูล แบบประเมิน"}</span>
          </div>
        </div>
        <div className="info-contentsetting-modal">
          <div className="row-infoContentsetting-modal">
            <span>{"ชื่อ"}</span>
            <input type="text"></input>
          </div>
          <div className="middle-infoContentsetting-modal">
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"เริ่ม"}</span>
              <input type="date"></input>
            </div>
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"สิ้นสุด"}</span>
              <input type="date"></input>
            </div>
          </div>
          <div className="btnsubmit-infoContentsetting-modal">
            <button type="button">{"บันทึก"}</button>
          </div>
        </div>
      </div>
    );
  };

  const handleContentEditHeadertype = () => {
    return (
      <div className="body-contentsetting-modal">
        <div className="title-contentsetting-modal">
          <div className="title-center">
            <span>{"แก้ไขข้อมูล แบบประเมิน"}</span>
          </div>
        </div>
        <div className="info-contentsetting-modal">
          <div className="row-infoContentsetting-modal">
            <span>{"ชื่อ"}</span>
            <input type="text"></input>
          </div>
          <div className="middle-infoContentsetting-modal">
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"เริ่ม"}</span>
              <input type="date"></input>
            </div>
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"สิ้นสุด"}</span>
              <input type="date"></input>
            </div>
          </div>
          <div className="btnsubmit-infoContentsetting-modal">
            <button type="button">{"บันทึก"}</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="body-contentSetting">
      <div className="header-nav-contentSetting">
        <div className="boxCol-navheader">
          <div className="btn-boxHeader">
            <button
              type="button"
              onClick={() => {
                handleOpenModalbox("modalAddDocument");
              }}
            >
              {"เพิ่มเอกสาร"}
            </button>
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
      <div className="moblie-contentSetting">
        {/* ส่วนของชนิดการประเมิน */}
        <div className="box-table-type">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info" style={{ width: "800px" }}>
              <thead>
                <tr>
                  <th>{"ชื่อ"}</th>
                  <th>{"เริ่ม"}</th>
                  <th>{"ถึง"}</th>
                  <th>{"แก้ไข"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width={250}>{"(ชื่อ)"}</td>
                  <td width={150}>{"(เริ่ม)"}</td>
                  <td width={150}>{"(ถึง)"}</td>
                  <td width={100}>
                    <button
                      className="btn-edit-tableShowinfo"
                      type="button"
                      onClick={() => {
                        handleOpenModalbox("modalEditheaderTypeSetting");
                      }}
                    >
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ส่วนหัวข้อเรื่อง */}
        <div className="nav-boxtable-type">
          <span>{"header"}</span>
          <button type="button">{"เพิ่ม Header"}</button>
          <button type="button">{"ลบ Header"}</button>
        </div>
        <div className="box-table-type">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info" style={{ width: "450px" }}>
              <thead>
                <tr>
                  <th>{"ชื่อ"}</th>
                  <th>{"ชนิด"}</th>
                  <th>{"ลำดับ"}</th>
                  <th>{"บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width={250}>{"(ชื่อ)"}</td>
                  <td width={50}>{"(ชนิด)"}</td>
                  <td width={50}>{"(ลำดับ)"}</td>
                  <td width={80}>
                    <button className="btn-edit-tableShowinfo" type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ส่วนแสดงรายละเอียดหัวข้อต่างๆ */}
        <div className="box-table-detail">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info">
              <thead>
                <tr>
                  <th>{"รายละเอียด"}</th>
                  <th>{"score"}</th>
                  <th>{"R.score"}</th>
                  <th>{"type"}</th>
                  <th>{"บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <textarea className="textarea-input-contentSetting"></textarea>
                  </td>
                  <td>
                    <input
                      className="input-edit-tableShowinfo"
                      type="text"
                    ></input>
                  </td>
                  <td>
                    <input
                      className="input-edit-tableShowinfo"
                      type="text"
                    ></input>
                  </td>
                  <td>
                    <input
                      className="input-edit-tableShowinfo"
                      type="text"
                    ></input>
                  </td>
                  <td>
                    <button className="btn-edit-Detail">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ส่วนระดับคะแนนตัวเลือกที่จะประเมิน */}
        <div className="nav-boxtable-type">
          <span>{"ตัวเลือก"}</span>
          <button type="button">{"เพิ่มตัวเลือก"}</button>
          <button type="button">{"ลบตัวเลือก"}</button>
        </div>
        <div className="box-table-type">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info">
              <thead>
                <tr>
                  <th>{"ตัวเลือก"}</th>
                  <th>{"คะแนน"}</th>
                  <th>{"ลำดับ"}</th>
                  <th>{"type"}</th>
                  <th>{"บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"(ตัวเลือก)"}</td>
                  <td>{"(คะแนน)"}</td>
                  <td>{"(ลำดับ)"}</td>
                  <td>{"(type)"}</td>
                  <td>
                    <button className="btn-edit-tableShowinfo" type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* หมายเหตุ */}
        <div className="box-table-type">
          <div className="nav-boxtable-type">
            <span>{"หมายเหตุ"}</span>
          </div>
          <textarea className="textarea-contentSetting"></textarea>
        </div>
      </div>
      <div className="normal-contentSetting">
        <div className="col-normal-contentSetting">
          {/* ส่วนของชนิดการประเมิน */}
          <div className="normal-table-type">
            <div className="tablebox-normaltabletype">
              <table className="table-show-info" style={{ width: "650px" }}>
                <thead>
                  <tr>
                    <th>{"ชื่อ"}</th>
                    <th>{"เริ่ม"}</th>
                    <th>{"ถึง"}</th>
                    <th>{"แก้ไข"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={250}>{"(ชื่อ)"}</td>
                    <td width={150}>{"(เริ่ม)"}</td>
                    <td width={150}>{"(ถึง)"}</td>
                    <td width={100}>
                      <button
                        className="btn-edit-tableShowinfo"
                        type="button"
                        onClick={() => {
                          handleOpenModalbox("modalEditheaderTypeSetting");
                        }}
                      >
                        <i className="bi-three-dots"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="nav-boxtable-type">
            <span>{"Header"}</span>
            <button type="button">{"เพิ่ม Header"}</button>
            <button type="button">{"ลบ Header"}</button>
          </div>
          {/* ส่วนหัวข้อเรื่อง */}
          <div className="normal-table-type">
            <div className="tablebox-normaltabletype">
              <table className="table-show-info" style={{ width: "650px" }}>
                <thead>
                  <tr>
                    <th>{"ชื่อ"}</th>
                    <th>{"ชนิด"}</th>
                    <th>{"ลำดับ"}</th>
                    <th>{"บันทึก"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={250}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={150}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={150}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={100}>
                      <button
                        className="input-editnormal-tableShowinfo"
                        type="button"
                      ></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* หมายเหตุ */}
          <div className="boxnormal-table-type">
            <div className="nav-boxtable-type">
              <span>{"หมายเหตุ"}</span>
            </div>
            <textarea className="textarea-contentSetting"></textarea>
          </div>
        </div>
        <div className="col-normal-contentSetting">
          {/* รายละเอียด */}
          <div className="normal-middle-tabletype">
            <div className="tablebox-normaltabletype">
              <table className="table-show-info">
                <thead>
                  <tr>
                    <th>{"รายละเอียด"}</th>
                    <th>{"Score"}</th>
                    <th>{"R.score"}</th>
                    <th>{"Type"}</th>
                    <th>{"แก้ไข"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <textarea className="textarea-input-contentSetting"></textarea>
                    </td>
                    <td>
                      <input
                        className="input-edit-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td>
                      <input
                        className="input-edit-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td>
                      <input
                        className="input-edit-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td>
                      <button className="btn-edit-Detail" type="button">
                        <i className="bi-three-dots"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="nav-boxtable-type">
            <span>{"ตัวเลือก"}</span>
            <button type="button">{"เพิ่ม ตัวเลือก"}</button>
            <button type="button">{"ลบ ตัวเลือก"}</button>
          </div>
          {/* ส่วนระดับคะแนนตัวเลือกที่จะประเมิน */}
          <div className="normal-table-type">
            <div className="tablebox-normaltabletype">
              <table className="table-show-info" style={{ width: "650px" }}>
                <thead>
                  <tr>
                    <th>{"ตัวเลือก"}</th>
                    <th>{"คะแนน"}</th>
                    <th>{"ลำดับ"}</th>
                    <th>{"type"}</th>
                    <th>{"บันทึก"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={250}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={100}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={100}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={100}>
                      <input
                        className="input-editnormal-tableShowinfo"
                        type="text"
                      ></input>
                    </td>
                    <td width={100}>
                      <button type="button" className="btn-edit-tableShowinfo">
                        <i className="bi-three-dots"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalBox
        idbox="modalAddDocument"
        statusClose={setStatusCloseModalAdddoc}
        content={handleAddDocument()}
      ></ModalBox>
      <ModalBox
        idbox={"modalEditheaderTypeSetting"}
        statusClose={setStatusCloseMDLeditHDdoc}
        content={handleContentEditHeadertype()}
      ></ModalBox>
    </div>
  );
};
export default ContentSetting;
