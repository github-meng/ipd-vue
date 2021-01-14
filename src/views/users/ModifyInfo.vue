<template>
  <div class="ipd-modify">
    <div class="modify-header">
      <a-avatar
        class="modify-avatar"
        :src="
          require(role == 'admin' ? '@/assets/admin.png' : '@/assets/user.png')
        "
        alt="头像"
      />
    </div>

    <a-form :form="form" @submit="handleSubmit" class="modify-form">
      <a-form-item v-bind="formItemLayout" label="用户名">
        <a-input
          disabled
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: false,
                  message: '请输入用户名!',
                  whitespace: true
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="旧密码" has-feedback>
        <a-input
          v-decorator="[
            'oldpassword',
            {
              rules: [
                {
                  required: true,
                  message: '请输入旧密码!'
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
      <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入新密码!'
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
      <a-form-item v-bind="formItemLayout" label="确认新密码" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请再次输入新密码!'
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
          disabled
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '邮箱格式不正确!'
                },
                {
                  required: false,
                  message: '请输入邮箱!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="电话">
        <a-input
          disabled
          v-decorator="[
            'phone',
            {
              rules: [{ required: false, message: '请输入电话号码!' }]
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
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" class="mr-1">
          确认修改
        </a-button>
        <a-button @click="resetForm">
          重置
        </a-button>
      </a-form-item>
    </a-form>
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
  computed: {
    username() {
      return this.$store.getters.getterUserName;
    },
    userimage() {
      return this.$store.getters.getterUserImage;
    },
    password() {
      return this.$store.getters.getterPassWord;
    },
    phone() {
      return this.$store.getters.getterUserPhone;
    },
    email() {
      return this.$store.getters.getterUserEmail;
    },
    role() {
      return this.$store.getters.getterUserRole;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  mounted() {
    this.form.setFieldsValue({
      username: this.username,
      phone: this.phone,
      email: this.email
    });
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
    },
    resetForm() {
      this.confirmDirty = false;
      this.form.setFieldsValue({
        oldpassword: "",
        password: "",
        confirm: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ipd-modify {
  background-color: #ffffff;
  border-radius: 2px;
  height: calc(100vh - 80px);
  overflow: auto;
  padding: 24px;
}
.modify-header {
  width: 100%;
  text-align: center;
}
.modify-avatar {
  width: 100px;
  height: 100px;
  border: 1px solid #999;
}
.modify-form {
  width: 50%;
  margin: 20px auto;
}
</style>
