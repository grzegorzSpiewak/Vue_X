export default {
  name: 'First',
  props: {
    pipe: {
      type: Object,
      default() {
        return {
          waterLevel: Number,
          marginTop: Number,
          height: Number,
          width: Number
        }
      }
    }
  },
  computed: {
    waterLevel: function() {
      let waterLevel = this.pipe.waterLevel;

      return `
        height: ${waterLevel}px;
      `
    },
    containerStyle: function() {
      let marginTop = this.pipe.marginTop;
      let height = this.pipe.height;

      return `
        marginTop: ${marginTop}px;
        height: ${height}px
      `
    }
  },
}
