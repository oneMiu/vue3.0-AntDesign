<template>
  <div
    class="login-container"
    @contextmenu.prevent="
      () => {
        return false
      }
    "
  >
    <div style="position: absolute; width: 100vw; height: 100vh;overflow:hidden">
      <img class="imgWidth" :src="bg" alt="" />
    </div>
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <div class="login-container-hello">你好!</div>
          <div class="login-container-title">欢迎来到 {{ title }}</div>
          <a-form :model="form" @submit="loginSystem" @submit.prevent>
            <a-form-item>
              <a-input
                v-model:value="form.service_name"
                placeholder="请输入账号或手机号"
              >
                <template v-slot:prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                :visibilityToggle="true"
                v-model:value="form.password"
                type="password"
                placeholder="请输入密码"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="$store.getters['customData/loadingInstance']"
                type="primary"
                html-type="submit"
                :disabled="form.service_name === '' || form.password === ''"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { login } from '@/api/user'
  export default {
    name: 'Login',
    components: {
      UserOutlined,
      LockOutlined,
    },
    data() {
      return {
        bg: "https://api.ixiaowai.cn/gqapi/gqapi.php",
        form: {
          service_name: '',
          password: '',
        },
        redirect: undefined,
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
      }),
    },
    mounted() {
    },
    methods: {
      ...mapActions({
        login: 'user/login',
      }),
      loginSystem() {
        if (!this.form.service_name || !this.form.password) {
          return
        }
        login(this.form)
          .then((res) => {
            // res.role_authority.push("businessConfig")
            this.$store.commit('user/setUserInfo', res)
            this.$router.push({ name: res.redirect_url })
          })
          .catch((e) => {
            console.log(e)
            // this.$message.error("异常："+e)
          })
      },
    },
  }
</script>

<style lang="less">
  @media screen and (min-width: 700px) and (max-width: 1300px) {
    .imgWidth {
      width: auto !important;
      height: 100vh !important;
    }
  }
  @media screen and (min-width: 10px) and (max-width: 700px) {
    .imgWidth {
      width: auto !important;
      margin-left:-50%;
      height: 100vh !important;
    }
  }
  .imgWidth {
    width: 100vw;
    height: auto;
  }
  .ant-col {
    width: 100%;
  }
  .login-container {
    height: 100vh;
    // background: url('~@/assets/login_images/login_background.png');
    background-size: cover;

    &-form {
      width: calc(100% - 40px);
      height: 400px;
      padding: 4vh;
      margin-top: calc((100vh - 380px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background: url('~@/assets/login_images/login_form.png');
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    }

    &-hello {
      font-size: 32px;
      color: #fff;
    }

    &-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }

    &-tips {
      position: fixed;
      bottom: @vab-margin;
      width: 100%;
      height: 40px;
      color: rgba(255, 255, 255, 0.856);
      text-align: center;
    }

    .ant-input {
      width: 100%;
      height: 45px;
    }

    .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }
  }
</style>
<style>
input:-webkit-autofill{
  -webkit-box-shadow: 0 0 0 1000px white inset !important
}
</style>