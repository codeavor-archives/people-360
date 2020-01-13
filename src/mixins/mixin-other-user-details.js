export default {
  destroyed() {
    this.fbStopGettingMessages();
  },
  computed: {
    otherUserDetails() {
      if (this.$store.state.auth.users[this.$route.params.id]) {
        return this.$store.state.auth.users[this.$route.params.id];
      }
      return {};
    }
  }
};
