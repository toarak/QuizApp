<template>
<main class ="container">
  <div class = "config" style="margin: 1em">
    <h4> Config your Quiz </h4>
    <form @submit.prevent = "onGetConfigSubmit" class="mb-3">
        <p>How many questions?</p>
        <input type="number" v-model="setAmount">
        <p>Please select your category</p>
        <select class ="form-select" v-model="selectedCategory">
            <option value="">-- Choose category --</option>
            <option v-for="category of categories" 
                    :value="category"
                    :key="category.id">
              {{ category.name }}
            </option>
        </select>
        <p> How difficult do you want it?</p>
        <select class ="form-select" v-model="selectedDifficulty">
            <option value="">-- Select difficulty --</option>
            <option v-for="difficulty of difficulties"
                    :value="difficulty"
                    :key="difficulty.id">
                {{ difficulty.name}}
            </option>
        </select>
      <br />
      <p><button type="submit"> GET STARTED </button></p>
    </form>
  </div>
</main>
</template>


<script>
import { setConfig } from "@/utils/config.js";

export default {
    name: "Config",

    methods: {

      onGetConfigSubmit() {
        this.error = "";

        if (this.setAmount == 0){
          this.error ="You need to set an amount";
          window.alert(this.error);
          return;
        }

        if (this.selectedCategory == ""){
          this.error ="You need to select a category";
          window.alert(this.error);
          return;
        }

        if (this.selectedDifficulty == ""){
          this.error ="You need to select a category";
          window.alert(this.error);
          return;
        }

        //safe it
        setConfig({
          amount: this.setAmount,
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty

        });

        //redirect
        this.$router.push("/Questions");
      },
    },

     data() {
        return {
          error: "",
          setAmount: 0,
          selectedCategory: "",
          selectedDifficulty: "",
          categories: [
            { id: "27", name: "Animals" },
            { id: "25", name: "Art" },
            { id: "26", name: "Celebrities" },
            { id: "16", name: "Entertainment: Board Games" },
            { id: "10", name: "Entertainment: Books" },
            { id: "32", name: "Entertainment: Cartoon &amp; Animations" },
            { id: "29", name: "Entertainment: Comics" },
            { id: "11", name: "Entertainment: Film" },
            { id: "31", name: "Entertainment: Japanese Anime &amp; Manga" },
            { id: "12", name: "Entertainment: Music" },
            { id: "13", name: "Entertainment: Musicals &amp; Theatres" },
            { id: "14", name: "Entertainment: Television" },
            { id: "15", name: "Entertainment: Video Games" },
            { id: "22", name: "Geography" },
            { id: "9",  name: "General Knowledge" },
            { id: "23", name: "History" },
            { id: "20", name: "Mythology" },
            { id: "24", name: "Politics" },
            { id: "17", name: "Science & Nature" },
            { id: "18", name: "Science: Computers" },
            { id: "30", name: "Science: Gadgets" },
            { id: "19", name: "Science: Mathematics" },
            { id: "21", name: "Sports" },
            { id: "28", name: "Vehicles" },
          ],
          difficulties: [
            { id: "easy", name: "Easy" },
            { id: "medium", name: "Medium" },
            { id: "hard", name: "Hard" },
          ],
        };
      }
};
</script>