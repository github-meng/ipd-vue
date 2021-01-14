<template>
  <div>
    <a-modal
      v-model="visible"
      :destroyOnClose="true"
      :width="'60%'"
      :bodyStyle="{ maxHeight: '480px', padding: '0' }"
      :title="dataToPreview.docName"
      :centered="true"
      :footer="null"
      @cancel="cancelPreview"
    >
      <div class="preview-box">
        <div class="player" v-if="dataToPreview.docType == 'video'">
          <!-- <h5>{{ dataToPreview.docName }}</h5> -->
          <video-player
            class="vjs-custom-skin"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @ready="playerReadied"
            @statechanged="playerStateChanged($event)"
          >
          </video-player>
        </div>
        <div class="preview-text" v-if="dataToPreview.docType == 'txt'">
          小蜗牛问妈妈：“为什么咱们从生下来，就要背负这个又重又硬的壳呢？”<br />
          妈妈：“由于咱们的身体没有骨骼的支撑，只能爬，又爬不快，所以需求这个壳的维护。”<br />
          小蜗牛：“毛虫妹妹没有骨头，也爬不快，为什么她不必背这个又硬又重的壳呢？”<br />
          妈妈：“由于毛虫妹妹能变成蝴蝶，天空会维护她啊。”<br />
          小蜗牛：“但是蚯蚓弟弟也没骨头，也爬不快，也不会变成蝴蝶，他为什么不必背这个又硬又重的壳呢？”<br />
          妈妈：“由于蚯蚓弟弟会钻土，大地会维护他啊。”<br />
          小蜗牛哭了起来：“咱们好可怜啊，天空不维护咱们，大地也不维护咱们。”<br />
          蜗牛妈妈安慰小蜗牛说：“所以咱们有壳啊！咱们不靠天，也不靠地，咱们靠自己！”<br />
          在职场里边，有的人靠背景靠关系上位，有的人靠投机取巧溜须拍马上位，但在程序员圈子里，历来只靠自己的技能才能上位。<br />
          所以，假如你挑选了程序员这个工作，唯有不断地学习，不断地提高自己的技能才能，才能在职场中立于不败之地。<br />
          假如你没背景没关系，又不懂得如何在职场中投合上司，那么，无妨学一门过硬的技能，比如程序员，这种技能的特别之处在于，在公司里一般人替代不了，不必忧虑被人架空。
        </div>
        <div class="preview-word" v-if="dataToPreview.docType == 'doc'">
          有三个人要被关进监狱三年，监狱长答应他们各提一个要求。<br />
          美国人爱抽雪茄，要了三箱雪茄。<br />
          法国人最浪漫，要一个美丽的女子相伴。<br />
          而犹太人说，他要一部与外界交流的电话。<br />
          三年过后，第一个冲出来的是美国人，嘴里鼻孔里塞满了雪茄，大喊道：“给我火，给我火！”原来他忘了要火了。<br />
          接着出来的是法国人，只见他手里抱着一个小孩子，美丽女子手里牵着一个小孩子，肚子里还怀着第三个。<br />
          最终出来的是犹太人，他紧紧握住监狱长的手说：“这三年来我每天与外界联系，我的生意不光没有中止，反而增长了200％，为了表示感谢，我送你一辆劳施莱斯！”<br />
          这个故事告知咱们，现在有什么样的挑选，决议将来是什么样的日子。<br />
          作为始终处理互联网科技前沿的程序员，咱们要挑选触摸最新的信息，了解最新的趋势，然后更好的发明自己的将来。
        </div>
        <div class="preview-excel" v-if="dataToPreview.docType == 'xls'">
          有三个水泥匠在垒墙，一个路人走过，问：“你们在做什么？”<br />
          水泥匠甲闷闷不乐的回答说：“没看到我在垒墙吗？”。<br />
          水泥匠乙高兴的回答说：“我在盖一座摩天大楼”。<br />
          水泥匠丙则振奋而又豪放万丈的说：“我在和我的团队同伴们一同美化这座城市。”<br />
          若干年后，这三个水泥匠的命运天壤之别：<br />
          水泥匠甲仍然是水泥匠；<br />
          水泥匠乙成为一家修建公司的总设计师；<br />
          水泥匠丙成为了修建公司的老总，带领着更多的人美化城市。<br />
          同样是写代码的程序员，有的程序员觉得自己仅仅一个“码农”，领导组织什么就做什么，每天得过且过，靠写代码混日子；<br />
          有的程序员认为是在完结一个伟大的体系，可以自动发现问题，优化算法，顺便也提高了自己；<br />
          而有的程序员认为他的作业是协助客户解决问题，于是就会想办法做出更完善更符合客户需求的体系，然后也提高了自己的事务才能和效率。<br />
          可想而知，若干年后，这三个同样起点的程序员，会有多大的人生差距。
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
// 引入videoplayer视频播放器插件
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  name: "previewModal",
  props: ["dataToPreview"],
  components: { "video-player": videoPlayer },
  data() {
    return {
      visible: false,
      playerOptions: {
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        language: "en",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        controlBar: {
          // timeDivider: true, // 当前时间和持续时间的分隔符
          // durationDisplay: true, // 显示持续时间
          // remainingTimeDisplay: true, // 是否显示剩余时间功能
          // fullscreenToggle: true // 是否显示全屏按钮
        },
        sources: [
          {
            type: "video/mp4", // 类型
            // mp4 url地址
            src: this.dataToPreview.docUrl ? this.dataToPreview.docUrl : ""
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        poster: "https://ipd.xianyujc.com/img/fengmian.jpeg", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后换个浏览器再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    };
  },
  //   computed: {
  //     player() {
  //       if (this.dataToPreview.docType == "video") {
  //         return this.$refs.videoPlayer.player;
  //       }
  //       return null;
  //     }
  //   },
  watch: {
    dataToPreview(e) {
      console.log(e);
    }
  },
  mounted() {
    // setTimeout(() => {
    if (this.dataToPreview.docType == "video") {
      // change src
      this.playerOptions.sources[0].src = this.dataToPreview.docUrl;
    }
    //   // change item
    //   // this.$set(this.playerOptions.sources, 0, {
    //   //   type: "video/mp4",
    //   //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    //   // })
    //   // change array
    //   // this.playerOptions.sources = [{
    //   //   type: "video/mp4",
    //   //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    //   // }]
    //   this.player.muted(false);
    // }, 200);
  },
  methods: {
    showPreviewModal() {
      this.visible = true;
    },
    cancelPreview() {
      this.visible = false;
      // 向父组件传递值
      this.$emit("func", false);
    },
    // listen event
    onPlayerPlay(player) {
      console.log("player 播放!", player);
    },
    onPlayerPause(player) {
      console.log("player 暂停!", player);
    },
    onPlayerEnded(player) {
      console.log("player 视频播完回调!", player);
    },
    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata(player) {
      console.log("player Loadeddata!", player);
    },
    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting(player) {
      console.log("player Waiting!", player);
    },
    onPlayerPlaying(player) {
      console.log("player 已开始播放回调!", player);
    },
    onPlayerTimeupdate(player) {
      console.log("player 当前播放位置发生变化时触发!", player.currentTime());
    },
    // 媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
    },
    // 媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件
    onPlayerCanplaythrough(player) {
      console.log("player Canplaythrough!", player);
    },
    // 播放状态改变回调
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },
    // 将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    }
  }
};
</script>
<style lang="less" scoped>
.player {
  position: relative;
  h5 {
    margin: 0;
    color: #ffffff;
    position: absolute;
    top: 0;
    line-height: 22px;
    text-indent: 2px;
    z-index: 9;
  }
}
.preview-text,
.preview-word,
.preview-excel {
  padding: 24px;
  line-height: 1.5;
}
/deep/.video-js .vjs-big-play-button {
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
  top: calc(50% - 1em);
  left: calc(50% - 1em);
}
</style>
