import { eventBus } from '../../main'

export default {
  props: {
    name: {
      type: String
    },
    pipeHeight: {
      type: Number
    },
    pipeOffset: {
      type: Number
    },
    waterTankOffset: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      height: 200,
      waterHeight: 0,
    }
  },
  computed: {
    waterTankStyle() {
      return `
        height: ${this.height}px;
        width: ${this.width}px;
        marginTop: ${this.waterTankOffset}px;
      `
    },
    waterStyle() {
      return `height: ${this.waterHeight}px;`
    },
  },
  watch: {
    waterHeight() {
      const activePipe = this.pipeOffset + this.waterTankOffset - this.pipeHeight
      if (this.waterHeight > this.height) {
        eventBus.$emit('waterOverflow', { waterTank: this.name })
      } else if (this.waterHeight >= activePipe) {
        eventBus.$emit('activePipe', { waterTank: this.name })
      }
    },
  },
  methods: {
    addWater(data) {
      data.waterTank === this.name ? this.waterHeight += data.amount : null
    },
    flushWater(data) {
      this.waterHeight = data.amount
      eventBus.$emit('deactivePipe', { active: false })
    }
  },
  created() {
    eventBus.$on('pourWater', data => this.addWater(data))
    eventBus.$on('resetWater', data => this.flushWater(data))
  }
}
