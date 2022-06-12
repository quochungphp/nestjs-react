import { getServerUrl } from "../utils/envs";
import { Api } from "./api";
import { AuthSigninPayloadDto, UserResponseDto, UserSignUpPayloadDto } from "../domain/viact-backend-interface";

class ServerApi extends Api{
  constructor() {
    super();
    this.baseUrl = getServerUrl()
    const headers = {
      "Content-Type": "application/json",
    };

    this.setHeaders(headers);
  }
  async authSignIn(
    payload: AuthSigninPayloadDto
  ): Promise<UserResponseDto> {
    const response = await  this.post(`/auth`,payload);
    this.setTokensFromResponse(response);
    return response.data
  }

  async userSignUp(
    payload: UserSignUpPayloadDto
  ): Promise<UserResponseDto> {
    const response = await  this.post(`/users`,payload);
    this.setTokensFromResponse(response);
    return response.data
  }
  
}

export const serverApi = new ServerApi();
