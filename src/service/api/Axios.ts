import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { GenerateQuest, Quest, QuestArray } from "@/lib/types/ts/Quest";
import { ApiResponse, Response, SuccessResponse } from "@/lib/types/ts/Response";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";

interface AxiosRequestConfigWithMeta extends AxiosRequestConfig {
  metadata?: {
    requestName: string;
    startTime?: number;
  };
}



export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL = "http://localhost:3000/api") {
    this.api = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error Interceptor:', error);
        const requestName = error.config?.metadata?.requestName || 'Unknown Request'; 

        if (!error.response) {
          const globalError = new ErrorGlobal(requestName, `No response from service for ${requestName}`, {
            code: 'ERR_NO_RESPONSE',
            status: 503,
          });
          return Promise.reject(new ErrorApi(globalError.toJSON()));
        }

        if (error.response && error.response.data && !error.response.data.code) {
          const globalError = new ErrorGlobal(requestName, `Error en el servicio ${requestName}`, {
            code: 'ERR_SERVICE',
            status: error.response.status,
          })
          return Promise.reject(new ErrorApi(globalError.toJSON()));
        }

        return Promise.reject(new ErrorApi(error.response.data));
        }
    )
  }

  // 🧩 Registro de usuario
  async register(data: { user: string; token: string }) {
    const response = await this.api.post<SuccessResponse<{ username: string; token: string }>>("/", {
      user: data.user,
      token: data.token,
    });
    return response.data;
  }

  // 🎯 Envío de trivia
  async postTrivia(data: GenerateQuest) {
    const response = await this.api.post<SuccessResponse<Quest>>("/ia", data, {
        metadata: { requestName: 'PostTrivia' }, onUploadProgress: (progress) => {
          const percentCompleted = (progress.loaded / progress.total!) * 100
          console.log(percentCompleted)
        }
    } as AxiosRequestConfigWithMeta);
    return response.data;
  }
}


export class ErrorApi {

  constructor(readonly response: any) {
    this.response = response
    Object.setPrototypeOf(this, new.target.prototype);
  }
}