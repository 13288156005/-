<template>
  <div class="main">
    <div class="m-wrap">
      <div class="album-conter">
        <div class="hotAlbum">
          <h3>热门新碟</h3>
          <div class="hotAlbum-list">
            <ul>
              <li v-for="(item, index) in albumNew" :key="item.id">
                <div class="hotAlbum-img">
                  <img
                    :src="item.picUrl + '?param=130y130'"
                    @click="goAlbumAsg(item.id)"
                  />
                </div>
                <div class="hotAlbum-info">
                  <p class="info-name" @click="goAlbumAsg(item.id)">
                    {{ item.name }}
                  </p>
                  <p class="info-ar" @click="goSingerAsg(item.artistId)">
                    {{ item.artist }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="allAlbum hotAlbum">
          <div class="allAlbum-title">
            <h3>全部新碟</h3>
            <p>
              <span @click="changeStyle('ALL')">全部</span>
              <span @click="changeStyle('ZH')">华语</span>
              <span @click="changeStyle('EA')">欧美</span>
              <span @click="changeStyle('KR')">韩国</span>
              <span @click="changeStyle('JP')">日本</span>
            </p>
          </div>
          <div class="hotAlbum-list">
            <ul>
              <li v-for="(item2, index) in allAlbum" :key="item2.id">
                <div class="hotAlbum-img">
                  <img
                    :src="item2.picUrl + '?param=130y130'"
                    @click="goAlbumAsg(item2.id)"
                  />
                </div>
                <div class="hotAlbum-info">
                  <p class="info-name" @click="goAlbumAsg(item2.id)">
                    {{ item2.name }}
                  </p>
                  <p class="info-ar" @click="goSingerAsg(item2.artistId)">
                    {{ item2.artist }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="30"
              @next-click="nextPage"
              @prev-click="prevPage"
              @current-change="currentPage"
            >
            </el-pagination>
          </div>
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
      //全部新碟参数
      allAlbumInfo: {
        area: "All",
        limit: 35,
        offset: 0,
      },
      total: 0,
    };
  },
  mounted() {
    //获取最新专辑
    this.$store.dispatch("getAlbumNew");
    //获取全部新碟
    this.$store.dispatch("getAlbumAll", this.allAlbumInfo);
  },
  methods: {
    //下一页
    nextPage(num) {
      this.allAlbumInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getAlbumAll", this.allAlbumInfo);
    },
    //上一页
    prevPage(num) {
      this.allAlbumInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getAlbumAll", this.allAlbumInfo);
    },
    //点击当前页
    currentPage(num) {
      this.allAlbumInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getAlbumAll", this.allAlbumInfo);
    },
    //变换风格
    changeStyle(type) {
      if (type == "ALL") {
        this.allAlbumInfo.area = "All";
      }
      if (type == "ZH") {
        this.allAlbumInfo.area = "ZH";
      }
      if (type == "EA") {
        this.allAlbumInfo.area = "EA";
      }
      if (type == "KR") {
        this.allAlbumInfo.area = "KR";
      }
      if (type == "JP") {
        this.allAlbumInfo.area = "JP";
      }
      this.$store.dispatch("getAlbumAll", this.allAlbumInfo);
    },
    //点击跳转专辑详情
    goAlbumAsg(id) {
      this.$router.push({
        path: `albumAsg/${id}`,
      });
    },
    //点击跳转歌手详情
    goSingerAsg(id) {
      this.$router.push({
        path: `singerAsg/${id}`,
      });
    },
  },
  computed: {
    ...mapState(["newAlbum", "albumAll"]),
    albumNew: function () {
      if (Object.keys(this.newAlbum).length > 0) {
        //把数组长度变成10
        let arr1 = [];
        let arr = this.newAlbum.albums.slice(0, 10);
        arr1 = arr.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picUrl = item.picUrl;
          let artist = item.artists[0].name;
          let artistId = item.artists[0].id;
          return { id, name, picUrl, artist, artistId };
        });
        return arr1;
      }
    },
    allAlbum: function () {
      if (Object.keys(this.albumAll).length > 0) {
        this.total = this.albumAll.total;
        //把数组长度变成10
        let arr = [];
        arr = this.albumAll.albums.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picUrl = item.picUrl;
          let artist = item.artists[0].name;
          let artistId = item.artists[0].id;
          return { id, name, picUrl, artist, artistId };
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.album-conter {
  padding: 60px 40px;

  .hotAlbum {
    h3 {
      font-size: 24px;
      color: #333333;
      border-bottom: 2px solid #c20c0c;
      padding-bottom: 6px;
    }
    .hotAlbum-list {
      margin-top: 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          padding-right: 25px;
          padding-bottom: 30px;
          .hotAlbum-img {
            width: 153px;
            height: 130px;
            background: url("./img/disk.png") no-repeat 0px -844px;
            cursor: pointer;
          }
          .hotAlbum-info {
            .info-name {
              width: 150px;
              font-size: 14px;
              color: #000000;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin: 8px 0 3px;
              cursor: pointer;
            }
            .info-ar {
              font-size: 12px;
              width: 150px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: #666666;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .allAlbum {
    .allAlbum-title {
      display: flex;
      border-bottom: 2px solid #c20c0c;
      align-items: center;
      h3 {
        font-size: 24px;
        color: #333333;
        padding-bottom: 6px;
        border-bottom: none;
      }
      p {
        margin-left: 20px;
        span {
          color: #666666;
          cursor: pointer;
          &::after {
            content: "|";
            margin: 0 5px;
          }
          &:last-child {
            &::after {
              content: "";
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
  }
}
</style>