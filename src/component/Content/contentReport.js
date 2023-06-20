import { useState } from "react";

const ContentReport = () => {
  const [statusDropdowngrp, setStatusDropdowngrp] = useState(true);
  const [radioPGpoint, setRadioPGpoint] = useState("");

  const docGetid = (id) => {
    return document.getElementById(id);
  };

  const handledropopen = (id) => {
    if (statusDropdowngrp) {
      setStatusDropdowngrp(false);
      docGetid(id).style.display = "block";
      docGetid("tbMaincontentreport").style.position = "static";
      docGetid("tbHeadMaincontentreport").style.position = "static";
    } else {
      setStatusDropdowngrp(true);
      docGetid(id).style.display = "none";
      docGetid("tbMaincontentreport").style.position = "relative";
      docGetid("tbHeadMaincontentreport").style.position = "sticky";
    }
  };

  return (
    <div className="body-content-contentReport">
      <div className="headercontent-contentReport">
        <div className="headercontentreport-title">
          <span>{"รายงาน"}</span>
        </div>
        <div className="headercontentreport-inputbox">
          <span>{"ปี"}</span>
          <input className="inputyear-contentreport" type="number"></input>
          <div className="button-updownbox-contentreport">
            <button className="btn-updown-contentreport" type="button">
              <i className="bi-caret-up"></i>
            </button>
            <button className="btn-updown-contentreport" type="button">
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        <div className="group-contentreport">
          <span>{"กลุ่ม"}</span>
          <div className="boxrelative-group">
            <input type="text"></input>
            <button
              type="button"
              onClick={() => {
                handledropopen("dropgroupContentreport");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropgroup-contentreport"
              id="dropgroupContentreport"
            ></div>
          </div>
        </div>
        <div className="buttonbox-allofthis">
          <button>{"งานทั้งหมด"}</button>
        </div>
      </div>
      <div className="menu-search-contentreport">
        <div className="box-inputsearch-contentreport">
          <span>{"ค้นหา"}</span>
          <input type="text"></input>
          <button type="button">
            <i className="bi-search"></i>
          </button>
        </div>
      </div>
      <div className="content-contentreport">
        <div className="tableboxbody-contentreport">
          <table className="table-show-info" id="tbMaincontentreport">
            <thead id="tbHeadMaincontentreport">
              <tr>
                <th>{"รหัส นศ."}</th>
                <th>{"ชื่อ"}</th>
                <th>{"นามสกุล"}</th>
                <th>{"GRP"}</th>
                <th>{"อ.ที่ปรึกษา"}</th>
                <th>{"MCQ"}</th>
                <th>{"OSCE"}</th>
                <th>{"MEQ"}</th>
                <th>{"Rep."}</th>
                <th>{"PN."}</th>
                <th>{"OPD"}</th>
                <th>{"Ward"}</th>
                <th>{"Ward"}</th>
                <th>{"case1"}</th>
                <th>{"case2"}</th>
                <th>{"book"}</th>
                <th>{"Tot."}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"(รหัส นศ.)"}</td>
                <td>{"(ชื่อ)"}</td>
                <td>{"(นามสกุล)"}</td>
                <td>{"(GRP)"}</td>
                <td>{"(อ.ที่ปรึกษา)"}</td>
                <td>{"(MCQ)"}</td>
                <td>{"(OSCE)"}</td>
                <td>{"(MEQ)"}</td>
                <td>{"(Rep.)"}</td>
                <td>{"(PN.)"}</td>
                <td>{"(OPD)"}</td>
                <td>{"(Ward)"}</td>
                <td>{"(Ward)"}</td>
                <td>{"(case1)"}</td>
                <td>{"(case2)"}</td>
                <td>{"(book)"}</td>
                <td>{"(Tot.)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="menuright-contentreport">
          <div className="box-radioinput-menuright">
            <div className="inputradio-menuright">
              <input type="radio" value={"point"}></input>
              <span>{"คะแนน"}</span>
            </div>
            <div className="inputradio-menuright">
              <input type="radio" value={"Grad"}></input>
              <span>{"เกรด"}</span>
            </div>
          </div>
          <div className="btninfo-menuright">
            <button type="button">{"ดึงข้อมูล"}</button>
          </div>
          <div className="btninfo-menuright">
            <button type="button">
              <i className="bi-filetype-xlsx"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentReport;
