<template>
  <main class="main">
    <div class="m-wrap">
      <div class="content">
        <el-input
          placeholder="请输入内容"
          v-model="searchInfo.keywords"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchButton"
          ></el-button>
        </el-input>

        <div class="table">
          <!-- <p>
            搜索"{{ searchInfo.keywords }}"，找到<em>{{
              search.result.songCount || search.result.playlistCount || ""
            }}</em
            >首单曲
          </p> -->
          <p>
            搜索"{{ searchInfo.keywords }}"，找到<em>{{ searchTotal || "" }}</em
            >首单曲
          </p>
          <ul class="table_ul">
            <li
              @click="changeSong"
              :class="searchInfo.type == 1 ? 'li_active' : ''"
            >
              单曲
            </li>
            <li
              @click="changeSinger"
              :class="searchInfo.type == 100 ? 'li_active' : ''"
            >
              歌手
            </li>
            <li
              @click="changeAlbum"
              :class="searchInfo.type == 10 ? 'li_active' : ''"
            >
              专辑
            </li>
            <li>视频</li>
            <li>歌词</li>
            <li
              @click="changePlayList"
              :class="searchInfo.type == 1000 ? 'li_active' : ''"
            >
              歌单
            </li>
            <li>声音主播</li>
            <li>用户</li>
          </ul>

          <!-- 单曲 -->
          <div v-if="searchInfo.type == 1" class="songSrc">
            <ul>
              <li v-for="(item, index) in songSearchMsg" :key="item.id">
                <a href="javascript:;" @click="playSong(item.id)"></a>
                <p @click="goSongAsg(item.id)">
                  {{ item.name }}<span>- {{ item.alia }}</span>
                </p>
                <div class="table_icon">
                  <nav class="play-nav">
                    <a href="javascript:;" class="m-add"></a>
                    <a href="javascript:;" class="m-collection"></a>
                    <a href="javascript:;" class="m-share"></a>
                    <a href="javascript:;" class="m-download"></a>
                  </nav>
                </div>
                <span>{{ item.ar }}</span>
                <div class="ar">{{ item.al }}</div>
                <div class="time">{{ item.dt | dataFormMatch }}</div>
              </li>
            </ul>
            <div class="clearfloat"></div>
          </div>

          <!-- 歌单 -->
          <div v-if="searchInfo.type == 1000" class="songList">
            <ul>
              <li v-for="(item2, index2) in playList" :key="item2.id">
                <a href="javascript:;" @click="PlaySongList(item2.id)"></a>
                <img :src="item2.coverImgUrl" @click="goPlayList(item2.id)" />
                <p @click="goPlayList(item2.id)">{{ item2.name }}</p>
                <div class="table_icon">
                  <nav class="play-nav">
                    <a href="javascript:;" class="m-add"></a>
                    <a href="javascript:;" class="m-collection"></a>
                    <a href="javascript:;" class="m-share"></a>
                  </nav>
                </div>
                <span class="sum">{{ item2.trackCount }}首</span>
                <span class="setUp">by {{ item2.nickname }}</span>
                <div class="collect">收藏：{{ item2.bookCount }}</div>
                <div class="people">收听：{{ item2.playCount }}</div>
              </li>
            </ul>
            <div class="clearfloat"></div>
          </div>

          <!-- 歌手 -->
          <div v-if="searchInfo.type == 100" class="singerList">
            <ul>
              <li v-for="(item3, index) in singerList" :key="item3.id">
                <a href="javascript">
                  <img :src="item3.img1v1Url" />
                  <p>{{ item3.name }}</p>
                </a>
              </li>
            </ul>
          </div>

          <!-- 专辑 -->
          <div v-if="searchInfo.type == 10" class="albumList">
            <ul>
              <li v-for="(item4, index) in albumList" :key="item4.id">
                <img :src="item4.picUrl" />
                <span class="albumList_bg"></span>
                <a
                  href="javascript:;"
                  class="playAlbumList"
                  @click="playSongList(item4.id)"
                ></a>
                <p>
                  <a href="javascript:;">{{ item4.name }}</a>
                </p>
                <span>
                  <a href="javascript:;">{{ item4.nickname }}</a>
                </span>
              </li>
            </ul>
          </div>

          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              @next-click="nextPage"
              @prev-click="prevPage"
              @current-change="currentPage"
              :total="searchTotal"
              :page-size="30"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchInfo: {
        keywords: "",
        type: 1,
        offset: 0,
      },
      playDetailInfo: {
        cookie: "",
        id: "",
      },
    };
  },
  mounted() {
    this.searchInfo.keywords = this.$route.query.keywords;
    this.$store.dispatch("search", this.searchInfo);
  },
  methods: {
    //点击播放音乐
    playSong(id) {
      this.$store.dispatch("getSongAsg", id);
    },
    //下一页
    nextPage(num) {
      this.searchInfo.offset = (num - 1) * 30;
      this.$store.dispatch("search", this.searchInfo);
    },
    //上一页
    prevPage(num) {
      this.searchInfo.offset = (num - 1) * 30;
      this.$store.dispatch("search", this.searchInfo);
    },
    //当前页
    currentPage(num) {
      this.searchInfo.offset = (num - 1) * 30;
      this.$store.dispatch("search", this.searchInfo);
    },
    //点击搜索按钮
    searchButton() {
      this.searchInfo.offset = 0;
      this.$store.dispatch("search", this.searchInfo);
    },
    //点击切换单曲
    changeSong() {
      this.searchInfo.type = 1;
      this.$store.dispatch("search", this.searchInfo);
    },
    //点击切换歌单
    changePlayList() {
      this.searchInfo.type = 1000;
      this.$store.dispatch("search", this.searchInfo);
    },
    //点击跳转歌单页面
    goPlayList(id) {
      this.$router.push({ path: `/playlist/${id}` });
    },
    //点击播放歌单
    PlaySongList(id) {
      this.$store.dispatch("getPlayListSong", id);
    },
    //点击切换歌手
    changeSinger() {
      this.searchInfo.type = 100;
      this.$store.dispatch("search", this.searchInfo);
    },
    //点击切换专辑
    changeAlbum() {
      this.searchInfo.type = 10;
      this.$store.dispatch("search", this.searchInfo);
    },
    //点击专辑播放按钮
    playSongList(id) {
      //获取location的user用户信息
      let user = JSON.parse(localStorage.getItem("userName"));
      this.playDetailInfo.id = id;
      this.playDetailInfo.cookie = user.cookie;
      this.$store.dispatch("GetPlayListSongAll", this.playDetailInfo);
    },
    //跳转歌曲详情页面
    goSongAsg(id) {
      this.$router.push({ path: `/songasg/${id}`, query: { type: "song" } });
    },
  },
  computed: {
    ...mapState(["search"]),
    songSearchMsg: function () {
      let arr;
      if (this.searchInfo.type == 1) {
        try {
          arr = this.search.result.songs.map((item, index) => {
            let id = item.id;
            let name = item.name;
            let alia = item.alia[0];
            let ar = item.ar[0].name;
            let arId = item.ar[0].id;
            let al = item.al.name;
            let alId = item.al.id;
            let dt = item.dt;
            return { id, name, alia, ar, arId, al, alId, dt };
          });
          return arr;
        } catch (e) {}
      }
    },
    searchTotal: function () {
      if (Object.keys(this.search).length > 0) {
        return (
          this.search.result.songCount ||
          this.search.result.playlistCount ||
          this.search.result.artistCount ||
          this.search.result.albumCount
        );
      }
    },

    playList: function () {
      let arr;
      if (this.searchInfo.type == 1000) {
        try {
          arr = this.search.result.playlists.map((item, index) => {
            let id = item.id;
            let name = item.name;
            let coverImgUrl = item.coverImgUrl + "?param=46y46";
            let trackCount = item.trackCount;
            let nickname = item.creator.nickname;
            let bookCount = item.bookCount;
            let playCount = item.playCount;
            return {
              id,
              name,
              coverImgUrl,
              trackCount,
              nickname,
              bookCount,
              playCount,
            };
          });
          return arr;
        } catch (e) {}
      }
    },

    singerList: function () {
      let arr;
      try {
        arr = this.search.result.artists.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let img1v1Url = item.img1v1Url + "?param=130y130";
          return { id, name, img1v1Url };
        });
        return arr;
      } catch (e) {}
    },

    albumList: function () {
      let arr;
      try {
        arr = this.search.result.albums.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picUrl = item.picUrl + "?param=130y130";
          let nickname = item.artist.name;
          let artistId = item.artist.id;
          return { id, name, picUrl, nickname, artistId };
        });
        return arr;
      } catch (e) {}
    },
  },
  //过滤器
  filters: {
    dataFormMatch: (time) => {
      let m = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
      let s = parseInt((time % (1000 * 60)) / 1000);
      //补零
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },
  },
};
</script>

<style scoped lang='less'>
.content {
  .input-with-select {
    width: 426px;
    margin-left: 25%;
    margin-top: 20px;
    background: #f8f8f8;
  }

  .table {
    margin-top: 20px;
    padding: 0 20px;
    background: #fff;
    border-radius: 4px;
    p {
      margin-bottom: 20px;
      font-size: 12px;
      color: #999;
      em {
        color: #c20c0c;
      }
    }
    .table_ul {
      display: flex;
      height: 38px;
      background: url("./img/tab.png");
      li {
        width: 100%;
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .li_active {
        background: url("./img/tab.png") 0 -90px;
        border-right: 1px solid #cccccc;
        border-bottom: none;
      }
    }

    .songSrc {
      // display: none;
      ul {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          align-items: center;
          line-height: 38px;
          width: 934px;
          height: 38px;
          background: #ffffff;
          border: none;
          text-align: left;
          &:nth-child(even) {
            background: #f7f7f7;
          }
          a {
            display: inline-block;
            margin-right: 20px;
            height: 18px;
            width: 18px;
            background: url("./img/table.png") 0 -103px;
            &:hover {
              background: url("./img/table.png") 0 -128px;
            }
          }
          p {
            color: #0c73c2;
            width: 370px;
            margin-bottom: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span {
              color: #aeaeae;
            }
          }
          .table_icon {
            width: 143px;
            .play-nav {
              float: left;
              display: none;
              margin-top: -2px;
              margin: 0 30px;
              .m-add {
                float: left;
                margin-top: 2px;
                width: 13px;
                height: 13px;
                margin: 2px 0 0 4px;
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
          span {
            width: 154px;
          }
          .ar {
            width: 153px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .time {
          }

          &:hover {
            background: #f2f2f2;
            .play-nav {
              display: block;
            }
          }
        }
      }
    }

    //歌单
    .songList {
      ul {
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          height: 60px;
          align-items: center;
          background: #ffffff;
          border: none;
          text-align: left;
          &:nth-child(even) {
            background: #f7f7f7;
          }
          a {
            display: inline-block;
            margin-right: 20px;
            height: 18px;
            width: 18px;
            background: url("./img/table.png") 0 -103px;
            &:hover {
              background: url("./img/table.png") 0 -128px;
            }
          }
          p {
            margin-left: 20px;
            width: 260px;
            margin-bottom: 0;
            cursor: pointer;
            color: #333333;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .table_icon {
            width: 100px;
            .play-nav {
              float: left;
              display: none;
              margin-top: -2px;
              .m-add {
                float: left;
                margin-top: 2px;
                width: 13px;
                height: 13px;
                margin: 2px 0 0 4px;
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
            }
          }

          .sum {
            width: 60px;
            color: #999999;
          }
          .setUp {
            width: 180px;
            color: #666666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .collect {
            margin-left: 20px;
            width: 98px;
            color: #999999;
          }
          .people {
            width: 98px;
            color: #999999;
          }

          &:hover {
            background: #f2f2f2;
            .play-nav {
              display: block;
            }
          }
        }
      }
    }

    //歌手
    .singerList {
      ul {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        justify-content: space-between;
        column-gap: 20px;
        row-gap: 15px;
        &::after {
          content: "";
          display: block;
          flex: 1;
        }
        li {
          margin: 0 5px;

          a {
            p {
              color: #000000;
              margin-top: 10px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }

    //专辑
    .albumList {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 20px;
        column-gap: 40px;
        row-gap: 15px;
        &::after {
          content: "";
          display: block;
          flex: 1;
        }
        li {
          position: relative;
          width: 155px;
          .playAlbumList {
            width: 18px;
            height: 18px;
            // display: inline-block;
            display: none;
            // display: inline-block;
            background: url("./img/table.png") 0 -128px;
            position: absolute;
            right: 27px;
            top: 110px;
            &:hover {
              display: block;
            }
          }

          .albumList_bg {
            // display: inline-block;
            position: absolute;
            left: 0;
            width: 153px;
            height: 130px;
            background: url("./img/coverall.png") 0 -845px;
            cursor: pointer;
            &:hover + .playAlbumList {
              display: block;
            }
          }
          p {
            margin-top: 10px;
            margin-bottom: 10px;
            width: 135px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            color: #0c73c2;
            a {
              width: 100%;
              font-size: 14px;
              color: #0c73c2;
            }
          }
          span {
            width: 135px;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            a {
              width: 100%;
              color: #666666;
            }
          }
        }
      }
    }
  }
}

.page {
  //居中
  display: flex;
  justify-content: center;
  margin: 40px 0;
}
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
</style>