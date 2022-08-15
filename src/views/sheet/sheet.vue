<template>
  <div>
    <main class="body">
      <div class="s-wrap">
        <section class="sheet">
          <header class="sheet-title">
            <h2>
              <span>{{ showCatName }}</span>
              <a class="sheet-title-class" @click="showCatList">
                <span>选择分类<i></i></span>
              </a>
            </h2>
            <nav class="classify">
              <a href="#" class="hot-sheet">热门</a>
              <a href="#" class="new-sheet">最新</a>
            </nav>
          </header>
          <div class="catListBox" ref="catListBox">
            <div class="bd">
              <h3>
                <a href="javascript:;" @click="changeStyle('全部')">全部风格</a>
              </h3>
              <dl>
                <div class="catListLeft">
                  <i></i>
                  <span>语种</span>
                </div>
                <div class="catListRight">
                  <p v-for="(item0, index0) in language" :key="index0">
                    <a
                      href="javascript:;"
                      @click="changeStyle(item0)"
                      :class="showCatName == item0 ? 'addBackground' : ''"
                      >{{ item0 }}</a
                    >
                    <span>|</span>
                  </p>
                </div>
              </dl>
              <dl>
                <div class="catListLeft">
                  <i></i>
                  <span>风格</span>
                </div>
                <div class="catListRight">
                  <p v-for="(item1, index1) in style" :key="index1">
                    <a
                      href="javascript:;"
                      @click="changeStyle(item1)"
                      :class="showCatName == item1 ? 'addBackground' : ''"
                      >{{ item1 }}</a
                    >
                    <span>|</span>
                  </p>
                </div>
              </dl>
              <dl>
                <div class="catListLeft">
                  <i></i>
                  <span>场景</span>
                </div>
                <div class="catListRight">
                  <p v-for="(item2, index2) in scene" :key="index2">
                    <a
                      href="javascript:;"
                      @click="changeStyle(item2)"
                      :class="showCatName == item2 ? 'addBackground' : ''"
                      >{{ item2 }}</a
                    >
                    <span>|</span>
                  </p>
                </div>
              </dl>
              <dl>
                <div class="catListLeft">
                  <i></i>
                  <span>情感</span>
                </div>
                <div class="catListRight">
                  <p v-for="(item3, index3) in emotion" :key="index3">
                    <a
                      href="javascript:;"
                      @click="changeStyle(item3)"
                      :class="showCatName == item3 ? 'addBackground' : ''"
                      >{{ item3 }}</a
                    >
                    <span>|</span>
                  </p>
                </div>
              </dl>
              <dl>
                <div class="catListLeft">
                  <i></i>
                  <span>主题</span>
                </div>
                <div class="catListRight">
                  <p v-for="(item4, index4) in subject" :key="index4">
                    <a
                      href="javascript:;"
                      @click="changeStyle(item4)"
                      :class="showCatName == item4 ? 'addBackground' : ''"
                      >{{ item4 }}</a
                    >
                    <span>|</span>
                  </p>
                </div>
              </dl>
            </div>
          </div>
          <ul class="h-music clearFix">
            <li
              v-for="(item, index) in playListAll"
              :key="item.id"
              @click="goPlayList(item.id)"
            >
              <div class="h-img">
                <a href="javascript:;">
                  <img :src="item.coverImgUrl" />
                  <span class="bg"></span>
                  <span class="icon"></span>
                  <span class="txt">{{ item.playCount }}</span>
                </a>
                <a href="javascript:;" class="play" title="播放"></a>
              </div>
              <p class="playListName">{{ item.name }}</p>
              <span class="playListNickName"
                >by <strong>{{ item.nickname }}</strong></span
              >
            </li>
          </ul>
          <div class="pageWrap">
            <nav class="page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="playList.total"
                :page-size="35"
                @prev-click="lastPage"
                @next-click="nextPage"
                @current-change="clickPage"
              >
              </el-pagination>
            </nav>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      playListInfo: {
        cat: "全部",
        limit: 35,
        offset: 0,
        order: "hot",
      },
      //五个分类
      language: [],
      style: [],
      scene: [],
      emotion: [],
      subject: [],
      //控制分类开关
      flag: true,
      //显示分类mc
      showCatName: "全部",
    };
  },
  mounted() {
    //发起axios请求，获取歌单列表
    this.$store.dispatch("getPlayList", this.playListInfo);
    //发起axios请求,获取歌单分类名称
    this.$store.dispatch("getPlayListCatList");
  },
  computed: {
    ...mapState({
      playList: (state) => state.playListAll,
      playListCatList: (state) => state.playListCatList.sub,
    }),
    //歌单数据整理
    playListAll: function () {
      if (this.playList.playlists) {
        let res = this.playList.playlists.map((item, index) => {
          return Object.assign(
            {},
            {
              name: item.name,
              id: item.id,
              coverImgUrl: item.coverImgUrl,
              playCount: item.playCount,
              nickname: item.creator.nickname,
            }
          );
        });
        return res;
      }
    },
  },
  methods: {
    //点击歌单去歌单页面
    goPlayList(id) {
      this.$router.push({ path: `/playlist/${id}` });
    },
    //分页器上一页
    lastPage(val) {
      this.playListInfo.offset = (val - 1) * 35;
      this.$store.dispatch("getPlayList", this.playListInfo);
    },
    //分页器下一页
    nextPage(val) {
      this.playListInfo.offset = (val - 1) * 35;
      this.$store.dispatch("getPlayList", this.playListInfo);
    },
    //点击当前页数
    clickPage(val) {
      this.playListInfo.offset = (val - 1) * 35;
      this.$store.dispatch("getPlayList", this.playListInfo);
    },
    //显示和隐藏分类列表
    showCatList() {
      if (this.flag) {
        this.$refs.catListBox.style.display = "block";
        this.flag = false;
      } else {
        {
          this.$refs.catListBox.style.display = "none";
          this.flag = true;
        }
      }
    },
    //点击风格更新数据
    changeStyle(val) {
      this.showCatName = val;
      this.playListInfo.cat = val;
      this.$store.dispatch("getPlayList", this.playListInfo);
      this.$refs.catListBox.style.display = "none";
      this.flag = true;
    },
  },
  watch: {
    //歌单分类数据整理
    playListCatList(newVal, oldVal) {
      newVal.forEach((item, index) => {
        if (item.category == 0) {
          this.language.push(item.name);
        }
        if (item.category == 1) {
          this.style.push(item.name);
        }
        if (item.category == 2) {
          this.scene.push(item.name);
        }
        if (item.category == 3) {
          this.emotion.push(item.name);
        }
        if (item.category == 4) {
          this.subject.push(item.name);
        }
      });
    },
  },
};
</script>

<style scoped lang='less'>
.body {
  background: #f5f5f5;
}
.s-wrap {
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-bottom: none;
}
.sheet {
  padding: 40px;
}
.sheet-title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
}
.sheet-title h2 {
  float: left;
  font-size: 24px;
}
.sheet-title h2 span {
  float: left;
}
.sheet-title-class {
  float: left;
  margin: 2px 0 0 12px;
  padding: 0 5px 0 0;
  height: 31px;
  line-height: 31px;
  font-size: 12px;
  font-weight: normal;
  overflow: hidden;
  text-align: center;
  background: url(./img/button2.png) no-repeat right -100px;
  cursor: pointer;
}
.sheet-title-class span {
  padding: 0 10px 0 15px;
  height: 31px;
  line-height: 31px;
  font-size: 12px;
  font-weight: normal;
  overflow: hidden;
  text-align: center;
  color: #0c73c2;
  background: url(./img/button2.png) no-repeat 0 -59px;
}
.sheet-title-class i {
  display: inline-block;
  margin: 0 0 0 5px;
  width: 8px;
  height: 5px;
  overflow: hidden;
  vertical-align: middle;
  background: url(./img/icon.png) no-repeat -70px -543px;
}
.classify {
  float: right;
  width: 93px;
  height: 29px;
  background: url(./img/button.png) no-repeat 0 0;
}
.classify a {
  float: left;
  width: 46px;
  height: 29px;
  line-height: 29px;
  text-align: center;
}
.hot-sheet {
  color: #fff;
}
.new-sheet {
  color: #000;
}
.pageWrap {
  width: 980px;
  margin: 0 auto;
}
.page {
  margin: 20px 0;
  text-align: center;
  font-size: 0;
}
.page-change {
  display: inline-block;
  vertical-align: middle;
  margin: 0 1px 0 2px;
  padding: 0 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 22px;
  font-size: 12px;
  line-height: 22px;
  color: #333;
}
.font {
  border: none;
  font-size: 12px;
}
.page-active {
  color: #fff;
  border-color: #a2161b;
  background: url(./img/button.png) no-repeat 0 -650px;
}
.pro-page {
  width: 47px;
  height: 24px;
  line-height: 24px;
  padding: 0 0 0 22px;
  text-align: left;
  background: url(./img/button.png) no-repeat 0 -620px;
}
.next-page {
  width: 57px;
  height: 24px;
  line-height: 24px;
  padding: 0 0 0 12px;
  text-align: left;
  background: url(./img/button.png) no-repeat -75px -560px;
}
.page-change:hover {
  text-decoration: none;
  border-color: #666;
}
.pro-page:hover,
.next-page:hover {
  text-decoration: none;
  border-color: #ccc;
}
.next-page:hover {
  background-position-y: -590px;
}
.h-music {
  margin: 20px 0 0 -50px;
}
.h-music li {
  float: left;
  zoom: 1;
  width: 140px;
  height: 204px;
  padding: 0 0 0 50px;
}
.h-img {
  width: 140px;
  height: 140px;
  position: relative;
}
.h-img img {
  width: 140px;
  height: 140px;
}
.h-img .bg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 140px;
  height: 27px;
  background: #000;
  opacity: 0.4;
}
.icon,
.play {
  background: url(./img/index02.png) no-repeat;
}
.h-img .icon {
  position: absolute;
  left: 10px;
  bottom: 7px;
  width: 14px;
  height: 11px;
  background-position-y: -24px;
}
.h-img .txt {
  position: absolute;
  left: 29px;
  bottom: 4px;
  color: #ccc;
}
.h-img .play {
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background-position: 0 0;
}
.h-music li p {
  margin: 8px 0 3px;
  font-size: 14px;
}
.h-music p a {
  color: #000;
}
.djvideo {
  display: inline-block;
  vertical-align: top;
  margin-right: 3px;
  width: 35px;
  height: 15px;
  background: url(./img/icon.png) no-repeat -31px -658px;
}

/* 后期修改样式 */
.playListName {
  width: 140px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.playListNickName {
  width: 120px;
  color: #999999;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  strong {
    color: #666666;
    font-weight: 400;
  }
}

//catlistBox盒子样式
.catListBox {
  display: none;
  width: 700px;
  height: 385px;
  border: 1px solid #cccc;
  position: absolute;
  background-color: #ffffff;
  z-index: 2;
  .bd {
    h3 {
      height: 52px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c4c4c4;
      a {
        width: 75px;
        height: 26px;
        display: inline-block;
        background: #f6f6f6;
        color: #333333;
        text-align: center;
        line-height: 26px;
        font-weight: 400;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        margin-left: 25px;
      }
    }
    dl {
      width: 100%;
      display: flex;
      .catListLeft {
        width: 95px;
        border-right: 1px solid #c4c4c4;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        span {
          color: #333333;
          font-weight: 500;
        }
        i {
          display: inline-block;
          background: url("./img/咖啡 (2).png");
          width: 24px;
          height: 24px;
          &:nth-child(3) {
            background-image: url("./img/音乐.png");
          }
        }
      }
      .catListRight {
        display: flex;
        flex: 8;
        align-items: center;
        flex-wrap: wrap;
        margin: 15px 0;
        a {
          display: inline-block;
          margin: 0 10px;
          text-align: center;
          line-height: 24px;
          color: #333333;
        }
      }
    }
  }
}
.addBackground {
  background: #a7a7a7;
  color: #ffff;
  padding: 0 5px;
}
</style>