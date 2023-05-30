import { useEffect, useState } from "react";
import ContentStudent from "./Content/contentStudent";
import ModalSlideBar from "./modal/modalSlideBar";
import Cookies, { Cookie } from "universal-cookie";
import { TryCheckCookie, checkCookieOut } from "./config/cookieConfig";
import { useNavigate } from "react-router-dom";

const NavigationPage = () => {
  const cookie = new Cookies();
  const navigat = useNavigate();

  const [modeContent, setModeContent] = useState("");
  const [openModalSlide, setOpenModalSlide] = useState(true);
  const [dataContent, setDataContent] = useState();

  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const ShowContentINbox = (content) => {
    let colorBorder = "#546e7a";
    let colorBG = "#37474f";
    let colorText = "#b0bec5";

    switch (content) {
      case "student":
        docGetId(
          `btnMenu-${content}`
        ).style.border = `5px solid ${colorBorder}`;
        docGetId(`btnMenu-${content}`).style.backgroundColor = `${colorBG}`;
        docGetId(`btnMenu-${content}`).style.color = `${colorText}`;

        return <ContentStudent></ContentStudent>;

      default:
        return <div>TEST</div>;
    }
  };

  const handleOpenModalMenu = (status) => {
    if (status) {
      docGetId("modalSlideBody").style.display = "block";
      docGetId("modalSlideContent").style.animation =
        "openSlideBar 0.75s normal";
      docGetId("modalSlideContent").style.height = "auto";
      docGetId("btn-threeDots").style.display = "none";
      docGetId("btn-x").style.display = "block";
      setOpenModalSlide(false);
      setTimeout(() => {
        docGetId("btnMenu-Modalstudent").style.visibility = "visible";
      }, 100);
      setTimeout(() => {
        docGetId("btnMenu-ModalDoctor").style.visibility = "visible";
      }, 200);
      setTimeout(() => {
        docGetId("btnMenu-ModalGroup").style.visibility = "visible";
      }, 300);
      setTimeout(() => {
        docGetId("btnMenu-ModalList").style.visibility = "visible";
      }, 400);
      setTimeout(() => {
        docGetId("btnMenu-ModalSetting").style.visibility = "visible";
      }, 500);
      setTimeout(() => {
        docGetId("btnMenu-ModalReport").style.visibility = "visible";
      }, 600);
    } else {
      docGetId("modalSlideContent").style.animation =
        "closeSlideBar 0.75s normal";
      docGetId("modalSlideContent").style.height = "0";
      docGetId("btn-x").style.display = "none";
      docGetId("btn-threeDots").style.display = "block";
      setTimeout(() => {
        docGetId("btnMenu-ModalReport").style.visibility = "hidden";
      }, 10);
      setTimeout(() => {
        docGetId("btnMenu-ModalSetting").style.visibility = "hidden";
      }, 100);
      setTimeout(() => {
        docGetId("btnMenu-ModalList").style.visibility = "hidden";
      }, 200);
      setTimeout(() => {
        docGetId("btnMenu-ModalGroup").style.visibility = "hidden";
      }, 300);
      setTimeout(() => {
        docGetId("btnMenu-ModalDoctor").style.visibility = "hidden";
      }, 400);
      setTimeout(() => {
        docGetId("btnMenu-Modalstudent").style.visibility = "hidden";
      }, 500);
      setTimeout(() => {
        docGetId("modalSlideBody").style.display = "none";
      }, 750);
      setOpenModalSlide(true);
    }
  };

  window.addEventListener("click", (e) => {
    if (e.target === docGetId("modalSlideBody")) {
      docGetId("modalSlideContent").style.animation =
        "closeSlideBar 0.75s normal";
      docGetId("modalSlideContent").style.height = "0";
      docGetId("btn-x").style.display = "none";
      docGetId("btn-threeDots").style.display = "block";
      setTimeout(() => {
        docGetId("modalSlideBody").style.display = "none";
      }, 750);
      setOpenModalSlide(true);
    }
  });

  useEffect(() => {
    if (!checkCookieOut()) {
      return navigat("/");
    }
  }, []);

  useEffect(() => {}, [dataContent]);

  return (
    <div className="body-content-navigatepage">
      <div className="box-content-navigatepage">
        <div className="header-navigatepage">
          <div className="header-navigatepage-col-1">
            <span>ระบบประเมิน นศพ. ภาควิชาจักษุ </span>
          </div>
          <div className="header-navigatepage-col-2">
            <button
              className="btn-header-menuBar"
              onClick={() => {
                handleOpenModalMenu(openModalSlide);
              }}
            >
              <i className="bi-three-dots-vertical" id="btn-threeDots"></i>
              <i className="bi-x" id="btn-x"></i>
            </button>
          </div>
        </div>
        <div className="menu-navigatepage">
          <div className="btn-menu-navigatepage">
            <button
              id="btnMenu-student"
              onClick={() => {
                setModeContent("student");
              }}
            >
              {"นศพ."}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-doctor">{"อาจารย์"}</button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-groupStudent">{"กลุ่ม"}</button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-workDoctor">{"งานอาจารย์"}</button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-assessmentForm">{"ตั้งค่าแบบประเมิน"}</button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-report">{"รายงาน"}</button>
          </div>
        </div>
        <div className="show-content-box">{ShowContentINbox(modeContent)}</div>
      </div>
      <ModalSlideBar settingContent={setModeContent}></ModalSlideBar>
    </div>
  );
};
export default NavigationPage;
