<template>
  <div class="main">
    <div class="m-wrap">
      <div class="m-left">
        <div class="mvHeader">
          <div class="mvTitle">
            <i></i>
            <h2>{{ mvAsg.name }}</h2>
            <span @click="goSingerAsg(mvAsg.artistId)">{{
              mvAsg.artistName
            }}</span>
          </div>
          <div class="mvPlay">
            <video
              ref="video"
              height="360"
              width="640"
              type="video/mp4"
              controls="controls"
              :src="mvUrl.data.url"
            ></video>
          </div>
          <div class="mvButton">
            <a href="javascript:;" class="mv-like">
              <i class="iconfont icon-like">
                <span>({{ 666 }})</span>
              </i>
            </a>
            <a href="javascript:;" class="mv-add">
              <i class="iconfont icon-add">
                <span>({{ mvAsg.subCount }})</span>
              </i>
            </a>
            <a href="javascript:;" class="mv-share">
              <i class="iconfont icon-share">
                <span>({{ mvAsg.shareCount }})</span>
              </i>
            </a>
          </div>
        </div>
        <comment :send="type"></comment>
      </div>
      <div class="m-right">
        <div class="mvDtail">
          <h3>mv简介</h3>
          <span class="mv-time">发布时间：{{ mvAsg.publishTime }}</span>
          <span class="mv-playCount">播放次数：{{ mvAsg.playCount }}次</span>
          <div class="mv-asg">
            {{ mvAsg.desc }}
          </div>
        </div>
        <div class="bg123"></div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "../comment/comment.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      type: "mv",
    };
  },
  mounted() {
    //获取mv详情
    this.$store.dispatch("getMvDetail", this.$route.params.id);
    //获取mvurl
    this.$store.dispatch("getMvUrl", this.$route.params.id);
    //播放mv
    setTimeout(() => {
      this.$refs.video.play();
    }, 1000);
  },
  methods: {
    goSingerAsg(id) {
      this.$router.push("/singerAsg/" + id);
    },
  },
  computed: {
    ...mapState(["mvDetail", "mvUrl"]),
    mvAsg: function () {
      if (Object.keys(this.mvDetail).length > 0) {
        let name = this.mvDetail.data.name;
        let id = this.mvDetail.data.id;
        let artistId = this.mvDetail.data.artistId;
        let artistName = this.mvDetail.data.artistName;
        let playCount = this.mvDetail.data.playCount;
        let subCount = this.mvDetail.data.subCount;
        let shareCount = this.mvDetail.data.shareCount;
        let desc = this.mvDetail.data.desc;
        let publishTime = this.mvDetail.data.publishTime;
        return {
          name,
          id,
          artistId,
          artistName,
          playCount,
          subCount,
          shareCount,
          desc,
          publishTime,
        };
      }
    },
  },
  components: {
    comment,
  },
};
</script>

<style scoped lang='less'>
.m-left {
  padding: 50px 40px;
  .mvHeader {
    .mvTitle {
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        width: 30px;
        height: 18px;
        background: url("./img/icon2 (1).png") no-repeat -230px -480px;
      }
      h2 {
        font-size: 24px;
        color: #333333;
        margin-right: 10px;
      }
      span {
        font-size: 12px;
        color: #0c73c2;
        cursor: pointer;
      }
    }
  }
  .mvPlay {
    margin-top: 10px;
    padding: 15px 0;
    background: black;
    width: 640px;
    video {
      height: 360px;
    }
  }
  .mvButton {
    display: flex;
    margin-top: 25px;
    // 公共样式
    span {
      font-style: normal;
    }

    .mv-like {
      display: flex;
      i {
        display: inline-block;
        // width: 94px;
        height: 31px;
        background: url("./img/button2.png") no-repeat 0 -59px;
        span {
          &::before {
            content: "";
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url("./img/button2.png") no-repeat 0 -93px;
            padding-right: 5px;
          }
          height: 31px;
          line-height: 34px;
          color: #333333;
          padding-left: 20px;
          font-size: 14px;
        }
      }
      &::after {
        content: "";
        display: inline-block;
        height: 31px;
        width: 5px;
        background: url("./img/button2.png") no-repeat -245px -100px;
      }
    }
    .mv-add {
      padding: 0 5px;
      display: flex;
      i {
        display: inline-block;
        // width: 58px;
        height: 31px;
        background: url("./img/button2.png") no-repeat 0 -976px;
        span {
          height: 31px;
          line-height: 34px;
          color: #333333;
          padding-left: 30px;
          font-size: 14px;
        }
      }
      &::after {
        content: "";
        display: inline-block;
        height: 31px;
        width: 5px;
        background: url("./img/button2.png") no-repeat -245px -1019px;
      }
    }
    .mv-share {
      display: flex;
      i {
        display: inline-block;
        // width: 58px;
        height: 31px;
        background: url("./img/button2.png") no-repeat 0 -1267px;
        span {
          height: 31px;
          line-height: 34px;
          color: #333333;
          padding-left: 30px;
          font-size: 14px;
        }
      }
      &::after {
        content: "";
        display: inline-block;
        height: 31px;
        width: 5px;
        background: url("./img/button2.png") no-repeat -245px -1019px;
      }
    }
  }
}
.m-right {
  width: 209px;
  .mvDtail {
    padding: 25px 23px;
    display: flex;
    flex-direction: column;
    h3 {
      color: #333333;
      border-bottom: 1px solid #cccccc;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .mv-time,
    .mv-playCount {
      color: #999999;
      padding: 5px 0;
    }
    .mv-asg {
      margin-top: 10px;
      color: #333333;
    }
  }
  .bg123 {
    width: 209px;
    height: 550px;
    // position: relative;
    margin-left: 15px;
    background: url("./img/Snipaste_2022-09-05_19-20-56.png");
  }
}
</style>