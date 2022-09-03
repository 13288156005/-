<template>
  <div>
    <header class="h-top">
      <div class="t-top clearFix">
        <div class="t-wrap">
          <h1 class="logo"><a href="index.html" class="fl">网易云音乐</a></h1>
          <nav class="top-nav fl">
            <router-link to="/" :class="$route.path == '/' ? 'active' : ''"
              ><span>发现音乐</span><i class="cor"></i
            ></router-link>
            <router-link
              to="/myplaylist"
              :class="$route.path == '/myplaylist' ? 'active' : ''"
              ><span>我的音乐</span><i class="cor"></i
            ></router-link>
            <a><span>朋友</span><i class="cor"></i></a>
            <a><span>商城</span><i class="cor"></i></a>
            <a><span>音乐人</span><i class="cor"></i></a>
            <a class="last"><span>下载客户端</span><i class="hot"></i></a>
          </nav>
          <div class="landing fr">
            <a
              class="link fr"
              @click="login_pic"
              ref="login"
              v-if="loginMsg.name == ''"
              >登陆</a
            >
            <img
              ref="loginImg"
              :src="loginMsg.imgUrl"
              class="header_icon"
              alt=""
              v-if="loginMsg.name != ''"
            />
            <a
              class="loginOut"
              ref="logOut"
              v-if="loginMsg.name != ''"
              @click="logOut"
              >退出登录</a
            >
          </div>
          <form class="search fr" @submit.prevent="search">
            <input
              type="text"
              class=""
              placeholder="单曲/歌手/专辑/歌单/MV/用户"
              v-model="searchInfo.keywords"
            />
          </form>
        </div>
      </div>
      <div class="n-nav clearFix">
        <div class="n-wrap">
          <nav class="nav fl">
            <router-link
              :to="{ path: '/' }"
              :class="$route.path == '/' ? 'n-active' : ''"
              ><span>推荐</span></router-link
            >
            <router-link
              :to="{ path: '/ranking' }"
              :class="$route.path == '/ranking' ? 'n-active' : ''"
              ><span>排行榜</span></router-link
            >
            <router-link
              :to="{ path: '/sheet' }"
              :class="$route.path == '/sheet' ? 'n-active' : ''"
              ><span>歌单</span></router-link
            >
            <router-link
              :to="{ path: '/discover' }"
              :class="$route.path == '/discover' ? 'n-active' : ''"
              ><span>主播电台</span></router-link
            >
            <router-link
              :to="{ path: '/singer' }"
              :class="$route.path == '/singer' ? 'n-active' : ''"
              ><span>歌手</span></router-link
            >
            <router-link
              :to="{ path: '/album' }"
              :class="$route.path == '/album' ? 'n-active' : ''"
              ><span>新碟上架</span></router-link
            >
          </nav>
        </div>
      </div>
    </header>

    <!-- 登录界面 -->
    <el-dialog
      title="请扫描二维码登录"
      :visible.sync="dialogVisible"
      width="40%"
      @close="closeLogDialog"
      center
    >
      <div class="loginPic">
        <img :src="qrCodeUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  reqLoginOut,
  reqGetLoginKey,
  reqGetLoginUrl,
  reqGetLoginCheck,
  reqGetUserInfo,
  reqUserDetail,
} from "@/api/index.js";
export default {
  data() {
    return {
      //控制登录页面的显示和隐藏
      dialogVisible: false,

      loginMsg: {
        name: "",
        id: "",
        imgUrl: "",
        token: "",
        cookie: "",
        followeds: 0,
        follows: 0,
        eventCount: 0,
      },

      //搜索框数据
      searchInfo: {
        keywords: "",
        type: 1,
      },

      //二维码图片地址
      qrCodeUrl: "",
    };
  },
  mounted() {
    //本地存储localStrage
    if (localStorage.getItem("userName")) {
      let userName = localStorage.getItem("userName");
      userName = JSON.parse(userName);
      this.loginMsg = userName;
    }
  },
  methods: {
    //当关闭登录对话框的回调函数
    closeLogDialog() {},
    //重置手机号码和密码
    resetLog() {},
    //成功登录账号
    login() {
      console.log("登录");
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //表单成功验证
          this.dialogVisible = false;
          this.$store.dispatch("loginUser", this.dataForm);
          //刷新页面
          this.$router.go(0);
        } else {
          // 表单验证失败
          console.log("error submit!!");
          return false;
        }
      });
    },
    //点击退出登录按钮
    logOut() {
      let user = localStorage.getItem("userName");
      user = JSON.parse(user);
      let userInfo = {
        cookie: user.cookie,
      };
      reqLoginOut(userInfo);
      localStorage.clear();
      location.reload();
    },
    //搜索框搜索
    search() {
      if (this.searchInfo.keywords != "") {
        this.$router.push({ path: "/search", query: this.searchInfo });
      }
    },
    //点击登录按钮
    async login_pic() {
      const result = await reqGetLoginKey();
      if (result.data.code !== 200) {
        return this._vm.$message.error(result.data.message);
      }

      let key = result.data.data.unikey;
      let keyInfo = {
        key: key,
        qrimg: 1,
      };
      const result2 = await reqGetLoginUrl(keyInfo);
      if (result2.data.code !== 200) {
        return this._vm.$message.error(result2.data.message);
      }
      this.qrCodeUrl = result2.data.data.qrimg;
      console.log(result2.data);
      //显示登录对话框
      this.dialogVisible = true;
      let timer = setInterval(async () => {
        //获取时间戳
        let time = new Date().getTime();
        let key2Info = {
          key: key,
          time: time,
        };
        let result3 = await reqGetLoginCheck(key2Info);
        if (result3.data.code == 803) {
          this.$message.success("登录成功");
          //关闭对话框
          this.dialogVisible = false;
          console.log(result3);
          let cookie = result3.data.cookie;
          //保存到localStrage
          localStorage.setItem("cookie", cookie);
          //获取用户信息
          let userInfo = {
            cookie: cookie,
          };
          const result4 = await reqGetUserInfo(userInfo);
          let id = result4.data.account.id;
          const result5 = await reqUserDetail(id);
          //整理数据
          this.loginMsg.name = result5.data.profile.nickname;
          this.loginMsg.id = result5.data.profile.userId;
          this.loginMsg.imgUrl = result5.data.profile.avatarUrl;
          this.loginMsg.cookie = cookie;
          this.loginMsg.followeds = result5.data.profile.followeds;
          this.loginMsg.follows = result5.data.profile.follows;
          this.loginMsg.eventCount = result5.data.profile.eventCount;
          //对象转化为json格式
          let user = JSON.stringify(this.loginMsg);
          // 保存到localStrage
          localStorage.setItem("userName", user);
          //清除定时器
          clearInterval(timer);
          //刷新页面
          this.$router.go(0);

          return;
        }
      }, 3000);
    },
  },
  computed: {
    ...mapState({
      loginMessage: (state) => state.loginMessage,
    }),
  },
  watch: {
    loginMessage(newVal, oldVal) {
      this.loginMsg.name = newVal.profile.nickname;
      this.loginMsg.id = newVal.profile.userId;
      this.loginMsg.imgUrl = newVal.profile.avatarUrl;
      this.loginMsg.token = newVal.token;
      this.loginMsg.cookie = newVal.cookie;
      this.loginMsg.followeds = newVal.profile.followeds;
      this.loginMsg.follows = newVal.profile.follows;
      this.loginMsg.eventCount = newVal.profile.eventCount;
      localStorage.setItem("cookie", this.loginMsg.cookie);
      // js对象转换为json格式
      let user = JSON.stringify(this.loginMsg);
      localStorage.setItem("userName", user);
    },
  },
};
</script>

<style  lang='less' scoped>
.link {
  // display: none;
}
.header_icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.loginOut {
  display: inline-block;

  color: #fff;
  font-size: 14px;
  margin-top: 8px;
  padding-left: 20px;
}
.loginPic {
  display: flex;
  justify-content: center;
}
</style>