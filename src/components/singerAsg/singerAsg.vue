<template>
  <div class="main">
    <div class="m-wrap">
      <div class="m-left" v-if="detail">
        <div class="singerAsg">
          <div class="singerAsg-title">
            <h2>{{ detail.name }}</h2>
          </div>
          <div class="singerAsg-img">
            <img :src="detail.cover + '?param=640y300'" alt="" />
          </div>
          <div class="singerAsg-table">
            <ul class="table-header">
              <li
                :class="tableType == 'singList' ? 'table-header-active' : ''"
                @click="changeTable('singList')"
              >
                热门作品
              </li>
              <li
                :class="tableType == 'albumList' ? 'table-header-active' : ''"
                @click="changeTable('albumList'), changeAlbum()"
              >
                所有专辑
              </li>
              <li
                :class="tableType == 'mvList' ? 'table-header-active' : ''"
                @click="changeTable('mvList')"
              >
                相关MV
              </li>
              <li
                :class="tableType == 'artAsg' ? 'table-header-active' : ''"
                @click="changeTable('artAsg'), changeArtAsg()"
              >
                艺人介绍
              </li>
            </ul>
            <!-- 歌曲列表 -->
            <ul
              :class="
                tableType == 'singList'
                  ? 'table-singList table-active'
                  : 'table-singList'
              "
            >
              <div class="singerAsg-btn">
                <a href="javascript:;" class="btn-play">
                  <i class="iconfont icon-play"><span>播放</span></i>
                </a>
                <a href="javascript:;" class="btn-add">
                  <i class="iconfont icon-add"><span>收藏热门50</span></i>
                </a>
                <a href="javascript:;" class="btn-hot">
                  <i class="iconfont icon-hot"><span>热门单曲 </span></i>
                </a>
              </div>
              <li v-for="(item, index) in hotSong" :key="item.id">
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
                <span class="song-album" @click="goAlbumAsg(item.alId)">{{
                  item.alName
                }}</span>
              </li>
            </ul>
            <!-- 专辑列表 -->
            <ul
              class="table-albumList"
              :class="
                tableType == 'albumList'
                  ? 'table-albumList table-active'
                  : 'table-albumList'
              "
            >
              <div class="table-flex">
                <li v-for="(item2, index) in hotAlbums" :key="item2.id">
                  <div class="img">
                    <img
                      :src="item2.picUrl + '?param=120y120'"
                      @click="goAlbumAsg(item2.id)"
                      alt=""
                    />
                    <i>1</i>
                  </div>
                  <p class="albumList-name" @click="goAlbumAsg(item2.id)">
                    {{ item2.name }}
                  </p>
                  <span class="albumList-time">{{
                    $moment(item2.publishTime).format("YYYY.MM.DD")
                  }}</span>
                </li>
              </div>
              <nav class="page">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="albumCount"
                  :page-size="12"
                  @prev-click="lastPage"
                  @next-click="nextPage"
                  @current-change="clickPage"
                >
                </el-pagination>
              </nav>
            </ul>
            <!-- mv列表  -->
            <ul
              class="table-mvList"
              :class="tableType == 'mvList' ? 'mvList table-active' : 'mvList'"
            >
              <p>还没完善</p>
            </ul>
            <!-- 歌星简介 -->
            <div
              class="table-artAsg"
              :class="
                tableType == 'artAsg'
                  ? 'table-artAsg table-active'
                  : 'table-artAsg'
              "
            >
              <h3>{{ detail.name }}</h3>
              <div>
                <p>
                  {{ singerAsg }}
                </p>
                <li v-for="(item4, index) in introduction" :key="index">
                  <h3>{{ item4.ti }}</h3>
                  <p class="artAsg-p">{{ item4.txt }}</p>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-right">
        <div class="right_background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableType: "singList",
      //发送歌手的专辑列表参数
      singerAlbumInfo: {
        id: 0,
        limit: 12,
        offset: 0,
      },
      //专辑数量
      albumCount: 0,
      //歌手详情介绍
      singerAsg: "",
    };
  },
  mounted() {
    // //获取歌手详情
    // this.$store.dispatch("getSingerDetail", this.$route.params.id);
    //获取歌手单曲
    this.$store.dispatch("getSingerSong", this.$route.params.id);
  },
  methods: {
    //切换table页面
    changeTable(type) {
      this.tableType = type;
    },
    //切换到所有专辑页面
    changeAlbum() {
      //获取歌手专辑
      this.singerAlbumInfo.id = this.$route.params.id;
      this.$store.dispatch("getSingerAlbum", this.singerAlbumInfo);
    },
    //点击上一页
    lastPage(val) {
      this.singerAlbumInfo.offset = (val - 1) * 12;
      this.$store.dispatch("getSingerAlbum", this.singerAlbumInfo);
    },
    //点击下一页
    nextPage(val) {
      this.singerAlbumInfo.offset = (val - 1) * 12;
      this.$store.dispatch("getSingerAlbum", this.singerAlbumInfo);
    },
    // 点击当前页
    clickPage(val) {
      this.singerAlbumInfo.offset = (val - 1) * 12;
      this.$store.dispatch("getSingerAlbum", this.singerAlbumInfo);
    },
    //点击切换歌手描述
    changeArtAsg() {
      this.$store.dispatch("getSingerDesc", this.$route.params.id);
    },
    //点击跳转专辑页面
    goAlbumAsg(id) {
      this.$router.push({
        path: `/albumasg/${id}`,
      });
    },
    //点击跳转歌曲页面
    goSongAsg(id) {
      this.$router.push({
        path: `/songasg/${id}`,
      });
    },
    //点击播放音乐
    playSong(id) {
      this.$store.dispatch("getSongAsg", id);
    },
  },
  computed: {
    ...mapState(["singerSong", "singerAlbum", "singerDesc"]),
    detail: function () {
      if (Object.keys(this.singerSong).length > 0) {
        return {
          id: this.singerSong.artist.id,
          name: this.singerSong.artist.name,
          cover: this.singerSong.artist.picUrl,
        };
      }
    },
    hotSong: function () {
      if (Object.keys(this.singerSong).length > 0) {
        let arr = [];
        arr = this.singerSong.hotSongs.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let alId = item.al.id;
          let alName = item.al.name;
          let dt = item.dt;
          return { id, name, alId, alName, dt };
        });
        return arr;
      }
    },
    hotAlbums: function () {
      if (Object.keys(this.singerAlbum).length > 0) {
        let arr = [];
        this.albumCount = this.singerAlbum.artist.albumSize;
        arr = this.singerAlbum.hotAlbums.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picUrl = item.picUrl;
          let publishTime = item.publishTime;
          return { id, name, picUrl, publishTime };
        });
        return arr;
      }
    },
    introduction: function () {
      {
        if (Object.keys(this.singerDesc).length > 0) {
          let arr = [];
          this.singerAsg = this.singerDesc.briefDesc;
          arr = this.singerDesc.introduction.map((item, index) => {
            let ti = item.ti;
            let txt = item.txt;
            return { ti, txt };
          });
          return arr;
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.singerAsg {
  width: 642px;
  margin-left: 20px;
  .singerAsg-title {
    h2 {
      font-size: 24px;
      color: #333333;
      padding-bottom: 5px;
    }
  }
  .singerAsg-img {
    img {
      border: 1px solid #b7af79;
    }
  }
  .singerAsg-table {
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 39px;
      background: url("./img/tab.png");
      border-left: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
      li {
        width: 25%;
        text-align: center;
        height: 39px;
        line-height: 39px;
        cursor: pointer;
        &:hover {
          background: url("./img/tab.png") -1px -45px;
          .table-header-active {
            background: url("./img/tab.png") -1px -90px;
          }
        }
      }
      .table-header-active {
        background: url("./img/tab.png") -1px -90px !important;
        border-left: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
      }
    }

    .table-singList {
      display: none;
      margin-top: 20px;
      min-height: 255px;
      .singerAsg-btn {
        margin-bottom: 10px;
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
            background: url("./img/button2.png") no-repeat 0 -633px;
            span {
              display: inline-block;
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
            width: 5px;
            height: 31px;
            background: url("./img/button2.png") no-repeat -245px -676px;
          }
        }
        .btn-add {
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
        .btn-hot {
          padding: 0 5px;
          display: flex;
          margin-left: 330px;
          i {
            display: inline-block;
            // width: 58px;
            height: 31px;
            background: url("./img/button2.png") no-repeat 0 -59px;
            span {
              height: 31px;
              line-height: 34px;
              color: #333333;
              padding-left: 15px;
              font-size: 14px;
              padding-right: 10px;
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
      }
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
          padding-left: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
        }
        .song-time {
          width: 100px;

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

    .table-albumList {
      margin-top: 15px;
      display: flex;

      display: none;
      .table-flex {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 145px;
          padding-right: 15px;
          padding-bottom: 18px;
          .img {
            width: 145px;
            height: 120px;
            background: url("./img/disk.png") no-repeat -170px -850px;
            cursor: pointer;
          }
          .albumList-name {
            display: block;
            font-size: 14px;
            color: #000000;
            margin: 8px 0px;
            cursor: pointer;
          }
          .albumList-time {
            color: #666666;
            font-size: 12px;
          }
        }
      }

      .page {
        margin: 20px auto;
        font-size: 0;
        // margin-left: 400px;
        display: flex;
        justify-content: center;
      }
    }

    .table-mvList {
      display: none;
      min-height: 255px;
    }
    .table-artAsg {
      display: none;
      margin-top: 15px;
      .artAsg-p {
        white-space: pre-line;
      }
      h3 {
        font-size: 14px;
        color: #333333;
        border-left: 3px solid #c10d0c;
        text-indent: 10px;
      }
      div {
        color: #666666;
        text-indent: 2rem;
        padding: 6px 0;
        min-height: 255px;
        p {
          line-height: 20px;
        }
      }
      li {
        h3 {
          text-indent: 0;
          border-left: none;
        }
        p {
          text-indent: 0;
        }
      }
    }

    .table-active {
      display: block;
    }
  }
}

.m-right {
  float: right;
  .right_background {
    width: 250px;
    height: 900px;
    background: url("./img/Snipaste_2022-09-03_11-47-14.png") no-repeat;
  }
}
</style>