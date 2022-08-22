<template>
  <div class="main" v-if="songDeatil">
    <div class="m-wrap">
      <div class="m-left">
        <div class="songAsg">
          <div class="conter-left">
            <div class="img">
              <img :src="songDeatil.alPicUrl + '?param=130y130'" />
              <div class="img-msk"></div>
            </div>
          </div>
          <div class="conter-right">
            <div class="songAsg-title">
              <i></i>
              <h3>{{ songDeatil.name }}</h3>
            </div>
            <div class="songAsg-art">
              <p>
                歌手：<a href="javascript:;">{{ songDeatil.arName }}</a>
              </p>
              <p>
                所属专辑：<a href="javascript:;">{{ songDeatil.alName }}</a>
              </p>
            </div>
            <div class="songAsg-btn">
              <a href="javascript:;" class="btn-play">
                <i
                  class="iconfont icon-play"
                  @click="playMusic($route.params.id)"
                  ><span>播放</span></i
                >
              </a>
              <a href="javascript:;" class="btn-add">
                <i class="iconfont icon-add"><span>收藏</span></i>
              </a>
              <a href="javascript:;" class="btn-share">
                <i class="iconfont icon-add"><span>分享</span></i>
              </a>
              <a href="javascript:;" class="btn-down">
                <i class="iconfont icon-add"><span>下载</span></i>
              </a>
              <a href="javascript:;" class="btn-commit">
                <i class="iconfont icon-add"
                  ><span>（{{ commentCount }}）</span></i
                >
              </a>
            </div>
            <div class="title" ref="titleMore">
              <td v-for="item in lyric" :key="item.index">
                {{ item }}
              </td>
            </div>
            <div class="more" @click="clickMore">{{ titleMore }}</div>
          </div>
        </div>

        <!-- 品论 -->
        <Comment @commentCount="getCommentCount" :send="type"></Comment>
      </div>
      <div class="m-right">
        <div class="right_background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../comment/comment.vue";
import { reqSongAsg, reqGetLyric } from "@/api/index";
export default {
  data() {
    return {
      songAsg: {},
      lyric: "",
      flag: true,
      titleMore: "展开...",
      commentCount: 0,
      type: "song",
    };
  },
  components: {
    Comment,
  },
  mounted() {
    this.getSongAsg();
  },
  methods: {
    async getSongAsg() {
      let result = await reqSongAsg(this.$route.params.id);
      this.songAsg = result.data.songs[0];
      let result1 = await reqGetLyric(this.$route.params.id);

      this.lyric = result1.data.lrc.lyric;
      //正则表达式获取歌词
      this.lyric = this.lyric.split(/\s*\n*\[.*?\]\s*/).filter((v) => !!v);
    },
    clickMore() {
      if (this.flag) {
        if (this.$refs.titleMore.offsetHeight >= 340) {
          this.$refs.titleMore.style.height = "85%";
          this.flag = false;
          this.titleMore = "收缩...";
        }
      } else {
        this.$refs.titleMore.style.height = "300px";
        this.flag = true;
        this.titleMore = "展开...";
      }
    },
    //接收子组件的数据
    getCommentCount(count) {
      this.commentCount = count;
    },
    //点击播放音乐
    playMusic(id) {
      this.$store.dispatch("getSongAsg", id);
    },
  },
  computed: {
    songDeatil: function () {
      if (Object.keys(this.songAsg).length > 0) {
        return {
          id: this.songAsg.id,
          name: this.songAsg.name,
          arName: this.songAsg.ar[0].name,
          arId: this.songAsg.ar[0].id,
          alName: this.songAsg.al.name,
          alId: this.songAsg.al.id,
          alPicUrl: this.songAsg.al.picUrl,
        };
      }
    },
  },
};
</script>

<style scoped lang='less'>
.songAsg {
  margin-top: 15px;
  display: flex;
  .conter-left {
    padding-left: 20px;
    padding-right: 20px;
    .img {
      width: 206px;
      height: 205px;
      position: relative;
      z-index: 1;
      img {
        z-index: -1;
        position: absolute;
        left: 34px;
        top: 34px;
      }
      .img-msk {
        width: 206px;
        height: 205px;
        background: url("./img/disk.png") no-repeat -144px -584px;
      }
    }
  }
  .conter-right {
    .songAsg-title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      i {
        display: inline-block;
        width: 54px;
        height: 26px;
        background: url("./img/icon.png") no-repeat 0 -463px;
      }
      h3 {
        font-size: 24px;
        color: #333333;
        margin-left: 10px;
      }
    }

    .songAsg-art {
      p {
        color: #999999;
        margin: 8px 0;
      }
      a {
        color: #0c73c2;
      }
    }

    .songAsg-btn {
      display: flex;
      // 公共样式
      span {
        font-style: normal;
      }

      .btn-play {
        display: flex;
        i {
          display: inline-block;
          width: 94px;
          height: 31px;
          background: url("./img/button2.png") no-repeat 0 -632px;
          span {
            height: 31px;
            line-height: 34px;
            color: #ffffff;
            padding-left: 40px;
            font-size: 14px;
          }
        }
        &::after {
          content: "";
          display: inline-block;
          height: 31px;
          width: 5px;
          background: url("./img/button2.png") no-repeat -245px -675px;
        }
      }
      .btn-add {
        padding: 0 5px;
        display: flex;
        i {
          display: inline-block;
          width: 58px;
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

      .btn-share {
        display: flex;
        i {
          display: inline-block;
          width: 58px;
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

      .btn-down {
        padding: 0 5px;
        display: flex;
        i {
          display: inline-block;
          width: 58px;
          height: 31px;
          background: url("./img/button2.png") no-repeat 0 -2760px;
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

      .btn-commit {
        display: flex;
        i {
          display: inline-block;
          // width: 58px;
          height: 31px;
          background: url("./img/button2.png") no-repeat 0 -1464px;
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

    .title {
      display: flex;
      flex-direction: column;
      padding-top: 40px;
      white-space: pre-wrap;
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
      text-overflow: ellipsis;
      height: 300px;
      color: #333333;
      margin-bottom: 0px;
    }
    .more {
      color: #0c73c2;
      cursor: pointer;
    }
  }
}
.m-right {
  float: right;
  .right_background {
    width: 250px;
    height: 780px;
    background: url("./img/background.png") no-repeat;
  }
}
</style>