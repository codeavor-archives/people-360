<template>
  <q-page padding class="flex column">
    <q-banner class="bg-grey-3 text-grey-6 text-center">
      <template v-slot:avatar>
        <q-icon name="speaker_notes_off" color="grey-5" />
      </template>
      User is offline
    </q-banner>
    <div class="q-mb-xl column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
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
export default {
  name: "PageIndex",
  data() {
    return {
      newMessage: "",
      messages: [
        {
          text: "hey, how are you?",
          from: "me",
          stamp: ""
        },
        {
          text: "doing fine, how r you?",
          from: "them",
          stamp: ""
        },
        {
          text: "Good",
          from: "me",
          stamp: ""
        }
      ]
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: "me"
      });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
