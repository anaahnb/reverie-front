import $axios from 'axios'
import AxiosHelper from '~/helper/axios';

const HOST_API = import.meta.env.APP_HOST_API;
export const API_BASE_ENDPOINT = `https://${HOST_API}`

AxiosHelper.appendHeader('Content-Type', 'application/json')
AxiosHelper.appendHeader('Accept-Language', 'pt-br')
AxiosHelper.appendHeader('X-Company', '')

export const headers = AxiosHelper.getHeaders()

export const axios = $axios.create({
    baseURL: API_BASE_ENDPOINT,
    headers: AxiosHelper.getHeaders()
})

export default defineNuxtPlugin(nuxtApp => {
	return {
			provide: {
					axios: $axios
			}
	}
});