<template>
  <div
    class="ipd-register-box"
    :style="{ backgroundImage: 'url(' + require('@/assets/bg.jpg') + ')' }"
  >
    <div class="ipd-register-logo">
      <img :src="require('@/assets/ipd-logo.png')" alt="logo" />
      <p>研发流程系统</p>
    </div>
    <div class="ipd-register-body">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名!',
                    whitespace: true
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: '请再次输入密码!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: '邮箱格式不正确!'
                  },
                  {
                    required: true,
                    message: '请输入邮箱!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="电话">
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: '请输入电话号码!' }]
              }
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
              <a-select-option value="87">
                +87
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="验证码">
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input
                v-decorator="[
                  'captcha',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input the captcha you got!'
                      }
                    ]
                  }
                ]"
              />
            </a-col>
            <a-col :span="12">
              <a-button>Get captcha</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
            我已阅读
            <a href="">协议</a>
          </a-checkbox>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit">
            注 册
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("您输入的两次密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    }
  }
};
</script>
<style scoped lang="less">
.ipd-register-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.ipd-register-body {
  margin: auto;
  width: 400px;
}
.ipd-register-logo {
  display: flex;
  align-items: center;
  margin: 30px 10%;
  img {
    width: 60px;
    height: 60px;
    display: inline;
  }
  p {
    margin: 0 0 0 15px;
    letter-spacing: 1px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
}
.ipd-register-body /deep/ label {
  color: #ffffff;
}
</style>
