<template>
  <v-card title="Students" flat>
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

    <v-data-table :headers="headers" :items="students" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue";

const students = ref([]);
const search = ref("");

const headers = [
  { title: "ID", key: "student_id" },
  { title: "Chest Number", key: "chest_number" },
  { title: "Name", key: "student_name" },
  { title: "EMIS", key: "emis" },
  { title: "Date of Birth", key: "date_of_birth" },
  { title: "Gender", key: "gender" },
  { title: "Grade Level", key: "grade_level" },
  { title: "School Name", key: "school_name" },
  { title: "Actions", key: "actions", sortable: false },
];

const fetchStudents = async () => {
  try {
    const response = await $fetch("/api/students");
    students.value = response;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

onMounted(async () => {
  fetchStudents();
});
</script>
