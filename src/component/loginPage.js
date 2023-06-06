import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FetchController from "./data/fetchConroller";

const LoginPage = () => {
  const [username, SetUsername] = useState();
  const [password, SetPassword] = useState();
  const [typeInput, setTypeInput] = useState("password");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    FetchController.fetchLogin(username, password, navigate);
  };

  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const handleShowPassword = (status) => {
    if (status) {
      docGetId("btnEyePassword").style.display = "none";
      docGetId("btnEyeShowPass").style.display = "flex";
      setTypeInput("text");
    } else {
      docGetId("btnEyeShowPass").style.display = "none";
      docGetId("btnEyePassword").style.display = "flex";
      setTypeInput("password");
    }
  };

  return (
    <div className="content-Login-admin-estimate">
      <div className="box-info-login">
        <div className="header-title-login">
          <h1>ESTIMATE</h1>
        </div>
        <div className="box-form-login">
          <form
            className="form-login-boxContent"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="box-info-formLogin">
              <span>{"USERNAME : "}</span>
              <input
                type="input"
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={(e) => {
                  SetUsername(e.target.value);
                }}
                required
              ></input>
            </div>
            <div className="box-info-formLogin">
              <span>{"PASSWORD : "}</span>
              <div className="inputPassword">
                <input
                  type={typeInput}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  onChange={(e) => {
                    SetPassword(e.target.value);
                  }}
                  required
                ></input>
                <button
                  type="button"
                  className="btn-eye-password"
                  id="btnEyePassword"
                  onClick={() => {
                    handleShowPassword(true);
                  }}
                >
                  <i className="bi-eye"></i>
                </button>
                <button
                  type="button"
                  className="btn-eye-text"
                  id="btnEyeShowPass"
                  onClick={() => {
                    handleShowPassword(false);
                  }}
                >
                  <i className="bi-eye-fill"></i>
                </button>
              </div>
            </div>
            <div className="box-info-formLogin">
              <button className="btn-submit" type="submit">
                {"LOGIN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
