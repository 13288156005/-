<template>
  <div class="main">
    <div class="m-wrap">
      <div class="m-left">
        <div class="singerAsg">
          <div class="singerAsg-title">
            <h2>某幻军</h2>
          </div>
          <div class="singerAsg-img">
            <img
              src="http://p2.music.126.net/NEPXLd0AfdfeLXTrI7NQKA==/109951164260250672.jpg?param=640y300"
              alt=""
            />
          </div>
          <div class="singerAsg-table">
            <ul class="table-header">
              <li>热门作品</li>
              <li>所有专辑</li>
              <li>相关MV</li>
              <li>艺人介绍</li>
            </ul>

            <ul class="table-singList">
              <div class="songAsg-btn">
                <a href="javascript:;" class="btn-play">
                  <i class="iconfont icon-play"><span>播放</span></i>
                </a>
                <a href="javascript:;" class="btn-add">
                  <i class="iconfont icon-add"><span>收藏热门</span></i>
                </a>
                <a href="javascript:;" class="btn-hot">
                  <i class="iconfont icon-hot"><span>热门单曲</span></i>
                </a>
              </div>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="m-right">456</div>
    </div>
  </div>
</template>

<script>
export default {};
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
      height: 34px;
    }
  }
}
</style>