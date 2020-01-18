<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-page padding class="column flex">
      <div class="text-center">
        <q-avatar size="100px" class>
          <img class="absolute-right" :src="userDetails.photo" />
        </q-avatar>
        <p class="text-primary">{{userDetails.email}}</p>
      </div>
      <div>
        <h5 class="text-grey-8">Profile Settings</h5>
        <q-form @submit.prevent="updateProfilePhoto">
          <div class="row q-mb-md q-px-sm">
            <!-- <q-input ref="name" v-model="name" class="col-12" label="Name" />
            <q-input ref="photo" v-model="photo" class="col-12" label="Address" />-->
            <q-input v-model="profile.photo" class="col-12" type="file" @change="uploadProfile">
              <template v-slot:append>
                <q-circular-progress
                  show-value
                  class="text-light-blue q-ma-md"
                  :value="value"
                  size="30px"
                  color="primary"
                />
                <q-icon
                  v-if="profile.photo !== ''"
                  name="close"
                  @click="profile.photo = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <div class="row q-mb-md">
            <q-space></q-space>
            <q-btn v-if="readytosubmit" type="submit" color="primary" label="Save Changes" />
          </div>
        </q-form>
      </div>
      <div>
        <h5 class="text-grey-8">Password Settings</h5>
        <q-form @submit.prevent="setChangePassword">
          <div class="q-mb-md q-px-sm">
            <div class="row q-mb-md">
              <q-input
                v-model="account.new_password"
                ref="new_password"
                label="New Password"
                class="col-12"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => val.length >= 6 || 'Please enter atleast 6 characters']"
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input
                v-model="account.confirm_password"
                ref="comfirm_password"
                label="Confirm Password"
                class="col-12"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => val.length >= 6 || 'Please enter atleast 6 characters' ]"
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mb-md">
            <q-space></q-space>
            <q-btn type="submit" color="primary" label="Save Changes" />
          </div>
        </q-form>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { fb, db } from "boot/firebase";
export default {
  data() {
    return {
      value: null,
      readytosubmit: false,
      profilePhoto: {},
      isPwd: true,
      account: {
        new_password: "",
        confirm_password: ""
      },
      profile: {
        photo: []
      }
    };
  },
  methods: {
    ...mapActions("changepassword", ["changePassword"]),
    ...mapActions("changeprofile", ["changeProfile"]),
    setChangePassword() {
      if (this.account.new_password !== this.account.confirm_password) {
        this.$q.dialog({
          message: "Password do not match"
        });
      } else {
        this.changePassword(this.account);
      }
    },
    uploadProfile(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("profile/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.value = progress;
          },
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
              this.profile.photo = downloadURL;
              this.readytosubmit = true;
            });
          }
        );
      }
    },
    updateProfilePhoto() {
      this.changeProfile(this.profile);
      this.value = null;
      this.readytosubmit = false;
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"])
  },
  mounted() {
    console.log(this.userDetails.photo);
  }
};
</script>

<style>
</style>