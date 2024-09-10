<template>
  <q-page padding class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-form @submit="onSave()">
        <q-input v-model="tipoAnimalData.name" label="Nome" type="text" required />
        <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md" />
      </q-form>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import { TipoAnimal } from 'src/interface/TipoAnimal';
import TipoAnimalService from 'src/services/TipoAnimalService';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  // name: 'PageName'
  setup() {
    const router = useRouter();

    const id: any = parseInt(useRoute().params.id);

    const tipoAnimalData = ref<TipoAnimal>({ name: '' });

    onMounted(() => {
      if (id) {
        onloadTipoAnimal(id);
      }
    });

    const onloadTipoAnimal = async (id: number) => {
      try {
        const response: any = await TipoAnimalService.findTipoAnimais(id);
        tipoAnimalData.value = response.data;

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
        const tipoAnimal = await TipoAnimalService.criarTipoAnimais(tipoAnimalData.value);
        if (tipoAnimal) {
          router.push({ path: '/tipo-animal/' })
        }
      } catch (error) {
        console.error(error);
      }
    };

    const onUpdate = async () => {
      try {
        const tipoAnimal = await TipoAnimalService.updateTipoAnimais(id, tipoAnimalData.value);
        if (tipoAnimal) {
          router.push({ path: '/tipo-animal/' })
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      onCreate,
      tipoAnimalData, onloadTipoAnimal, onSave
    };
  }
})
</script>
