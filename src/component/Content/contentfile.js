const ContentFile = () => {
  return (
    <div className="content-filecontent">
      <div className="title-nav-filecontent">
        <span>{"ข้อมูล File"}</span>
        <input className="namefile-filecontent"></input>
        <button type="button">{"close"}</button>
      </div>
      <div className="body-filecontent">
        <div className="menu-select-filecontent">
          <div className="box-info-filecontent">
            <div className="showinfo-filecontent">
              <div></div>
            </div>
          </div>
        </div>
        <div className="show-file-filecontent"></div>
        <div className="menu-btn-filecontent">
          <button className="btn-menubtn-filecontent">{"เพิ่ม"}</button>
          <button className="btn-menubtn-filecontent">{"ลบ"}</button>
        </div>
      </div>
    </div>
  );
};
export default ContentFile;
