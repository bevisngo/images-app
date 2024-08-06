import { READ_SERVICE_API, WRITE_SERVICE_API } from "../provider";

export async function getProfileAPI() {
  return READ_SERVICE_API.get(`/profile`)
    .then(async (response) => response.data)
    .catch(console.log);
}

export async function updateProfile(profile: any) {
  return WRITE_SERVICE_API.put(`/profile`, profile)
    .then(async (response) => response.data)
    .catch(console.log);
}

export async function updateAvatarAPI(avatar: any) {
  return WRITE_SERVICE_API.put(`/profile/avatar`, avatar)
    .then(async (response) => response.data)
    .catch(console.log);
}
