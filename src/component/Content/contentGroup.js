import ModalBox from "../modal/modalBox";

const ContentGroupStudent = (props) => {
  return (
    <div className="body-content-groupStudent">
      <div className="hander-content-groupStudent">
        <div className="col-header">
          <span>{"ข้อมูล กลุ่ม"}</span>
        </div>
        <div className="col-header box-col-year">
          <span>{"ปี"}</span>
          <input type="text" className="input-year-groupStudent"></input>
          <div className="relative-btnBox">
            <button className="yearControllup" type="button">
              <i className="bi-caret-up"></i>
            </button>
            <button className="yearControlldown" type="button">
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        <div className="col-header">
          <span>{"ค้นหา"}</span>
          <input type="text" className="input-search-groupStudent"></input>
          <button>
            <i className="bi-search"></i>
          </button>
        </div>
        <div className="col-header">
          <button type="button" className="btn-close-groupStudent">
            {"ปิด"}
          </button>
        </div>
      </div>
      <div className="content-groupStudent">
        <div className="table-box-groupStudent">
          <table className="table-show-info" style={{ width: "550px" }}>
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
                <td width={200}>{"(ชื่อ)"}</td>
                <td width={150}>{"(เริ่ม)"}</td>
                <td width={150}>{"(ถึง)"}</td>
                <td width={50}>
                  <button>
                    <i className="bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box-controll-student">
          <h3>{"นักศึกษาว่าง"}</h3>
          <div className="row-table-controll-student">
            <table className="table-show-info" style={{ width: "550px" }}>
              <thead>
                <tr>
                  <th>{"รหัส"}</th>
                  <th>{"ชื่อ"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width={150}>{"(รหัส)"}</td>
                  <td width={400}>{"(ชื่อ)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="btnAddDel-controll-student">
            <button type="button" className="btnAdd-inControllStudent">
              {"เพิ่มเข้ากลุ่ม"}
            </button>
            <button type="button" className="btnDel-incontrollStudent">
              {"ลบออกจากกลุ่ม"}
            </button>
          </div>
          <h3>{"นักศึกษาในกลุ่ม"}</h3>
          <div className="row-table-controll-student">
            <table className="table-show-info" style={{ width: "550px" }}>
              <thead>
                <tr>
                  <th>{"รหัส"}</th>
                  <th>{"ชื่อ"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width={150}>{"(รหัส)"}</td>
                  <td width={400}>{"(ชื่อ)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="box-doctorInput-ControllStudent">
            <div className="row-doctorInputControllStudent">
              <div className="row-input-doctorInputControllStudent">
                <div className="boxInRowInputControllStudent">
                  <span>{"อาจารย์"}</span>
                  <input type="text" className="input-doctorText"></input>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("doc");
                    }}
                  >
                    <i className="bi-caret-down"></i>
                  </button>
                </div>
                <div className="boxInRowInputControllStudent">
                  <span>{"MEQ"}</span>
                  <input
                    className="input-meq-ControllStudent"
                    type="text"
                  ></input>
                </div>
              </div>
              <div className="row-input-doctorInputControllStudent">
                <div className="boxInRowInputControllStudent">
                  <span>{"อาจารย์"}</span>
                  <input type="text" className="input-doctorText"></input>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("doc");
                    }}
                  >
                    <i className="bi-caret-down"></i>
                  </button>
                </div>
                <div className="boxInRowInputControllStudent">
                  <span>{"MEQ"}</span>
                  <input
                    className="input-meq-ControllStudent"
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row-doctorInputControllStudent">
              <button className="btn-submit-groupStudent" type="button">
                {"บันทึก"}
              </button>
            </div>
          </div>
          <div className="box-btnmodal-adding">
            <button className="btn-addingModal" type="button">{"บันทึก"}</button>
          </div>
        </div>
        <div className="box-menu-groupStudent">
          <div className="btn-menu-boxGroupStudent">
            <button type="button">{"เพิ่ม"}</button>
          </div>
          <div className="btn-menu-boxGroupStudent">
            <button type="button">{"ลบ"}</button>
          </div>
        </div>
      </div>
      <ModalBox></ModalBox>
    </div>
  );
};
export default ContentGroupStudent;
