const ContentWork = () => {
  return (
    <div className="body-contentwork">
      <div className="header-contentwork">
        <div className="box-textheader-contentwork">
          <h3>{`จัดกลุ่มงานประเมิน`}</h3>
        </div>
        <div className="box-btnclosebody-contentwork">
          <button className="btn-closebody-contentwork">{"ปิด"}</button>
        </div>
      </div>
      <div className="menu-nav-contentwork">
        {/* menu year */}
        <div className="contentwork-year">
          <span>{"ปี"}</span>
          <input type="number" className="input-year-contentwork"></input>
          <button className="this-up-year">
            <i className="bi-caret-up"></i>
          </button>
          <button className="this-down-year">
            <i className="bi-caret-down"></i>
          </button>
        </div>
        <div className="contentwork-month">
          <span>{"เดือน"}</span>
          <input type="text" className="input-month-contentwork"></input>
          <button className="this-month-drop">
            <i className="bi-caret-down"></i>
          </button>
          <div className="dropinfo-monthContentwork"></div>
        </div>
        <div className="contentwork-group">
          <span>{"กรองตามกลุ่ม"}</span>
          <input type="text" className="input-group-contentwork"></input>
          <button>
            <i className="bi-caret-down"></i>
          </button>
        </div>
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
    </div>
  );
};
export default ContentWork;
