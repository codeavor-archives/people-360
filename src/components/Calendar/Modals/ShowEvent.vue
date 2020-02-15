<template>
  <q-card style="width: 500px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">Reservation Details</div>
      <q-space></q-space>
      <div>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
      </div>
    </q-card-section>
    <div class="row">
      <div class="col">
        <q-card-section class="q-pt-none">
          <div class="text-subtitle">
            Company Name:
            {{extendedProps.companyName}}
          </div>
          <div class="row">
            <div>
              <q-card-section
                v-for="equipment in extendedProps.itemPurchase"
                :key="equipment.id"
              >{{equipment.service_equipment}}</q-card-section>
            </div>
            <div>
              <q-card-section v-for="name in extendedProps.name" :key="name.id">{{name}}</q-card-section>
            </div>
            <div>
              <q-card-section
                v-for="quantity in extendedProps.itemPurchase"
                :key="quantity.id"
              >{{quantity.service_quantity}}</q-card-section>
            </div>
            <div>
              <q-card-section
                v-for="price in extendedProps.itemPurchase"
                :key="price.id"
              >{{price.service_price | currency("₱", 2, { decimalSeparator: "." })}}</q-card-section>
            </div>
          </div>
          <div class="text-subtitle">
            Total Price:
            <q-badge>{{extendedProps.totalPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-badge>
          </div>
          <div class="text-subtitle">Company Location: {{extendedProps.location}}</div>

          <div class="text-subtitle">
            With Report:
            <q-badge
              :color="extendedProps.optionReport ? 'green-7' : 'grey-4'"
            >{{ extendedProps.optionReport ? 'Yes': 'No' }}</q-badge>
          </div>
          <div class="text-subtitle">Proposal Number: {{extendedProps.proposalNumber}}</div>
          <div class="text-subtitle">{{start}}</div>
        </q-card-section>
      </div>
      <q-card-actions vertical class="justify-around">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="accent" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
export default {
  props: [
    "events",
    "extendedProps",
    "title",
    "details",
    "id",
    "color",
    "start",
    "end"
  ]
};
</script>

<style>
</style>