<template>
  <div id="app">
    <div class="containers">
      <WaterTank
        name="A"
        :pipeHeight="pipeHeight"
        :pipeOffset="pipeOffset"
      />
      <Pipe
        :pipeHeight="pipeHeight"
        :pipeOffset="pipeOffset"
        inWaterTank="A"
        outWaterTank="B"
      />
      <WaterTank
        name="B"
        :pipeHeight="pipeHeight"
        :pipeOffset="pipeOffset"
        :waterTankOffset="waterTankOffset"
      />
    </div>
    <div class="control">
      <button class="btn" @click='addWater'>pour water</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main'
import WaterTank from './components/waterTank/WaterTank.vue'
import Pipe from './components/pipe/Pipe.vue'

export default {
  name: 'app',
  components: {
    WaterTank,
    Pipe,
  },
  data() {
    return {
      pipeHeight: 10,
      pipeOffset: 100,
      waterTankOffset: 50,
    }
  },
  methods: {
    addWater() {
      eventBus.$emit('addWater', { waterTank: 'A'})
    },
    stopAddingWater(data) {
      alert(`To much water in Watertank ${data.waterTank}`)
      eventBus.$emit('resetWater', { amount: 0 })
    }
  },
  created() {
    eventBus.$on('waterOverflow', data => this.stopAddingWater(data))
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

.btn {
  padding: 2em 4em 2em 4em;
  border: 0;
  background: #42b883;
  color: white;
  cursor: pointer;
  font-size: 0.8em;
  text-transform: uppercase;
  margin: 1em;
  border: 5px solid #35495e;
  transition: all .6s ease;
}

.btn:hover {
  background: #71c7ec;
}

.btn:focus {
  outline:none
}
</style>
