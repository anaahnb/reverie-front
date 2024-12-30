
/**
 * Função para realizar o login do usuário.
 * @param {Object} params - Credenciais do usuário { email, password }.
 * @returns {Promise<Object>} - Resposta da API.
 */

import { axios } from "~/plugins/axios";


export const login = (params) => axios.post(`/login/${params}`).then(res => res.data)
