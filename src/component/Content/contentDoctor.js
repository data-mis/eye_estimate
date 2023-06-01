const ContentDoctor = (props) => {
  return (
    <div className="body-content-ctDoctor">
      <div className="nav-content-ctDoctor">
        <span>{"ข้อมูล อาจารย์"}</span>
        <div className="nav-box-search">
          <span>{"ค้นหา"}</span>
          <input type="text" className="input-navDoctor-search"></input>
          <button type="button" className="btn-navDoctor-search">
            <i className="bi-search"></i>
          </button>
        </div>
        <button type="button" className="btn-close-ctDoctor">
          {"ปิด"}
        </button>
      </div>
    </div>
  );
};

export default ContentDoctor;
