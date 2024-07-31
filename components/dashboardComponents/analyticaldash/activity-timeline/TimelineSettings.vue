<template>
  <v-text-field
        v-model="dtext"
        label="Default Text e.g. 'George deo'"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        type="email"
        v-model="emailtext"
        label="Email e.g. 'example@gmail.com"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="password"
        filled
        background-color="transparent"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="placetext"
        label="Placeholder"
        placeholder="Enter Placeholder"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-textarea
        filled
        name="input-7-4"
        rows="3"
        label="Textarea"
        value
        background-color="transparent"
      ></v-textarea>
      
      <div class="mt-4">
        <v-select
          :items="items"
          filled
          label="Input Select"
          background-color="transparent"
        ></v-select>
        <v-text-field
          label="Helping text"
          filled
          background-color="transparent"
          placeholder="Helping text"
          hint="A block of help text that breaks onto a new line and may extend beyond one line."
          persistent-hint
        ></v-text-field>
      </div>
      <v-btn class="mt-5" color="primary">Submit</v-btn>
</template>

<script setup lang="ts">
const dtext = ref("George deo");
const emailtext = ref("");
const password = ref("");
const placetext = ref("");
const show1 = ref(false);
const items = ref(["IT", "Blade Runner", "Thor"]);
const rules = ref({
  required: (value: string) => !!value || "Required.",
  min: (v: string) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => "The email and password you entered don't match",
});
</script>
