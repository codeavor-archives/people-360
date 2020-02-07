<template>
  <q-page class="q-mt-md">
    <div class>
      <div class>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Inspector Position Table</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="text-left">dummy</td>

              <td class="text-left">
                <q-btn
                  round
                  color="primary"
                
                  flat
                  dense
                  icon="edit"
                ></q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <!-- <div class>
        <q-pagination class="q-pt-lg" :max="5"></q-pagination>
      </div>-->
    </div>
    <!-- <q-dialog v-model="showEditPosition">
      <edit-positon @close="showEditPosition = false" :position="position" :id="id"></edit-positon>
    </q-dialog> -->
  </q-page>
</template>

<script>
export default {

}
</script>

<style>

</style>