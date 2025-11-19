import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { GenerateQuest, Quest, QuestArray } from "@/lib/types/ts/Quest";
import { ApiResponse, Response, SuccessResponse } from "@/lib/types/ts/Response";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { User } from "@/lib/types/ts/User";

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
  }

  // 🧩 Registro de usuario
  async register(data: { user: string; token: string, theme?: string }) {
    const response = await this.api.post<SuccessResponse<{ user: string; token: string, theme: string }>>("/", {
      user: data.user,
      token: data.token,
      theme: data.theme ?? "system"
    });
    return response.data;
  }

  async validate(token: string, cookie = true) {
    const response = await this.api.post<SuccessResponse<User>>("/validate", null, { headers: (cookie ? { Cookie: `x-token-api=${token}` } : { "x-token-api": token }), withCredentials: false })
    return response.data;
  }

  // 🎯 Envío de trivia
  async postTrivia(data: GenerateQuest) {
    const response = await this.api.post<SuccessResponse<Quest>>("/ia", data, {
      metadata: { requestName: 'PostTrivia' }, onUploadProgress: (progress) => {
        const percentCompleted = (progress.loaded / progress.total!) * 100
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