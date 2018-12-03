import React, { Component } from 'react';

import { auth } from '../../firebase';
import { Form, Icon, Input } from 'antd';
import { byPropKey } from '../../utils/index';

import { FormButton } from '../../components/FormButton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { FormContainer } from '../../components/FormContainer';

const FormItem = Form.Item;

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetScreen extends Component {
  state = { ...INITIAL_STATE };

  async handleSubmit(event) {
    event.preventDefault();

    const { email } = this.state;

    this.props.onSubmit(email).catch(error => {
      this.setState(byPropKey('error', error.message));
    });

    return auth.doPasswordReset(email);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.Messagestate;

    return (
      <FormContainer>
        <h1 className="title">Password Forget</h1>
        <Form
          onSubmit={event => this.handleSubmit(event)}
          className="login-form"
        >
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                onChange={event =>
                  this.setState(byPropKey('email', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            <FormButton
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Restore
            </FormButton>
          </FormItem>
          <ErrorMessage>{error}</ErrorMessage>
        </Form>
      </FormContainer>
    );
  }
}

export default Form.create()(PasswordForgetScreen);
