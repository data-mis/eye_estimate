const ContentDoctor = (props) => {
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
        <div className="content-table"></div>
        <div className="content-menu">
          <div className="box-menu-contentDoctor">
            <button type="button" className="content-menu-btn">
              {"เพิ่ม"}
            </button>
            <button type="button" className="content-menu-btn">
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDoctor;
