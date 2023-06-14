import { useState } from "react";
import { handleModalNavSlide, handleOpenModalbox } from "../config/modalConfig";
import ModalNavSlide from "../modal/modalNavSlide";

const ContentWork = () => {
  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const [openfilter, setOpenfilter] = useState(false);

  return (
    <div className="body-contentwork">
      <div className="header-contentwork">
        <div className="box-textheader-contentwork">
          <h3>{`จัดกลุ่มงานประเมิน`}</h3>
          <button
            className="btn-menu-filter"
            type="button"
            id="btnfilterWork"
            style={!openfilter ? {} : { display: "none" }}
            onClick={() => {
              setOpenfilter(true);
              handleModalNavSlide(
                true,
                "NavSlideMOdal",
                "bodyNavslideModal",
                "contentNavslideModle"
              );
            }}
          >
            <i className="bi-funnel i-btn-filter"></i>
          </button>
          <button
            className="close-btn-menu-filter"
            id="btnclosefilterwork"
            style={openfilter ? { display: "block" } : { display: "none" }}
            type="button"
            onClick={() => {
              setOpenfilter(false);
              handleModalNavSlide(
                false,
                "NavSlideMOdal",
                "bodyNavslideModal",
                "contentNavslideModle"
              );
            }}
          >
            <i className="bi-x-lg i-btn-filter"></i>
          </button>
        </div>
        <div className="box-btnclosebody-contentwork">
          <button className="btn-closebody-contentwork">{"ปิด"}</button>
        </div>
      </div>
      <div className="menu-nav-contentwork">
        {/* menu year */}h
        <div className="contentwork-year">
          <span>{"ปี"}</span>
          <input type="number" className="input-year-contentwork"></input>
          <div className="box-buttonUPDOWN">
            <button className="this-up-year">
              <i className="bi-caret-up"></i>
            </button>
            <button className="this-down-year">
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        {/* menu month */}
        <div className="contentwork-month">
          <span>{"เดือน"}</span>
          <input type="text" className="input-month-contentwork"></input>
          <button className="this-month-drop">
            <i className="bi-caret-down"></i>
          </button>
          <div className="dropinfo-monthContentwork"></div>
        </div>
        {/* menu group */}
        <div className="contentwork-group">
          <span>{"กรองตามกลุ่ม"}</span>
          <input type="text" className="input-group-contentwork"></input>
          <button className="this-group-drop">
            <i className="bi-caret-down"></i>
          </button>
        </div>
        {/* menu buttonAll */}
        <div className="contentwork-buttonAll">
          <button type="button">{"งานทั้งหมด"}</button>
        </div>
        {/* menu radiobtn */}
        <div className="this-radiobtn-contentwork">
          <div className="row-radiobtn">
            <input type="radio"></input>
            <span>{"ทั้งหมด"}</span>
          </div>
          <div className="row-radiobtn">
            <input type="radio"></input>
            <span>{"ค้างประเมิน"}</span>
          </div>
          <div className="row-radiobtn">
            <input type="radio"></input>
            <span>{"ประเมินแล้ว"}</span>
          </div>
        </div>
      </div>
      <div className="boxcontent-contentwork">
        <div className="box-content">
          <div className="row-info-contentwork">
            <div className="col-info-contentwork">
              <table className="table-show-info" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>{"งานประเมิน"}</th>
                    <th>{"ประเภท"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={"90%"}>{"(งานประเมิน)"}</td>
                    <td width={"10%"}>{"(ประเภท)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-info-contentwork">
              <div className="title-info-contentwork">
                <span>{"Case&Topic ผู้นำเสนอ"}</span>
              </div>
              <div className="infoBoxcol-relative-contentwork">
                <table className="table-show-info">
                  <thead>
                    <tr>
                      <th>{"วันที่"}</th>
                      <th>{"เวลา"}</th>
                      <th>{"กลุ่ม"}</th>
                      <th>{"อาจารย์"}</th>
                      <th>{"นักศึกษา"}</th>
                      <th>{"UP"}</th>
                      <th>{"C"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"(วันที่)"}</td>
                      <td>{"(เวลา)"}</td>
                      <td>{"(กลุ่ม)"}</td>
                      <td>{"(อาจารย์)"}</td>
                      <td>{"(นักศึกษา)"}</td>
                      <td>{"(UP)"}</td>
                      <td>{"(C)"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="title-header-contentwork">
            <h4>{"รายละเอียดงานของอาจารย์"}</h4>
          </div>
          <div className="row-info-contentwork"></div>
        </div>
        <div className="box-content">
          <div className="boxcontent-btnmenu-contentwork">
            <button className="btn-menu-contentwork" type="button">
              {"เพิ่ม"}
            </button>
          </div>
          <div className="boxcontent-btnmenu-contentwork">
            <button className="btn-menu-contentwork" type="button">
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
      <ModalNavSlide></ModalNavSlide>
    </div>
  );
};
export default ContentWork;
