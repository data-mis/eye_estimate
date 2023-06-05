import { useEffect, useState } from "react";
import ContentStudent from "./Content/contentStudent";
import ModalSlideBar from "./modal/modalSlideBar";
import Cookies, { Cookie } from "universal-cookie";
import { TryCheckCookie, checkCookieOut } from "./config/cookieConfig";
import { useNavigate } from "react-router-dom";
import ContentDoctor from "./Content/contentDoctor";

const NavigationPage = () => {
  const cookie = new Cookies();
  const navigat = useNavigate();

  const [modeContent, setModeContent] = useState("");
  const [openModalSlide, setOpenModalSlide] = useState(true);
  const [dataContent, setDataContent] = useState();

  const docGetId = (id) => {
    return document.getElementById(id);
  };

  //ลบCssรูปแบบปุ่มออก ตอนเลือกเมนู
  const removeholdbtnmenu = (e) => {
    e.preventDefault();

    for (
      let i = 0;
      i < document.getElementsByClassName("navigatMenuBTN").length;
      i++
    ) {
      document
        .getElementsByClassName("navigatMenuBTN")
        [i].classList.remove("holdBTNmenuNavigatepage");
    }
  };

  //โชว์ข้อมูลการทำงานตามเมนูที่เลือก เขียนเป็น case
  const ShowContentINbox = (content) => {
    let colorBorder = "#546e7a";
    let colorBG = "#37474f";
    let colorText = "#b0bec5";

    switch (content) {
      case "student":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");

        return <ContentStudent></ContentStudent>;

      case "doctor":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");

        return <ContentDoctor></ContentDoctor>;
      default:
        return (
          <div className="body-mainDefault">
            <div className="header-mainDefault">
              <h1>{"Version 0.1"}</h1>
            </div>
          </div>
        );
    }
  };

  // modalMenu Mobile
  const handleOpenModalMenu = (status) => {
    if (status) {
      docGetId("modalSlideBody").style.display = "block";
      docGetId("modalSlideContent").style.animation =
        "openSlideBar 0.75s normal";
      docGetId("modalSlideContent").style.height = "auto";
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
        docGetId("btn-threeDots").style.display = "none";
        docGetId("btn-x").style.display = "block";
      }, 600);
    } else {
      docGetId("modalSlideContent").style.animation =
        "closeSlideBar 0.75s normal";
      docGetId("modalSlideContent").style.height = "0";
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
        docGetId("btn-x").style.display = "none";
        docGetId("btn-threeDots").style.display = "block";
      }, 750);
      setOpenModalSlide(true);
    }
  };

  useEffect(() => {
    if (!checkCookieOut()) {
      return navigat("/");
    }
  }, []);

  useEffect(() => {}, [dataContent]);

  return (
    <div
      className="body-content-navigatepage"
      onClick={(e) => {
        if (e.target === docGetId("modalSlideBody")) {
          handleOpenModalMenu(false);
        }
      }}
    >
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
              className="navigatMenuBTN"
              id="btnMenu-student"
              type="button"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("student");
              }}
            >
              {"นศพ."}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button
              className="navigatMenuBTN"
              id="btnMenu-doctor"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("doctor");
              }}
            >
              {"อาจารย์"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-groupStudent" className="navigatMenuBTN">
              {"กลุ่ม"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-workDoctor" className="navigatMenuBTN">
              {"งานอาจารย์"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-assessmentForm" className="navigatMenuBTN">
              {"ตั้งค่าแบบประเมิน"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button id="btnMenu-report" className="navigatMenuBTN">
              {"รายงาน"}
            </button>
          </div>
        </div>
        <div className="show-content-box">{ShowContentINbox(modeContent)}</div>
      </div>
      <ModalSlideBar settingContent={setModeContent}></ModalSlideBar>
    </div>
  );
};
export default NavigationPage;
