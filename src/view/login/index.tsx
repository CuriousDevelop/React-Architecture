import { Form as ElForm, Input, Button } from "element-react";
import React, { Component } from "react";
import { isValidUsername } from "../../utils/validate";
import "./login.scss";

interface LoginProps {}
interface LoginState {
  passwordType: string;
  loading: boolean;
  loginForm: { username: string; password: string };
  rules: any;
}

export default class Login extends Component<LoginProps, LoginState> {
  private loginForm = {
    username: "admin",
    password: "1111111"
  };
  constructor(props: any) {
    super(props);
    this.state = {
      passwordType: "password",
      loading: false,
      loginForm: this.loginForm,
      rules: this.loginRules
    };
    console.log("Constructor Called!!");
  }
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error("Please enter the correct user name"));
    } else {
      callback();
    }
    console.log(rule);
  };
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error("The password can not be less than 6 digits"));
    } else {
      callback();
    }
    console.log(rule);
  };

  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }]
  };

  private loginformref = React.createRef<ElForm>();
  private showPwd() {
    if (this.state.passwordType === "password") {
      this.setState({ passwordType: "" });
    } else {
      this.setState({ passwordType: "password" });
    }
  }
  private handleLogin(e: React.SyntheticEvent<HTMLButtonElement>) {
    this.loginformref.current?.validate(async (valid: boolean) => {
      if (valid) {
        this.setState({ loading: true });
        // await UserModule.Login(this.loginForm);
        setTimeout(() => {
          this.setState({ loading: false });
        }, 0.5 * 1000);
      } else {
        return false;
      }
      console.log(e);
    });
  }

  onChange(key: any, value: any) {
    this.setState({
      loginForm: Object.assign({}, this.state.loginForm, { [key]: value })
    });
  }

  render() {
    return (
      <div className="login-container">
        <ElForm
          ref={this.loginformref}
          model={this.state.loginForm}
          rules={this.state.rules}
          className="login-form"
          labelPosition="left"
        >
          <div className="title-container">
            <h3 className="title">Login Title</h3>
          </div>
          <ElForm.Item prop="username">
            <Input
              placeholder="UserName"
              name="username"
              type="text"
              onChange={this.onChange.bind(this, "username")}
              value={this.state.loginForm.username}
            ></Input>
          </ElForm.Item>
          <ElForm.Item prop="password">
            <Input
              placeholder="Password"
              type={this.state.passwordType}
              name="password"
              onChange={this.onChange.bind(this, "password")}
              value={this.state.loginForm.password}
            ></Input>
            <span className="show-pwd" onClick={() => this.showPwd()}>
              X
            </span>
          </ElForm.Item>

          <Button
            loading={this.state.loading}
            type="primary"
            size="large"
            onClick={e => this.handleLogin(e)}
          >
            Login
          </Button>
        </ElForm>
      </div>
    );
  }
}
