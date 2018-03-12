<template>
  <div id="app">
    <div class="containers">
      <WaterTank :waterTank="firstTank" />
      <Pipe :pipe="pipe"/>
      <WaterTank :waterTank="secondTank" />
    </div>
    <div class="control">
      <Button @click="pourWater" />
    </div>
  </div>
</template>

<script>
import WaterTank from './components/waterTank/WaterTank.vue';
import Pipe from './components/pipe/Pipe.vue';
import Button from './components/button/Button.vue';

export default {
  name: 'app',
  components: {
    WaterTank,
    Pipe,
    Button
  },
  data() {
    return {
      firstTank: {
        height: 200,
        marginTop: 0,
        waterLevel: 0,
      },
      secondTank: {
        height: 200,
        marginTop: 40,
        waterLevel: 0,
      },
      pipe: {
        height: 10,
        marginTop: 130,
        waterLevel: 0,
        top: 0,
      },
    }
  },
  watch: {
    firstTank: {
      handler: function() {
        const activePipe = this.firstTank.height - (this.pipe.height + this.pipe.marginTop);
        activePipe <= this.firstTank.waterLevel ? this.pipe.waterLevel = this.pipe.height : this.pipe.waterLevel = 0;
      },
      deep: true
    },
    secondTank: {
      handler: function() {
        if (this.secondTank.height + this.pipe.height < this.secondTank.waterLevel) {
          this.firstTank.waterLevel = 0;
          this.secondTank.waterLevel = 0;
        }
      },
      deep: true
    },
  },

  methods: {
    pourWater: function() {
      this.firstTank.waterLevel += 40;
      this.handleWater(this.firstTank.waterLevel);
    },

    handleWater: function(val) {
      const activePipe = this.firstTank.height - (this.pipe.height + this.pipe.marginTop);

      if (activePipe <= val) {
        this.pipe.waterLevel = this.pipe.height;
        this.firstTank.waterLevel = val
        this.makeEqual(val);
      }
    },

    makeEqual: function(val) {
      setTimeout(() => {
        if(this.firstTank.waterLevel === this.secondTank.waterLevel) {
          this.firstTank.waterLevel = val - this.pipe.height;
          this.secondTank.waterLevel += 40 - this.pipe.height;
        } else {
          this.firstTank.waterLevel = val - this.secondTank.marginTop + this.pipe.height;
          this.secondTank.waterLevel += 40 - this.pipe.height;
        }
      }, 500);
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.containers {
  margin-top: 10em;
  display: flex;
}

.control {
  margin: 0 auto;
  width: 45vh;
  text-align: center;
  padding: 2em;
}
</style>
