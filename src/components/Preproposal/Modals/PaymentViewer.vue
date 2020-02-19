<template>
  <q-card style="width: 700px; max-width: 90vh;">
    <div>
      <q-img :src="proposals.paymentSlip" />
    </div>
  </q-card>
</template>

<script>
export default {
  props: ["proposals", "id"]
};
</script>

<style></style>
