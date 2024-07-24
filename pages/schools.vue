<template>
  <v-container class="px-5" fluid>
    <div class="py-5 d-flex justify-end">
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="primary text-capitalize"
            prepend-icon="mdi-plus"
            variant="outlined"
            @click="openDialog"
            >Add School</v-btn
          >
        </template>

        <v-card prepend-icon="mdi-school-outline" title="School">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="school.school_name"
                  label="School Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="school.location"
                  label="Location"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              class="text-capitalize"
              text="Close"
              variant="plain"
              @click="close"
            ></v-btn>

            <v-btn
              class="text-capitalize"
              color="primary"
              text="Save"
              variant="tonal"
              @click="save"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize"
              color="blue-darken-1"
              variant="text"
              @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn
              class="text-capitalize"
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-card title="Schools" flat>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>

      <v-data-table
        :headers="headers"
        :items="schools"
        :search="search"
        loading-text="Loading... Please wait"
        :loading="loading"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="me-2"
            size="small"
            @click="editItem(item)"
            color="info"
          >
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)" color="red"
            >mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

const schools = ref([]);
const search = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);
const editingItem = ref(null);
const loading = ref(true);
const apiUrl = "/api/schools";

const school = ref({
  school_id: null,
  school_name: "",
  location: "",
});

const headers = [
  { title: "ID", key: "school_id" },
  { title: "School", key: "school_name" },
  { title: "Location", key: "location" },
  { title: "Actions", key: "actions", sortable: false },
];

const fetchSchools = async () => {
  try {
    loading.value = true;
    const response = await $fetch(apiUrl);
    schools.value = response;
  } catch (error) {
    console.error("Error fetching schools:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSchools);

function openDialog() {
  school.value = {
    school_id: null,
    school_name: "",
    location: "",
  };
  dialog.value = true;
}

function close() {
  dialog.value = false;
}

function closeDelete() {
  dialogDelete.value = false;
}

async function editItem(item) {
  school.value = { ...item };
  dialog.value = true;
}

async function deleteItem(item) {
  editingItem.value = item;
  dialogDelete.value = true;
}

async function deleteItemConfirm() {
  try {
    await $fetch(apiUrl, {
      method: "DELETE",
    });
    fetchSchools();
  } catch (error) {
    console.error("Error deleting school:", error);
  } finally {
    closeDelete();
  }
}

async function save() {
  try {
    if (school.value.school_id) {
      await $fetch(apiUrl, {
        method: "PUT",
        body: school.value,
      });
    } else {
      await $fetch(apiUrl, {
        method: "POST",
        body: school.value,
      });
    }
    fetchSchools();
  } catch (error) {
    console.error("Error saving school:", error);
  } finally {
    close();
  }
}
</script>
