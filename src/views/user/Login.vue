<template>
  <div
    class="ipd-login-box"
    :style="{ backgroundImage: 'url(' + require('@/assets/bg.jpg') + ')' }"
  >
    <div class="ipd-login-logo">
      <img :src="require('@/assets/ipd-logo.png')" alt="logo" />
      <p>研发流程系统</p>
    </div>
    <div class="ipd-login-body">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请输入用户名!' }]
              }
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码!' }]
              }
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="ipd-login-formItem">
          <a-checkbox
            class="ipd-login-checkbox"
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: false
              }
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码？
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登 录
          </a-button>
          Or
          <a>
            <router-link :to="{ path: '/user/register' }">去注册</router-link>
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from "@/api/apis";
// import { setToken } from "@/cookies/cookie";
import router from "@/router/index";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted() {
    console.log("logout=", this.$store.state);
  },
  data() {
    return {};
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var self = this;
          const userName = values.username.trim(); // 处理用户名首尾的空格
          values.username = userName;
          getLogin(values)
            .then(result => {
              if (result.code == "200") {
                // self.$store.dispatch("saveToken", result.data.token); // 调用store中actions事件,异步操作
                // setToken(result.data.token); // 保存token到cookie中
                self.$store.commit("SET_TOKEN", result.data.token); // 调用store中mutations事件,同步操作
                self.$store.commit("SET_ROLE", result.data.role);
                self.$store.commit("SET_USERNAME", result.data.username);
                self.$store.commit("SET_USERIMAGE", result.data.userimage);
                self.$store.commit("SET_PHONE", result.data.phone);
                self.$store.commit("SET_EMAIL", result.data.email);
                router.push("/");
              } else {
                this.$notification.error({
                  message: "error!",
                  description: result.data
                });
                this.pwdStatus = "error";
                this.pwdHelp = result.data;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
#components-form-demo-normal-login .login-form {
  max-width: 400px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ipd-login-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.ipd-login-body {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 50%;
  // bottom: 0;
  // transform: translateY(-50%);
  margin: auto;
  width: 400px;
}
.ipd-login-logo {
  display: flex;
  align-items: center;
  margin: 50px 10%;
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
.ipd-login-checkbox,
.ipd-login-formItem {
  color: #ffffff;
}
</style>
