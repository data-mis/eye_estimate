import { objectMonth } from "../config/monthth";

const ModalNavSlide = (props) => {
  const changeyear = (mode) => {
    let thisyear = parseInt(props.selectyear);

    if (mode) {
      let result = thisyear + 1;
      props.yearselect(result);
    } else {
      let result = thisyear - 1;
      props.yearselect(result);
    }
  };

  const handleDropdown = (id) => {
    if (!props.openDrop) {
      if (document.getElementById(id).style.display === "block") {
        document.getElementById(id).style.display = "none";
        props.setopenDrop(false);
      } else {
        document.getElementById(id).style.display = "block";
        props.setopenDrop(true);
      }
    } else {
      if (document.getElementById(id).style.display === "block") {
        document.getElementById(id).style.display = "none";
        props.setopenDrop(false);
      } else {
        document.getElementById(id).style.display = "block";
      }
    }
  };

  return (
    <div className="modalNavSlide" id={`${props.idbox}`}>
      <div className="thisBody-modalNavSlide" id="bodyNavslideModal">
        <div className="content-body-modalNavslide" id="contentNavslideModle">
          <div className="menu-navslide-contentwork">
            {/* menu year */}
            <div className="contentwork-year">
              <span>{"ปี"}</span>
              <input
                type="number"
                className="input-year-contentwork"
                value={props.selectyear}
                onChange={(e) => {
                  props.yearselect(e.target.value);
                }}
              ></input>
              <div className="box-buttonUPDOWN">
                <button
                  className="this-up-year"
                  onClick={() => {
                    changeyear(true);
                  }}
                >
                  <i className="bi-caret-up"></i>
                </button>
                <button
                  className="this-down-year"
                  onClick={() => {
                    changeyear(false);
                  }}
                >
                  <i className="bi-caret-down"></i>
                </button>
              </div>
            </div>
            {/* menu month */}
            <div className="contentwork-month">
              <span>{"เดือน"}</span>
              <div className="dropDownBox-monthContentwork">
                <input type="text" className="input-month-contentwork"></input>
                <button
                  className="this-month-drop-navslide"
                  onClick={() => {
                    handleDropdown("MonthContentworkDropdown");
                  }}
                >
                  <i className="bi-caret-down"></i>
                </button>
                <div
                  className="dropinfo-Contentwork-nav"
                  id="MonthContentworkDropdown"
                >
                  {objectMonth().map((res, index) => {
                    return (
                      <div
                        className="lineMonthDropinfo-contentwork"
                        key={index}
                        onClick={() => {
                          console.log("click =>", res.mnum);
                        }}
                      >
                        <span>{res.mth}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* menu group */}
            <div className="contentwork-group">
              <span>{"กลุ่ม"}</span>
              <div className="dropDownBox-groupContentwork">
                <input type="text" className="input-group-contentwork"></input>
                <button
                  className="this-group-drop"
                  onClick={() => {
                    handleDropdown("groupContentworkDropdown");
                  }}
                >
                  <i className="bi-caret-down"></i>
                </button>
                <div
                  className="dropinfo-Contentwork-nav"
                  id="groupContentworkDropdown"
                ></div>
              </div>
            </div>
          </div>
          <div className="menu-navslide-contentwork">
            {/* menu buttonAll */}
            <div className="contentwork-buttonAll-navslide">
              <button type="button">{"งานทั้งหมด"}</button>
            </div>
            {/* menu radiobtn */}
            <div className="this-radiobtn-contentwork-navslide">
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
        </div>
      </div>
    </div>
  );
};
export default ModalNavSlide;
