export const versioncheck = async () => {
    try {
      console.log("เข้ามาทำงานอันนี้หรือไม่!!");
      const resversion = await fetch(
        `https://datasoft.co.th/studentEstimate/version.json`
      );
    //   const resversion = await fetch(
    //     `http://localhost:3000/studentEstimate/version.json`
    //   );

      if (!resversion.ok) {
        throw new Error("Network resversion was not ok");
      }
      const data = await resversion.json();
      console.log("ข้อมูล version", data.version);
  
      if (data.version) {
        const localversion = localStorage.getItem("verstdES");
        if (localversion !== data.version) {
          localStorage.setItem("verstdES", data.version);
          window.location.reload(true);
        }
      }
    } catch (error) {
      console.error("มัน Error Version.json ===>", error);
    }
  };
  