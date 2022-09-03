<template>
  <div class="main">
    <div class="m-wrap">
      <div class="m-list">
        <div class="singer-list">
          <div class="blk">
            <h3>推荐</h3>
            <ul>
              <li
                @click="changeType('推荐歌手')"
                :class="type == '推荐歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">推荐歌手</a>
              </li>
            </ul>
          </div>
          <div class="blk">
            <h3>华语</h3>
            <ul>
              <li
                @click="changeType('华语男歌手')"
                :class="type == '华语男歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">华语男歌手</a>
              </li>
              <li
                @click="changeType('华语女歌手')"
                :class="type == '华语女歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">华语女歌手</a>
              </li>
              <li
                @click="changeType('华语组合/乐队')"
                :class="type == '华语组合/乐队' ? 'list-active' : ''"
              >
                <a href="javascript:;">华语组合/乐队</a>
              </li>
            </ul>
          </div>
          <div class="blk">
            <h3>欧美</h3>
            <ul>
              <li
                @click="changeType('欧美男歌手')"
                :class="type == '欧美男歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">欧美男歌手</a>
              </li>
              <li
                @click="changeType('欧美女歌手')"
                :class="type == '欧美女歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">欧美女歌手</a>
              </li>
              <li
                @click="changeType('欧美组合/乐队')"
                :class="type == '欧美组合/乐队' ? 'list-active' : ''"
              >
                <a href="javascript:;">欧美组合/乐队</a>
              </li>
            </ul>
          </div>
          <div class="blk">
            <h3>日本</h3>
            <ul>
              <li
                @click="changeType('日本男歌手')"
                :class="type == '日本男歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">日本男歌手</a>
              </li>
              <li
                @click="changeType('日本女歌手')"
                :class="type == '日本女歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">日本女歌手</a>
              </li>
              <li
                @click="changeType('日本组合/乐队')"
                :class="type == '日本组合/乐队' ? 'list-active' : ''"
              >
                <a href="javascript:;">日本组合/乐队</a>
              </li>
            </ul>
          </div>
          <div class="blk">
            <h3>韩国</h3>
            <ul>
              <li
                @click="changeType('韩国男歌手')"
                :class="type == '韩国男歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">韩国男歌手</a>
              </li>
              <li
                @click="changeType('韩国女歌手')"
                :class="type == '韩国女歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">韩国女歌手</a>
              </li>
              <li
                @click="changeType('韩国组合/乐队')"
                :class="type == '韩国组合/乐队' ? 'list-active' : ''"
              >
                <a href="javascript:;">韩国组合/乐队</a>
              </li>
            </ul>
          </div>
          <div class="blk">
            <h3>其他</h3>
            <ul>
              <li
                @click="changeType('其他男歌手')"
                :class="type == '其他男歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">其他男歌手</a>
              </li>
              <li
                @click="changeType('其他女歌手')"
                :class="type == '其他女歌手' ? 'list-active' : ''"
              >
                <a href="javascript:;">其他女歌手</a>
              </li>
              <li
                @click="changeType('其他组合/乐队')"
                :class="type == '其他组合/乐队' ? 'list-active' : ''"
              >
                <a href="javascript:;">其他组合/乐队</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="m-conter">
        <!-- 热门歌手 -->
        <div class="conter-joinSinger" v-if="type == '推荐歌手'">
          <h3>热门歌手</h3>
          <ul>
            <li v-for="(item, index) in hotList" :key="item.id">
              <div class="img">
                <img
                  :src="item.picUrl + '?param=130y130'"
                  alt=""
                  @click="goSingerAsg(item.id)"
                />
              </div>
              <p @click="goSingerAsg(item.id)">{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <!-- 热门歌手 -->
        <div class="conter-singer" v-if="type != '推荐歌手'">
          <h3>{{ type }}</h3>
          <ul class="select-singer">
            <li
              :class="change == '推荐' ? 'active-select' : ''"
              @click="changeSelect('推荐')"
            >
              <a href="javascript:;">推荐</a>
            </li>
            <li
              :class="change == 'A' ? 'active-select' : ''"
              @click="changeSelect('A')"
            >
              <a href="javascript:;">A</a>
            </li>
            <li
              :class="change == 'B' ? 'active-select' : ''"
              @click="changeSelect('B')"
            >
              <a href="javascript:;">B</a>
            </li>
            <li
              :class="change == 'C' ? 'active-select' : ''"
              @click="changeSelect('C')"
            >
              <a href="javascript:;">C</a>
            </li>
            <li
              :class="change == 'D' ? 'active-select' : ''"
              @click="changeSelect('D')"
            >
              <a href="javascript:;">D</a>
            </li>
            <li
              :class="change == 'E' ? 'active-select' : ''"
              @click="changeSelect('E')"
            >
              <a href="javascript:;">E</a>
            </li>
            <li
              :class="change == 'F' ? 'active-select' : ''"
              @click="changeSelect('F')"
            >
              <a href="javascript:;">F</a>
            </li>
            <li
              :class="change == 'G' ? 'active-select' : ''"
              @click="changeSelect('G')"
            >
              <a href="javascript:;">G</a>
            </li>
            <li
              :class="change == 'H' ? 'active-select' : ''"
              @click="changeSelect('H')"
            >
              <a href="javascript:;">H</a>
            </li>
            <li
              :class="change == 'I' ? 'active-select' : ''"
              @click="changeSelect('I')"
            >
              <a href="javascript:;">I</a>
            </li>
            <li
              :class="change == 'J' ? 'active-select' : ''"
              @click="changeSelect('J')"
            >
              <a href="javascript:;">J</a>
            </li>
            <li
              :class="change == 'K' ? 'active-select' : ''"
              @click="changeSelect('K')"
            >
              <a href="javascript:;">K</a>
            </li>
            <li
              :class="change == 'L' ? 'active-select' : ''"
              @click="changeSelect('L')"
            >
              <a href="javascript:;">L</a>
            </li>
            <li
              :class="change == 'M' ? 'active-select' : ''"
              @click="changeSelect('M')"
            >
              <a href="javascript:;">M</a>
            </li>
            <li
              :class="change == 'N' ? 'active-select' : ''"
              @click="changeSelect('N')"
            >
              <a href="javascript:;">N</a>
            </li>
            <li
              :class="change == 'O' ? 'active-select' : ''"
              @click="changeSelect('O')"
            >
              <a href="javascript:;">O</a>
            </li>
            <li
              :class="change == 'P' ? 'active-select' : ''"
              @click="changeSelect('P')"
            >
              <a href="javascript:;">P</a>
            </li>
            <li
              :class="change == 'Q' ? 'active-select' : ''"
              @click="changeSelect('Q')"
            >
              <a href="javascript:;">Q</a>
            </li>
            <li
              :class="change == 'R' ? 'active-select' : ''"
              @click="changeSelect('R')"
            >
              <a href="javascript:;">R</a>
            </li>
            <li
              :class="change == 'S' ? 'active-select' : ''"
              @click="changeSelect('S')"
            >
              <a href="javascript:;">S</a>
            </li>
            <li
              :class="change == 'T' ? 'active-select' : ''"
              @click="changeSelect('T')"
            >
              <a href="javascript:;">T</a>
            </li>
            <li
              :class="change == 'U' ? 'active-select' : ''"
              @click="changeSelect('U')"
            >
              <a href="javascript:;">U</a>
            </li>
            <li
              :class="change == 'V' ? 'active-select' : ''"
              @click="changeSelect('V')"
            >
              <a href="javascript:;">V</a>
            </li>
            <li
              :class="change == 'W' ? 'active-select' : ''"
              @click="changeSelect('W')"
            >
              <a href="javascript:;">W</a>
            </li>
            <li
              :class="change == 'X' ? 'active-select' : ''"
              @click="changeSelect('X')"
            >
              <a href="javascript:;">X</a>
            </li>
            <li
              :class="change == 'Y' ? 'active-select' : ''"
              @click="changeSelect('Y')"
            >
              <a href="javascript:;">Y</a>
            </li>
            <li
              :class="change == 'Z' ? 'active-select' : ''"
              @click="changeSelect('Z')"
            >
              <a href="javascript:;">Z</a>
            </li>
          </ul>
          <ul v-if="selectSinger">
            <li
              v-for="(item, index) in selectSinger.slice(0, 10)"
              :key="item.id"
            >
              <div class="img">
                <img
                  @click="goSingerAsg(item.id)"
                  :src="item.picUrl + '?param=130y130'"
                  alt=""
                />
              </div>
              <p @click="goSingerAsg(item.id)">{{ item.name }}</p>
            </li>
          </ul>
          <hr />
          <ul class="singerName-list" v-if="selectSinger">
            <li
              v-for="(item, index) in selectSinger.slice(10, 100)"
              :key="item.id"
            >
              <a href="javascript:;" @click="goSingerAsg(item.id)">{{
                item.name
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      type: "推荐歌手",
      change: "推荐",
      singerListInfo: {
        limit: 100,
        initial: -1,
        type: -1,
        area: -1,
        initial: -1,
      },
    };
  },
  mounted() {
    //获取热门歌手
    this.$store.dispatch("getHotSinger");
  },
  methods: {
    //点击跳转到歌手详情
    goSingerAsg(id) {
      this.$router.push(`/singerasg/${id}`);
    },
    //点击改变type
    changeType(type) {
      this.type = type;
      this.change = "推荐";
      this.singerListInfo.initial = -1;
      switch (type) {
        case "华语男歌手":
          this.singerListInfo.type = 1;
          this.singerListInfo.area = 7;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "华语女歌手":
          this.singerListInfo.type = 2;
          this.singerListInfo.area = 7;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "华语组合/乐队":
          this.singerListInfo.type = 3;
          this.singerListInfo.area = 7;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "欧美男歌手":
          this.singerListInfo.type = 1;
          this.singerListInfo.area = 96;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "欧美女歌手":
          this.singerListInfo.type = 2;
          this.singerListInfo.area = 96;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "欧美组合/乐队":
          this.singerListInfo.type = 3;
          this.singerListInfo.area = 96;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "日本男歌手":
          this.singerListInfo.type = 1;
          this.singerListInfo.area = 8;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "日本女歌手":
          this.singerListInfo.type = 2;
          this.singerListInfo.area = 8;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "日本组合/乐队":
          this.singerListInfo.type = 3;
          this.singerListInfo.area = 8;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "韩国男歌手":
          this.singerListInfo.type = 1;
          this.singerListInfo.area = 16;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "韩国女歌手":
          this.singerListInfo.type = 2;
          this.singerListInfo.area = 16;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "韩国组合/乐队":
          this.singerListInfo.type = 3;
          this.singerListInfo.area = 16;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "其他男歌手":
          this.singerListInfo.type = 1;
          this.singerListInfo.area = 0;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "其他女歌手":
          this.singerListInfo.type = 2;
          this.singerListInfo.area = 0;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
        case "其他组合/乐队":
          this.singerListInfo.type = 3;
          this.singerListInfo.area = 0;
          this.$store.dispatch("getSingerList", this.singerListInfo);
          break;
      }
    },
    //点击改变change
    changeSelect(change) {
      this.change = change;
      this.singerListInfo.initial = change;
      if (change == "推荐") {
        this.singerListInfo.initial = -1;
      }
      this.$store.dispatch("getSingerList", this.singerListInfo);
    },
  },
  computed: {
    ...mapState({
      hotSinger: (state) => state.hotSinger,
      singerList: (state) => state.singerList,
    }),
    hotList: function () {
      if (Object.keys(this.hotSinger).length > 0) {
        let arr = [];
        arr = this.hotSinger.artists.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picUrl = item.picUrl;
          return { id, name, picUrl };
        });
        return arr;
      }
    },
    selectSinger: function () {
      if (Object.keys(this.singerList).length > 0) {
        let arr = [];
        arr = this.singerList.artists.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picUrl = item.picUrl;
          return { id, name, picUrl };
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.m-wrap {
  display: flex;
  .m-list {
    width: 180px;
    background: #f9f9f9;

    .singer-list {
      margin-top: 80px;
      padding: 0 10px 0px 10px;

      .blk {
        border-bottom: 1px solid #d3d3d3;
        padding-bottom: 10px;
        margin-bottom: 20px;
        h3 {
          color: #333333;
          font-size: 16px;
          width: 158px;
        }
        ul {
          width: 158px;
          li {
            height: 30px;
            width: 158px;
            a {
              height: 100%;
              line-height: 26px;
              text-indent: 20px;
              color: #333333;
              display: inline-block;
              background: url("./img/singer.png") no-repeat 0px -32px;
            }
          }
          .list-active {
            a {
              width: 160px;
              background: url("./img/singer.png") no-repeat 0px 0px;
              color: #c20c0c;
            }
          }
        }
      }
    }
  }
  .m-conter {
    width: 800px;
    // margin-top: 80px;
    padding: 80px 38px 0px 38px;
    .conter-joinSinger {
      h3 {
        font-size: 24px;
        color: #333333;
        border-bottom: 2px solid #c20c0c;
        padding-bottom: 10px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        justify-content: space-between;
        li {
          margin-bottom: 20px;
          .img {
            cursor: pointer;
          }
          p {
            color: #000000;
            width: 124px;
            margin-top: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            cursor: pointer;
          }
        }
      }
    }
    .conter-singer {
      margin-bottom: 40px;
      h3 {
        font-size: 24px;
        color: #333333;
        border-bottom: 2px solid #c20c0c;
        padding-bottom: 10px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        justify-content: space-between;
        li {
          margin-bottom: 20px;
          .img {
            width: 130px;
            height: 130px;
            cursor: pointer;
          }
          p {
            color: #000000;
            width: 124px;
            margin-top: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            cursor: pointer;
          }
        }
      }
      .singerName-list {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 140px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          a {
            color: #333333;
          }
        }
      }
      .select-singer {
        font-size: 14px;
        display: flex;
        align-items: center;
        a {
          color: #333333;
        }
      }
      .active-select {
        background: #c20c0c;
        padding: 4px 8px;
        a {
          color: #ffff;
        }
      }
    }
  }
}
</style>