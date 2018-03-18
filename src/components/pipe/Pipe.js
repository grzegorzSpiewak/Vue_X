import { eventBus } from '../../main'

export default {
  props: {
    pipeHeight: {
      type: Number
    },
    pipeOffset: {
      type: Number
    },
    inWaterTank: {
      type: String
    },
    outWaterTank: {
      type: String
    },
  },
  data: function() {
    return {
      activePipe: false,
      waterTankAOn: true,
      waterTankBOn: false
    }
  },
  computed: {
    pipeStyle() {
      return `
        marginTop: ${this.pipeOffset}px;
        height: ${this.pipeHeight}px;
      `
    },
    waterStyle() {
      let height = this.activePipe ? 100 : 0
      return `height: ${height}%`
    },
  },
  methods: {
    handleWater(data) {
      if (data.waterTank === this.inWaterTank && this.waterTankAOn === true) {
        eventBus.$emit('pourWater', { waterTank: this.inWaterTank, amount: 10 })
      } else if (this.waterTankAOn === false && this.activePipe === true) {
        eventBus.$emit('pourWater', { waterTank: this.outWaterTank, amount: 10 })
      }
    },
    handlePipe(data) {
      this.activePipe = true
      this.waterTankAOn = false
      this.pourInBoth(data)
    },
    deactivePipe(data) {
      this.activePipe = data.active
      this.restart()
    },
    restart() {
      this.activePipe = false,
      this.waterTankAOn = true,
      this.waterTankBOn = false
    },
    pourInBoth(data) {
      if (data.waterTank === this.outWaterTank) {
        this.waterTankAOn = true
        this.waterTankBOn = true
      }
    }
  },
  created() {
    eventBus.$on('addWater', data => this.handleWater(data))
    eventBus.$on('activePipe', data => this.handlePipe(data))
    eventBus.$on('deactivePipe', data => this.deactivePipe(data))
  }
}
