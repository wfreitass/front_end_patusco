import { TipoAnimal } from "src/interface/TipoAnimal";
import HttpService from "./HttpService";

class TipoAnimalService{

    async listaTipoAnimais(){
        try {
            const response = await HttpService.get("type_animal");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async criarTipoAnimais(data:TipoAnimal){
        try {
            const response = await HttpService.post("type_animal", data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTipoAnimais(id:number){
        try {
            const response = await HttpService.delete(`type_animal/${id}`,);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async findTipoAnimais(id:number){
        try {
            const response = await HttpService.get(`type_animal/${id}`,);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateTipoAnimais(id:number,data:TipoAnimal){
        try {

            const response = await HttpService.put(`type_animal/${id}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new TipoAnimalService();