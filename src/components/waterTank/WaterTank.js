export default {
  name: 'waterTank',
  props: {
    waterTank: {
      type: Object,
      default() {
        return {
          waterLevel: Number,
          marginTop: Number,
          height: Number
        }
      }
    }
  },
  computed: {
    waterLevel: function() {
      let waterLevel = this.waterTank.waterLevel;
      return `height: ${waterLevel}px`
    },
    containerStyle: function() {
      let marginTop = this.waterTank.marginTop;
      let height = this.waterTank.height;

      return `
        marginTop: ${marginTop}px;
        height: ${height}px
      `
    }
  },
}
