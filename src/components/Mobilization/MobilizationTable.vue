<template>
  <q-page>
    <div>
      <div>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="15">
                <div class="row no-wrap items-center">
                  <div class="text-h5 text-primary">Mobilization Table</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Location</th>
              <th class="text-left">New Client Price</th>
              <th class="text-left">Old Client Price</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dummy</td>
              <td>Dummy</td>
              <td>Dummy</td>
              <td>Dummy</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      mobilizationFees: fs.collection("mobilizationFees")
    };
  }
};
</script>

<style>
</style>