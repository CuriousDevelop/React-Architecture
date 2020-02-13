import { Form as ElForm, Input, Button } from 'element-react';
import React, { Component } from 'react';
import { isValidUsername } from '../../utils/validate';
import './login.scss';
export default class Login extends Component {
    private loginForm = {
        username: 'admin',
        password: '111111',
    };

    private validateUsername = (rule: any, value: string, callback: Function) => {
        if (!isValidUsername(value)) {
            callback(new Error('Please enter the correct user name'));
        } else {
            callback();
        }
        console.log(rule);
    };
    private validatePassword = (rule: any, value: string, callback: Function) => {
        if (value.length < 6) {
            callback(new Error('The password can not be less than 6 digits'));
        } else {
            callback();
        }
        console.log(rule);
    };

    private loginRules = {
        username: [{ validator: this.validateUsername, trigger: 'blur' }],
        password: [{ validator: this.validatePassword, trigger: 'blur' }],
    };
    private passwordType = 'password';
    private loading = false;
    private loginformref = React.createRef<ElForm>();
    private showPwd() {
        if (this.passwordType === 'password') {
            this.passwordType = '';
        } else {
            this.passwordType = 'password';
        }
    }
    constructor(props: any) {
        super(props);
        console.log(this.refs);
    }
    private handleLogin(e: React.SyntheticEvent<HTMLButtonElement>) {
        this.loginformref.current?.validate(async (valid: boolean) => {
            if (valid) {
                this.setState(this.props.loading);
                // await UserModule.Login(this.loginForm);
                // this.$router.push({
                //     path: this.redirect || '/',
                //     query: this.otherQuery,
                // });
                setTimeout(() => {
                    this.loading = false;
                }, 0.5 * 1000);
            } else {
                return false;
            }
            console.log(e);
        });
    }
    render() {
        return (
            <div className="login-container">
                <ElForm
                    ref="loginformref"
                    model={this.loginForm}
                    rules={this.loginRules}
                    className="login-form"
                    labelPosition="left"
                >
                    <div className="title-container">
                        <h3 className="title">Login Title</h3>
                    </div>
                    <ElForm.Item prop="username">
                        <span className="svg-container"></span>
                        <Input
                            ref="username"
                            placeholder="UserName"
                            name="username"
                            type="text"
                            autoComplete="on"
                            value={this.loginForm.username}
                        ></Input>
                    </ElForm.Item>
                    <ElForm.Item prop="password">
                        <span className="svg-container"></span>
                        <Input
                            ref="password"
                            placeholder="Password"
                            type={this.passwordType}
                            key={this.passwordType}
                            name="password"
                            value={this.loginForm.password}
                        ></Input>
                        <span className="show-pwd" onClick={this.showPwd}>
                            X
                        </span>
                    </ElForm.Item>

                    <Button loading={this.loading} type="primary" size="large" onClick={this.handleLogin}>
                        Login
                    </Button>
                </ElForm>
            </div>
        );
    }
}
