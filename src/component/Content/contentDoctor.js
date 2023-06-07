import { useState } from "react";
import { handleOpenModalbox } from "../config/modalConfig";
import ModalBox from "../modal/modalBox";

const ContentDoctor = (props) => {
  const [statusCloseModal, setStatusCloseModal] = useState(false);

  const getDocId = (id) => {
    return document.getElementById(id);
  };

  const contentInmodal = () => {
    return (
      <div
        className="contentInbodyModalBox"
        onClick={() => {
          getDocId("boxDropdownTTL").style.display = "none";
        }}
      >
        <div className="header-inboxModal">
          <span>{"เพิ่มข้อมูล อาจารย์"}</span>
        </div>
        <div className="body-content-inboxModal">
          <form className="form-contentInboxModal">
            <div className="box-input-contentInboxModal">
              <span>{"Username :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"คำนำหน้า :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"คำนำหน้า :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
                <button
                  className="btndropdown-ttl-contentInboxModal"
                  type="button"
                  onClick={() => {
                    console.log("โชว์ดรอปดาว");
                    getDocId("boxDropdownTTL").style.display = "block";
                  }}
                >
                  <i className="bi-caret-down"></i>
                </button>
                <div
                  className="dropDown-ttl-contentInboxModal"
                  id="boxDropdownTTL"
                >
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"ผศ.นพ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"ผศ.พญ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"รศ.ดร.พญ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"รศ.นพ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"รศ.พญ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"ศ.ดร.พญ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"ศ.นพ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"ศ.นญ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"อ.นพ."}</span>
                  </div>
                  <div className="infoTtl-dropdown-contentInboxModal">
                    <span>{"อ.พญ."}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"ชื่อ :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"นามสกุล :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"เพศ :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="radio-btn-InboxModal">
                  <input type="radio" value={"male"}></input>
                  <span>{"ชาย"}</span>
                  <input type="radio" value={"female"}></input>
                  <span>{"หญิง"}</span>
                </div>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"PIN :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
                <button><i></i></button>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"เริ่ม :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <span>{"หยุด :"}</span>
              <div className="contentboxInput-InboxModal">
                <input type="text"></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="body-content-ctDoctor">
      <div className="nav-content-ctDoctor">
        <div className="box-nav-content">
          <span>{"ข้อมูล อาจารย์"}</span>
        </div>
        <div className="nav-box-search">
          <span>{"ค้นหา"}</span>
          <input type="text" className="input-navDoctor-search"></input>
          <button type="button" className="btn-navDoctor-search">
            <i className="bi-search"></i>
          </button>
        </div>
        <div className="box-nav-content">
          <button type="button" className="btn-close-ctDoctor">
            {"ปิด"}
          </button>
        </div>
      </div>
      <div className="content-ctDoctor">
        <div className="content-table">
          <table className="table-show-info">
            <thead>
              <tr>
                <th>เลขที่ใบประกอบ</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>PIN</th>
                <th>เริ่ม</th>
                <th>สิ้นสุด</th>
                <th>Email</th>
                <th>Line</th>
                <th>แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width={100}>{"34143"}</td>
                <td width={80}>{"ผศ.พญ."}</td>
                <td width={150}>{"จุฬาลักษณ์"}</td>
                <td width={150}>{"ตั้งมั่นคงวรกูล"}</td>
                <td width={80}>{"******"}</td>
                <td width={150}>{"00-00-0000"}</td>
                <td width={150}>{"00-00-0000"}</td>
                <td width={200}>{"test_email_long@gmail.com"}</td>
                <td width={200}>{"Line@testingLine"}</td>
                <td width={50}>
                  <button>
                    <i className="bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content-menu">
          <div className="box-menu-contentDoctor">
            <button
              type="button"
              className="content-menu-btn"
              onClick={() => {
                handleOpenModalbox("boxModal");
              }}
            >
              {"เพิ่ม"}
            </button>
            <button type="button" className="content-menu-btn">
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
      <ModalBox
        content={contentInmodal()}
        statusClose={setStatusCloseModal}
      ></ModalBox>
    </div>
  );
};

export default ContentDoctor;
