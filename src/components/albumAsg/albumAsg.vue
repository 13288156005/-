<template>
  <div class="main">
    <div class="m-wrap">
      <div class="m-left">
        <div class="albumAsg-header">
          <div class="albumAsg-top">
            <div class="top-img">
              <img :src="album.picUrl + '?param=177y177'" alt="" />
            </div>
            <div class="top-asg">
              <div class="asg-title">
                <i></i>
                <h2>{{ album.name }}</h2>
              </div>
              <div class="asg-artime">
                <p>
                  歌手:<a href="javascript:;">{{ album.arName }}</a>
                </p>
                <p>
                  发行时间：{{
                    $moment(album.publishTime).format("YYYY-MM-DD")
                  }}
                </p>
                <p>发行公司：{{ album.company }}</p>
              </div>
              <div class="asg-btn">
                <a href="javascript:;" class="btn-play">
                  <i class="iconfont icon-play"><span>播放</span></i>
                </a>
                <a href="javascript:;" class="btn-add">
                  <i class="iconfont icon-add"><span>收藏</span></i>
                </a>
                <a href="javascript:;" class="btn-share">
                  <i class="iconfont icon-add"
                    ><span>（{{ album.shareCount }}）</span></i
                  >
                </a>
                <a href="javascript:;" class="btn-down">
                  <i class="iconfont icon-add"><span>下载</span></i>
                </a>
                <a href="javascript:;" class="btn-commit">
                  <i class="iconfont icon-add"
                    ><span>（{{ album.commentCount }}）</span></i
                  >
                </a>
              </div>
            </div>
          </div>
          <div class="albumAsg-bottom">
            <h3>专辑介绍:</h3>
            <div class="bottom-desc">
              <div class="txt">
                {{ album.description }}
              </div>
            </div>
          </div>
        </div>
        <div class="albumAsg-songList">
          <div class="songList-body">
            <h3>包含歌曲列表</h3>
            <span v-if="songs">{{ songs.length }}首歌</span>
          </div>
          <div class="songList-title">
            <p class="songTitle">歌曲标题</p>
            <p class="songTime">时长</p>
            <p class="songSinger">歌手</p>
          </div>
          <ul class="songList-conter">
            <li v-for="(item, index) in songs" :key="item.id">
              <span class="song-index">{{ index + 1 }}</span>
              <i @click="playSong(item.id)"></i>
              <p class="song-name" @click="goSongAsg(item.id)">
                {{ item.name }}
              </p>
              <span class="song-time">
                <p>{{ $moment(item.dt).format("mm:ss") }}</p>
                <nav class="play-nav">
                  <a href="javascript:;" class="m-add"></a>
                  <a href="javascript:;" class="m-collection"></a>
                  <a href="javascript:;" class="m-share"></a>
                  <a href="javascript:;" class="m-download"></a>
                </nav>
              </span>
              <span class="song-album" @click="goSingerAsg(item.arId)">{{
                item.ar
              }}</span>
            </li>
          </ul>
        </div>
        <Comment :send="type"></Comment>
      </div>
      <div class="m-right">
        <div class="right_background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../comment/comment.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      type: "album",
    };
  },
  mounted() {
    //获取专辑详情
    this.$store.dispatch("getAlbumDetail", this.$route.params.id);
  },
  components: {
    Comment,
  },
  methods: {
    //点击跳转歌手页面
    goSingerAsg(id) {
      this.$router.push({
        path: `/singerAsg/${id}`,
      });
    },
    //点击跳转单曲页面
    goSongAsg(id) {
      this.$router.push({
        path: `/songAsg/${id}`,
      });
    },
    //点击播放音乐
    playSong(id) {
      this.$store.dispatch("getSongAsg", id);
    },
  },
  computed: {
    ...mapState(["albumDetail"]),
    album: function () {
      if (Object.keys(this.albumDetail).length > 0) {
        return {
          id: this.albumDetail.album.id,
          name: this.albumDetail.album.name,
          arName: this.albumDetail.album.artists[0].name,
          arId: this.albumDetail.album.artists[0].id,
          publishTime: this.albumDetail.album.publishTime,
          company: this.albumDetail.album.company,
          picUrl: this.albumDetail.album.picUrl,
          description: this.albumDetail.album.description,
          shareCount: this.albumDetail.album.info.shareCount,
          commentCount: this.albumDetail.album.info.commentCount,
        };
      }
    },
    songs: function () {
      if (Object.keys(this.albumDetail).length > 0) {
        let arr = [];
        arr = this.albumDetail.songs.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let dt = item.dt;
          let ar = item.ar[0].name;
          let arId = item.ar[0].id;
          return { id, name, dt, ar, arId };
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.m-left {
  padding-left: 40px;
  padding-top: 40px;

  .albumAsg-header {
    .albumAsg-top {
      display: flex;
      .top-img {
        width: 210px;
        height: 178px;
        background: url("./img/disk.png") no-repeat 0 -985px;
      }
      .top-asg {
        margin-left: 20px;
        .asg-title {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          i {
            display: inline-block;
            width: 54px;
            height: 24px;
            background: url("./img/icon.png") no-repeat 0 -186px;
          }
          h2 {
            font-size: 18px;
            color: #333333;
            margin-left: 10px;
          }
        }
        .asg-artime {
          p {
            color: #666666;
            padding: 5px 0;
          }
          a {
            color: #0c73c2;
          }
        }
        .asg-btn {
          display: flex;
          margin-top: 25px;
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
      }
    }

    .albumAsg-bottom {
      padding-top: 20px;
      h3 {
        color: #333333;
      }
      .bottom-desc {
        color: #666666;
        white-space: pre-line;
        text-indent: 2rem;
        line-height: 25px;
        .txt {
          min-height: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .more {
          height: 25px;
          color: #0c73c2;
          cursor: pointer;
        }
      }
    }
  }
  .albumAsg-songList {
    .songList-body {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #c20c0c;
      padding-bottom: 3px;
      h3 {
        color: #333333;
        font-size: 20px;
      }
      span {
        color: #666666;
        font-size: 12px;
        margin-left: 20px;
      }
    }
    .songList-title {
      display: flex;
      align-items: center;
      height: 36px;
      background: url("./img/table.png");
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      p {
        color: #666666;
        border-left: 2px solid #e1e1e1;
        height: 36px;
        line-height: 36px;
        text-indent: 8px;
      }
      .songTitle {
        margin-left: 74px;
        margin-right: 286px;
      }
      .songTime {
        margin-right: 60px;
      }
    }
    .songList-conter {
      li {
        display: flex;
        align-items: center;
        height: 30px;
        background: #f7f7f7;
        &:nth-child(odd) {
          background: #ffffff;
        }
        .song-index {
          width: 40px;
          text-align: center;
        }
        i {
          display: inline-block;
          // padding: 0 5px;
          width: 17px;
          height: 17px;
          background: url("./img/table.png") no-repeat 0 -103px;
          cursor: pointer;
          &:hover {
            background: url("./img/table.png") no-repeat 0 -128px;
          }
        }
        .song-name {
          width: 300px;
          padding-left: 30px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
        }
        .song-time {
          width: 100px;
          padding-left: 40px;
          .play-nav {
            float: left;
            display: none;

            .m-add {
              float: left;
              margin-top: 2px;
              width: 13px;
              height: 13px;
              background: url(./img/icon.png) no-repeat 0 -700px;
            }
            .m-collection {
              float: left;
              width: 18px;
              height: 16px;
              margin: 2px 0 0 4px;
              background: url(./img/table.png) no-repeat 0 -174px;
            }
            .m-share {
              float: left;
              width: 18px;
              height: 16px;
              margin: 2px 0 0 4px;
              background: url(./img/table.png) no-repeat 0 -195px;
            }
            .m-download {
              float: left;
              width: 18px;
              height: 16px;
              margin: 2px 0 0 4px;
              background: url(./img/table.png) no-repeat -81px -174px;
            }
          }
        }
        .song-album {
          width: 173px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
        }

        &:hover {
          .song-time {
            p {
              display: none;
            }
            .play-nav {
              display: block;
            }
          }
        }
      }
    }
  }
}
.m-right {
  float: right;
  .right_background {
    width: 230px;
    height: 900px;
    background: url("./img/Snipaste_2022-09-03_11-56-22.png") no-repeat -20px 0px;
  }
}
</style>