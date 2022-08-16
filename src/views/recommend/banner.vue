<template>
  <div class="banner">
    <ul class="i-banner clearFix" ref="i_banner">
      <li
        :class="'i-bg' + index1"
        v-for="(item, index1) in banners"
        :key="index1"
      >
        <div class="b-wrap">
          <a href="#">
            <img :src="item.imageUrl" />
          </a>
          <a href="#" class="btnL" @click="lastPage(index1)"></a>
          <a href="#" class="btnR" @click="nextPage(index1)"></a>
          <div class="dot">
            <a
              href="#"
              :class="addClass(index1, index)"
              v-for="(item, index) in banners"
              :key="index"
              @click="dotPage(index)"
            ></a>
          </div>
          <div class="download">
            <a href="#" class="btn">下载客户端</a>
            <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bannerList: [],
      numPage: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getBanners");
    this.timePage();
  },
  methods: {
    addClass(index1, index) {
      if (index1 == index) {
        return "i-active";
      }
    },
    //点击下一张轮播图
    nextPage(index) {
      let num = index + 1;
      this.numPage = num;
      let count = num * 100 + "%";
      if (parseInt(count) <= 700) {
        this.$refs.i_banner.style.marginLeft = "-" + count;
      } else {
        num = 0;
        count = num * 100 + "%";
        this.$refs.i_banner.style.marginLeft = "-" + count;
      }
    },
    //上一张轮播图
    lastPage(index) {
      let num = index - 1;
      this.numPage = num;
      let count = num * 100 + "%";
      if (parseInt(count) >= 0) {
        this.$refs.i_banner.style.marginLeft = "-" + count;
      } else {
        num = 8;
        count = num * 100 + "%";
        this.$refs.i_banner.style.marginLeft = "-" + count;
      }
    },
    //定时换轮播图
    timePage() {
      this.timer = setInterval(() => {
        this.numPage++;
        if (this.numPage <= 7) {
          // let count = this.numPage * 100 + "%";
          this.$refs.i_banner.style.marginLeft = "-" + this.numPage * 100 + "%";
        } else {
          this.numPage = 0;
          // count = this.numPage * 100 + "%";
          this.$refs.i_banner.style.marginLeft = "-" + this.numPage * 100 + "%";
        }
      }, 10000);
    },
    //点击小点点切换轮播图
    dotPage(index) {
      this.$refs.i_banner.style.marginLeft = "-" + index * 100 + "%";
    },
  },
  computed: {
    ...mapState({
      banners: (state) => state.banners,
    }),
  },
  destroyed() {
    //关闭该组件的定时器
    clearInterval(this.timer);
  },
};
</script>

<style>
@keyframes move {
  10% {
    margin-left: 0;
  }
  20% {
    margin-left: -100%;
  }
  30% {
    margin-left: -200%;
  }
  40% {
    margin-left: -300%;
  }
  50% {
    margin-left: -400%;
  }
  60% {
    margin-left: -500%;
  }
  70% {
    margin-left: -600%;
  }
  80% {
    margin-left: -700%;
  }
  90% {
    margin-left: -800%;
  }
  95% {
    margin-left: -900%;
  }
  100% {
    margin-left: 0;
  }
}
.banner {
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.i-banner {
  width: 800%;
}
.i-banner:hover {
  animation-play-state: paused;
}
.i-banner li {
  zoom: 1;
  float: left;
  width: 12.5%;
}
.i-bg0 {
  background: #565a6e;
}
.i-bg1 {
  background: #5e503a;
}
.i-bg2 {
  background: #6385a8;
}
.i-bg3 {
  background: #d1b28d;
}
.i-bg4 {
  background: #1a1a4c;
}
.i-bg5 {
  background: #4167b0;
}
.i-bg6 {
  background: #8eb1c7;
}
.i-bg7 {
  background: #e2bcc3;
}
.i-bg8 {
  background: #eba9e3;
}
.b-wrap {
  position: relative;
  width: 982px;
  margin: 0 auto;
}
.b-wrap img {
  width: 730px;
  height: 336px;
}
.btnL {
  position: absolute;
  top: 50%;
  left: -68px;
  margin-top: -31px;
  width: 37px;
  height: 63px;
  background: url(./img/banner/banner.png) no-repeat 0 -360px;
}
.btnR {
  position: absolute;
  top: 50%;
  right: -68px;
  margin-top: -31px;
  width: 37px;
  height: 63px;
  background: url(./img/banner/banner.png) no-repeat 0 -508px;
}
.btnL:hover {
  background-position: 0 -430px;
}
.btnR:hover {
  background-position: 0 -578px;
}
.dot {
  position: absolute;
  top: 310px;
  left: 0;
  width: 730px;
  height: 20px;
  text-align: center;
}
.dot a {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(./img/banner/banner.png) no-repeat 3px -343px;
}
.dot a:hover,
.dot .i-active {
  background: url(./img/banner/banner.png) no-repeat -16px -343px;
}
.download {
  position: absolute;
  top: 0;
  right: 0;
  width: 254px;
  height: 336px;
  background: url(./img/banner/download.png) no-repeat 0 0;
}
.download .btn {
  display: block;
  width: 215px;
  height: 56px;
  margin: 212px 0 0 19px;
  font-size: 0;
}
.download .btn:hover {
  background: url(./img/banner/download.png) no-repeat 0 -340px;
}
.download p {
  margin: 10px 0;
  text-align: center;
  color: #8d8d8d;
}
</style>