<template>
  <div>
    <Header></Header>
    <div class="protect">
      仅仅是个人学习使用，没有任何商业用途，请勿用于商业用途，谢谢合作！
      如以侵权行为被投诉，请联系作者，我们将尽快处理！
    </div>
    <router-view></router-view>
    <Footer></Footer>
    <Play></Play>
  </div>
</template>

<script>
import Header from "@/views/header.vue";
import Footer from "@/views/footer.vue";
import Play from "@/components/play/play.vue";
import PlayList from "@/components/playlist/playList.vue";
//统一接口api文件夹里面全部请求函数
import * as API from "./api";

export default {
  data() {
    return {};
  },
  mounted() {
    var deviceWidth = document.documentElement.clientWidth;

    if (deviceWidth > 1080) {
      deviceWidth = 1080;
    }
    document.documentElement.style.fontSize = deviceWidth / 25 + "px";
  },
  components: {
    Header: Header,
    Footer: Footer,
    Play: Play,
    PlayList: PlayList,
  },
  mounted() {
    // this.getUUid();
    //如果存在userName则获取用户信息
  },
  methods: {
    // 游客登录
    // async getUUid() {
    //   const result = await API.reqUUid();
    //   if (result.status == 200) {
    //     localStorage.setItem("cookie", result.data.cookie);
    //   }
    // },
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style>
.protect {
  width: 200px;
  height: 50px;
  position: absolute;
  left: 50px;
  top: 600px;
  z-index: 999;
}
</style>