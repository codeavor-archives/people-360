import { Dialog, Loading } from "quasar";

export function showSuccessMessage(successMessage) {
  Loading.hide();
  Dialog.create({
    title: "Success",
    message: successMessage,
    persistent: true
  }).onOk(() => {});
}
