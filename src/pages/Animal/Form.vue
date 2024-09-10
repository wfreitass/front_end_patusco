<template>
  <q-page padding class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-form @submit="onSave()">
        <q-input v-model="animalData.name" label="Nome" type="text" required />
        <q-input v-model="animalData.age" label="Idade" type="number" required />
        <q-select v-model="animalData.type_animal_id" option-label="name" option-value="id" :options="listTipoAnimal"
          label="Selecione um animal" filled />
        <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md" />
      </q-form>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import { Animal } from 'src/interface/Animal';
import { TipoAnimal } from 'src/interface/TipoAnimal';
import AnimalService from 'src/services/AnimalService';
import TipoAnimalService from 'src/services/TipoAnimalService';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  // name: 'PageName'
  setup() {
    const router = useRouter();
    const listTipoAnimal = ref([]);

    const id: any = parseInt(useRoute().params.id);

    const animalData = ref<Animal>({ name: '', age: 0, type_animal_id: null });

    onMounted(() => {
      loadTipoAnimal();

      if (id) {
        onLoadAnimal(id);
      }
    });

    const loadTipoAnimal = async () => {
      try {
        const response: any = await TipoAnimalService.listaTipoAnimais();
        listTipoAnimal.value = response.data;
      } catch (error) {
        console.log(error)
      }
    }

    const onLoadAnimal = async (id: number) => {
      try {
        const response: any = await AnimalService.findAnimais(id);
        response.data.type_animal_id = response.data.tipo_animal
        animalData.value = response.data;

      } catch (error) {
        console.error(error);
      }
    };

    const onSave = () => {
      if (id) {
        return onUpdate();
      }
      return onCreate();
    };

    const onCreate = async () => {
      try {
        const tipoAnimal = await AnimalService.criarAnimais(animalData.value);
        if (tipoAnimal) {
          router.push({ path: '/animal/' })
        }
      } catch (error) {
        console.error(error);
      }
    };

    const onUpdate = async () => {
      try {
        const animal = await AnimalService.updateAnimais(id, animalData.value);
        if (animal) {
          router.push({ path: '/animal/' })
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      onCreate,
      animalData, onLoadAnimal, onSave, listTipoAnimal
    };
  }
})
</script>
