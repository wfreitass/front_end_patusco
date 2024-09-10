// src/services/AuthService.ts
import axios from 'axios';

const API_URL = 'http://localhost/api/auth';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

class AuthService {

  async login(data: LoginData) {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async signup(data: SignupData) {
    const response = await axios.post(`${API_URL}/register`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getCurrentUserId() {
    
    return parseInt(this.getCurrentUser().user[0].id);
  }
  getRoleRecepcionista() {
    const roles =  this.getCurrentUser().user[1];

    const roleRecepcionista = roles.find(item =>item.id ===2);
    return roleRecepcionista ? true: false;
  }

  getRoleCliente() {
    const roles =  this.getCurrentUser().user[1];

    const roleCliente = roles.find(item =>item.id ===2);
    return roleCliente ? true: false;
  }
}

export default new AuthService();