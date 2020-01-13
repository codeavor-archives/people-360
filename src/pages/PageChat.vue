<template>
  <q-page padding class="flex column">
    <q-banner v-if="!otherUserDetails.online" class="bg-grey-3 text-grey-6 text-center">
      <template v-slot:avatar>
        <q-icon name="speaker_notes_off" color="grey-5" />
      </template>
      {{otherUserDetails.name}} is offline
    </q-banner>
    <div class="q-mb-xl column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="[message.text]"
        stamp="minutes ago"
        :sent="message.from == 'me' ? true: false"
      />
    </div>
    <q-toolbar elevated class="bg-primary absolute-bottom">
      <div class="row absolute-bottom q-mb-xs q-mx-sm">
        <q-form @submit="sendMessage" class="row full-width">
          <q-input
            bg-color="white"
            class="col"
            placeholder="Message..."
            dense
            rounded
            outlined
            v-model="newMessage"
          ></q-input>
          <q-btn type="submit" class="q-mt-xs" dense flat color="white" icon="send"></q-btn>
        </q-form>
      </div>
    </q-toolbar>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";
export default {
  name: "PageIndex",
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    ...mapActions("auth", [
      "fbGetMessages",
      "fbStopGettingMessages",
      "fbSendMessages"
    ]),
    sendMessage() {
      this.fbSendMessages({
        message: {
          text: this.newMessage,
          from: "me"
        },
        otherUserID: this.$route.params.id
      });
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "messages"])
  },
  mounted() {
    this.fbGetMessages(this.$route.params.id);
    // console.log(this.otherUserDetails);
  },
  destroyed() {
    this.fbStopGettingMessages();
  }
};
</script>


<style lang="scss" scoped>
</style>
