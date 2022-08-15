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
              @click="dialogVisible = true"
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
          <form class="search fr">
            <input
              type="text"
              class=""
              placeholder="单曲/歌手/专辑/歌单/MV/用户"
              @keyup.enter="search"
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
            <a><span>歌手</span></a>
            <a><span>新碟上架</span></a>
          </nav>
        </div>
      </div>
    </header>

    <!-- 登录界面 -->
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="40%"
      @close="closeLogDialog"
      center
    >
      <!-- 登录数据 -->
      <el-form
        :model="dataForm"
        :rules="formRules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="dataForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetLog">重置</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqLoginOut } from "@/api/index.js";
export default {
  data() {
    return {
      //控制登录页面的显示和隐藏
      dialogVisible: false,
      //form表单数据
      dataForm: {
        phone: "",
        password: "",
      },
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
      //form验证表单
      formRules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "密码至少6位数",
            trigger: "blur",
          },
        ],
      },
      //搜索框数据
      searchInfo: {
        keywords: "",
        type: 1,
      },
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
    closeLogDialog() {
      this.dataForm = {
        phone: "",
        password: "",
      };
      this.$refs.ruleForm.resetFields();
    },
    //重置手机号码和密码
    resetLog() {
      this.$refs.ruleForm.resetFields();
    },
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
      reqLoginOut();
      localStorage.clear();
      location.reload();
    },
    //搜索框搜索
    search() {
      if (this.$route.path != "/search") {
        this.$router.push({ path: "/search", query: this.searchInfo });
        this.$store.dispatch("search", this.searchInfo);
      }
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

<style  lang='less'>
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
</style>