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
        <div className="table-box-groupStudent"></div>
        <div className="box-controll-student"></div>
        <div className="box-menu-groupStudent"></div>
      </div>
    </div>
  );
};
export default ContentGroupStudent;
