import HttpService from "./HttpService";
import { Animal } from "src/interface/Animal";

class AnimalService{

    async listaAnimais() {
        try {
            const response = await HttpService.get<Animal>("animal");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async listaMyAnimais(id:number) {
        try {
            const response = await HttpService.get<Animal>(`animal/user/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async criarAnimais(data:Animal){
        try {
            data.type_animal_id = data.type_animal_id.id;
            const response = await HttpService.post("animal", data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAnimais(id:number){
        try {
            const response = await HttpService.delete(`animal/${id}`,);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async findAnimais(id:number){
        try {
            const response = await HttpService.get(`animal/${id}`,);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateAnimais(id:number,data:Animal){
        try {
            data.type_animal_id = data.type_animal_id.id;
            const response = await HttpService.put(`animal/${id}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new AnimalService();