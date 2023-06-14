const ModalNavSlide = () => {
  return (
    <div className="modalNavSlide" id="NavSlideMOdal">
      <div className="thisBody-modalNavSlide" id="bodyNavslideModal">
        <div className="content-body-modalNavslide" id="contentNavslideModle">
          <div className="menu-navslide-contentwork">
            {/* menu year */}
            <div className="contentwork-year-navslide">
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
            <div className="contentwork-month-navslide">
              <span>{"เดือน"}</span>
              <input type="text" className="input-month-contentwork"></input>
              <button className="this-month-drop-navslide">
                <i className="bi-caret-down"></i>
              </button>
              <div className="dropinfo-monthContentwork"></div>
            </div>
            {/* menu group */}
            <div className="contentwork-group-navslide">
              <span>{"กรองตามกลุ่ม"}</span>
              <input
                type="text"
                className="input-group-contentwork-navslide"
              ></input>
              <button className="this-group-drop-navslide">
                <i className="bi-caret-down"></i>
              </button>
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
