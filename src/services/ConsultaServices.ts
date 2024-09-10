import { TipoAnimal } from "src/interface/TipoAnimal";
import HttpService from "./HttpService";

class ConsultaService{

    async listaConsultas(){
        try {
            const response = await HttpService.get("consultation");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    async criarConsulta(data:any){
        try {
            data.animal_id = data.animal_id.id;
            data.turno = data.turno.id;
            const response = await HttpService.post("consultation", data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteConsulta(id:number){
        try {
            const response = await HttpService.delete(`consultation/${id}`,);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async findConsulta(id:number){
        try {
            const response = await HttpService.get(`consultation/${id}`,);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateConsulta(id:number,data:any){
        try {
            data.animal_id = data.animal_id.id;
            data.turno = data.turno.id;
            const response = await HttpService.put(`consultation/${id}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new ConsultaService();