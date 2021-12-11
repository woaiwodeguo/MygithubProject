<template>
  <div class="player">
    <!-- <h2>简易音乐播放器(computed)</h2> -->
    <div class="musicBox">
      <!-- autoplay 自动播放 -->
      <audio :src="getCurrentSongSrc" controls autoplay  @ended="handleEnded"></audio>
      <ul>
        <li
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in musicData"
          :key="item.id"
          @click="handleClick(index)"
        >
          <h3>{{ item.id }}-歌名：{{ item.name }}</h3>
          <h4>作者：{{ item.author }}</h4>
        </li>
      </ul>
      <button @click="handleLast" class="btn">上一首</button>
      <button @click="handleNext" class="btn">下一首</button>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      musicData: [
          {
          id: 1,
          name: "JD下雨夜",
          author: "贝吉塔320",
          songSrc: require("../../assets/music/贝吉塔320 - 东京下雨夜.mp3"),
        },
        {
          id: 2,
          name: "一颗苹果",
          author: "五月天",
          songSrc: require("../../assets/music/五月天 - 一颗苹果.mp3"),
        },
        {
          id: 3,
          name: "Toxic (Explicit)",
          author: "BoyWithUke",
          songSrc: require("../../assets/music/BoyWithUke - Toxic (Explicit).mp3"),
        },
         {
          id: 4,
          name: "兜圈",
          author: "林宥嘉",
          songSrc: require("../../assets/music/林宥嘉 - 兜圈.mp3"),
        },
        {
          id: 5,
          name: "呼吸决定",
          author: "Fine乐团",
          songSrc: require("../../assets/music/Fine乐团 - 呼吸决定.mp3"),
        },
      ],
      currentIndex: 0,
    };
  },
  computed:{
      getCurrentSongSrc(){
          return this.musicData[this.currentIndex].songSrc
      }
  },
  methods: {
    handleClick(index) {
      this.currentIndex = index;
    },
    handleEnded() {
        // 自动播放下一首
        this.handleNext();
    },
        // 点击播放下一首
    handleNext() {
      this.currentIndex++;
      if (this.currentIndex === this.musicData.length) {
        this.currentIndex = 0;
      }
    },
     // 点击播放上一首
    handleLast() {
      if (this.currentIndex === 0) {
        this.currentIndex = 5;
      }
      this.currentIndex--;
    },
  },
};
</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
.player{
    text-align: center;
button{
    outline: none;
    background: none;
    border: none;
}
h2{
  margin-top: 30px;
}
.musicBox{
  margin-top: 20px;
}
ul {
  list-style: none;
  
  li {
    cursor: pointer;
    margin: 20px;
    padding: 10px 5px;
    border-radius: 5px;
  }
  li.active {
    background-color: #165ca7fd;
  }
}
.btn{
    width: 50px;
    height: 25px;
    cursor: pointer;
    border-radius: 10%; 
    color: black; 
    background-color: #ccc;  
}
.btn:hover{
    background-color: greenyellow;
}
}
</style>