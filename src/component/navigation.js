import { useEffect, useState } from "react";
import ContentStudent from "./Content/contentStudent";
import ModalSlideBar from "./modal/modalSlideBar";
import Cookies, { Cookie } from "universal-cookie";
import {
  TryCheckCookie,
  checkCookieOut,
  removeitCookie,
} from "./config/cookieConfig";
import { useNavigate } from "react-router-dom";
import ContentDoctor from "./Content/contentDoctor";
import ContentGroupStudent from "./Content/contentGroup";
import ContentWork from "./Content/contentWork";
import ContentSetting from "./Content/contentSetting";
import ContentReport from "./Content/contentReport";
import ContentFile from "./Content/contentfile";
import Swal from "sweetalert2";
import { versioncheck } from "./config/versioncheck";

const NavigationPage = () => {
  const cookie = new Cookies();
  const navigat = useNavigate();

  const [modeContent, setModeContent] = useState("");
  const [selectworkinfo, setSelectworkinfo] = useState("");
  const [statusClosemenu, setstatusClosemenu] = useState(false);
  const [openModalSlide, setOpenModalSlide] = useState(true);
  const [dataContent, setDataContent] = useState();
  const [stopprocess, setStopprocess] = useState(false);
  const [versionis, setVersionis] = useState("");
  const [checkisver, setCheckisver] = useState(null);

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

        return <ContentStudent close={setModeContent}></ContentStudent>;

      case "doctor":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");

        return <ContentDoctor close={setModeContent}></ContentDoctor>;
      case "groupStudent":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");

        return (
          <ContentGroupStudent close={setModeContent}></ContentGroupStudent>
        );

      case "workDoctor":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");
        return (
          <ContentWork
            upfile={setModeContent}
            workinfoselected={setSelectworkinfo}
            close={setModeContent}
          ></ContentWork>
        );

      case "assessmentForm":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");
        return <ContentSetting close={setModeContent}></ContentSetting>;

      case "report":
        docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");
        return <ContentReport close={setModeContent}></ContentReport>;

      case "file":
        return (
          <ContentFile
            selectinfo={selectworkinfo}
            backtowork={setModeContent}
            close={setModeContent}
          ></ContentFile>
        );
      // case "logout":
      //   docGetId(`btnMenu-${content}`).classList.add("holdBTNmenuNavigatepage");
      //   localStorage.clear();
      //   cookie.remove("studentEyeToken");
      //   navigat("/");
      //   break;
      default:
        return (
          <div className="body-mainDefault">
            <div className="header-mainDefault">
              <h1>{`Version ${versionis}`}</h1>
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
        docGetId("btnMenu-Modallogout").style.visibility = "visible";
      }, 600);
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
        docGetId("btnMenu-Modallogout").style.visibility = "hidden";
      }, 5);
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

  const handleClearinglogout = () => {
    localStorage.clear();
    Swal.fire({
      title: "ออกจากระบบ !!!",
      text: "ออกจากระบบเรียบร้อยแล้ว !!!",
      icon: "warning",
      showConfirmButton: false,
      timer: 1700,
    });
    removeitCookie();
    setTimeout(() => {
      if(cookie.get("studentEyeToken")){
        removeitCookie();
        navigat("/")
      }else{
        navigat("/")
      }
    }, 200);
   
  };

  useEffect(() => {
    if (!checkCookieOut()) {
      return navigat("/");
    }
    versioncheck();
    setCheckisver(true);
  }, []);

  useEffect(() => {
    if (!checkisver) return;
    if (localStorage.getItem("verstdES")) {
      let localversionStdEs = localStorage.getItem("verstdES");
      setVersionis(localversionStdEs);
    } else {
      versioncheck();
      setCheckisver(null);
    }
  }, [checkisver]);

  useEffect(() => {
    if (statusClosemenu) {
      handleOpenModalMenu(false);
      setstatusClosemenu(false);
    }
  }, [statusClosemenu]);

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
              className="btn-logout-navigatepage"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleClearinglogout();
              }}
            >
              <i className="bi-box-arrow-left"></i>
            </button>
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
            <button
              id="btnMenu-groupStudent"
              className="navigatMenuBTN"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("groupStudent");
              }}
            >
              {"กลุ่ม"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button
              id="btnMenu-workDoctor"
              className="navigatMenuBTN"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("workDoctor");
              }}
            >
              {"งานอาจารย์"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button
              id="btnMenu-assessmentForm"
              className="navigatMenuBTN"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("assessmentForm");
              }}
            >
              {"ตั้งค่าแบบประเมิน"}
            </button>
          </div>
          <div className="btn-menu-navigatepage">
            <button
              id="btnMenu-report"
              className="navigatMenuBTN"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("report");
              }}
              disabled
            >
              {"รายงาน"}
            </button>
          </div>
          <div className="btn-menu-navigatepage" style={{ display: "none" }}>
            <button
              id="btnMenu-logout"
              className="navigatMenuBTN"
              onClick={(e) => {
                removeholdbtnmenu(e);
                setModeContent("logout");
              }}
            >
              {"logout"}
            </button>
          </div>
        </div>
        <div className="show-content-box">{ShowContentINbox(modeContent)}</div>
      </div>
      <ModalSlideBar
        settingContent={setModeContent}
        close={setstatusClosemenu}
      ></ModalSlideBar>
    </div>
  );
};
export default NavigationPage;
