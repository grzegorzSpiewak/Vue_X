export default {
  name: 'First',
  props: {
    btn: {
      type: Object
    }
  },
  methods: {
    cliked: function() {
      this.$emit('click');
    },
  }
}
