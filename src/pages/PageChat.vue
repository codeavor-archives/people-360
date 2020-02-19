<template>
  <q-page padding class="pageChat flex column" ref="pageChat">
    <template v-if="messagesDownloaded">
      <q-banner
        v-if="!otherUserDetails.online"
        class="bg-grey-3 text-grey-6 text-center fixed-top"
      >{{otherUserDetails.name}} is offline</q-banner>
      <div :class="{'invisible' : !showMessages}" class="q-pa-md column col justify-end">
        <q-chat-message
          v-for="(message, key) in messages"
          :key="key"
          :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
          :avatar="message.from == 'me' ? userDetails.photo : otherUserDetails.photo"
          :text="[message.text]"
          stamp="minutes ago"
          :sent="message.from == 'me' ? true: false"
          :bg-color="message.from == 'me' ? 'white' : 'green-3'"
        />
      </div>
    </template>

    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em" />
      </span>
    </template>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit.prevent="sendMessage" class="row full-width">
          <q-input
            @blur="scrollToBottom"
            aria-required
            ref="newMessage"
            bg-color="white"
            class="col"
            placeholder="Message..."
            dense
            rounded
            outlined
            autogrow
            v-model="newMessage"
          ></q-input>
          <q-btn type="submit" class="q-mt-xs" dense flat color="white" icon="send"></q-btn>
        </q-form>
      </q-toolbar>
    </q-footer>
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
      newMessage: "",
      showMessages: false
    };
  },
  methods: {
    ...mapActions("auth", [
      "fbGetMessages",
      "fbStopGettingMessages",
      "fbSendMessages"
    ]),
    clearMessage() {
      this.newMessage = "";
      this.$refs.newMessage.focus();
    },
    sendMessage() {
      if (this.newMessage.length) {
        this.fbSendMessages({
          message: {
            text: this.newMessage,
            from: "me"
          },
          otherUserID: this.$route.params.id
        });
      }

      this.clearMessage();
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    }
  },
  computed: {
    ...mapState("auth", [
      "loggedIn",
      "userDetails",
      "messages",
      "messagesDownloaded"
    ])
  },
  mounted() {
    this.fbGetMessages(this.$route.params.id);
    // console.log(this.otherUserDetails);
  },
  destroyed() {
    this.fbStopGettingMessages();
  },
  watch: {
    messages: function(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
        setTimeout(() => {
          this.showMessages = true;
        }, 200);
      }
    }
  }
};
</script>


<style lang="css" scoped>
.pageChat {
  background: #e2dfd5;
}
.pageChat::after {
  content: "";
  position: fixed;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.1;
  background-image: radial-gradient(
      circle at 100% 150%,
      silver 24%,
      white 24%,
      white 28%,
      silver 28%,
      silver 36%,
      white 36%,
      white 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 0 150%,
      silver 24%,
      white 24%,
      white 28%,
      silver 28%,
      silver 36%,
      white 36%,
      white 40%,
      transparent 40%,
      transparent
    ),
    radial-gradient(
      circle at 50% 100%,
      white 10%,
      silver 10%,
      silver 23%,
      white 23%,
      white 30%,
      silver 30%,
      silver 43%,
      white 43%,
      white 50%,
      silver 50%,
      silver 63%,
      white 63%,
      white 71%,
      transparent 71%,
      transparent
    ),
    radial-gradient(
      circle at 100% 50%,
      white 5%,
      silver 5%,
      silver 15%,
      white 15%,
      white 20%,
      silver 20%,
      silver 29%,
      white 29%,
      white 34%,
      silver 34%,
      silver 44%,
      white 44%,
      white 49%,
      transparent 49%,
      transparent
    ),
    radial-gradient(
      circle at 0 50%,
      white 5%,
      silver 5%,
      silver 15%,
      white 15%,
      white 20%,
      silver 20%,
      silver 29%,
      white 29%,
      white 34%,
      silver 34%,
      silver 44%,
      white 44%,
      white 49%,
      transparent 49%,
      transparent
    );
  background-size: 100px 50px;
}
.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
.q-message {
  z-index: 1;
}
</style>
