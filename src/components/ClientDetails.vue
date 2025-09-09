<template>
  <div class="lg:flex">
    <div class="lg:w-1/2 xl:max-w-screen-sm">
      <div
        class="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12"
      >
        <div class="cursor-pointer flex items-center">
          <div>
            <svg
              class="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style="enable-background: new 0 0 225 225"
              xml:space="preserve"
            >
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    class="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div
            class="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
          >
            Chatbase
          </div>
        </div>
      </div>
      <div
        class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
      >
        <h2
          class="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-2xl xl:text-bold"
        >
          Connect Your database
        </h2>
        <div class="mt-12 grid-cols-2">
          <form @submit.prevent="Connect" autocomplete="on">
            <div class="mt-8" v-for="(label, index) in fields" :key="index">
              <div class="flex justify-between items-center">
                <div class="text-sm font-bold text-gray-700 tracking-wide">
                  {{
                    label == "Ssl"
                      ? label + " (Choose if sslmode is require)"
                      : label
                  }}
                </div>
              </div>
              <select
                v-model="database"
                v-if="label == 'Choose Your Database'"
                class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option disabled value>Select the Database</option>
                <option
                  v-for="(option, index) in options"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <div v-else-if="label === 'Ssl'">
                <label>
                  <input
                    type="checkbox"
                    class="mt-5"
                    v-model="formData[label.toLowerCase()]"
                  />
                  require
                </label>
              </div>
              <input
                v-else
                v-model="formData[label.toLowerCase()]"
                class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                :type="
                  label === 'Password'
                    ? 'password'
                    : label === 'Port'
                    ? 'number'
                    : 'text'
                "
                :placeholder="`Enter the ${label.toLowerCase()}`"
              />
            </div>

            <div class="mt-10">
              <button
                type="submit"
                class="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              >
                Connect
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="hidden lg:flex items-center justify-center bg-indigo-100 flex-1"
    >
      <div class="justify-center w-xl">
        <img src="/src/assets/image.png" />
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
const emit = defineEmits(["chatpage"]);
const formData = ref({
  host: "",
  username: "",
  password: "",
  port: "",
  database: "",
  ssl: false,
});
const database = ref("");
const options = ["Mysql", "PostgreSQL", "CockroachDb", "MariaDB"];
const server = {
  Mysql: "mysql",
  PostgreSQL: "postgresql",
  CockroachDb: "postgres",
  MariaDB: "mariadb",
};

const fields = [
  "Choose Your Database",
  "Username",
  "Password",
  "Host",
  "Port",
  "Database",
  "Ssl",
];

async function Connect() {
  const enocodePassword = encodeURIComponent(formData.value.password);
  const connectionString = `${server[database.value]}://${
    formData.value.username
  }:${enocodePassword}@${formData.value.host}:${formData.value.port}/${
    formData.value.database
  }`;
  const data = {
    connectionString,
    sslmode: formData.value.ssl,
  };
  try {
    const response = await axios.post("/api/connect", data);
    if (response.data.success)
      emit("chatpage", { connectionString, ssl: formData.value.ssl });
  } catch (error) {
    alert("Invalid Credentials")
    console.log("connerror", error);
  }
}
</script>
