import { AUTH_SERVICE_API } from "../provider";

export async function signupAPI(payload: any) {
  return AUTH_SERVICE_API.post(`/auth/register`, payload)
    .then(async (response) => response.data)
    .catch(console.log);
}
