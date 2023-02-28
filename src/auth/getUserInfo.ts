export interface UserInfoDetails {
  id: number;
  name: string;
  username: string;
  email: string;
}

async function getUserInfo() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const payload = (await response.json()) as UserInfoDetails;
    const { id, name, username, email } = payload;
    return { id, name, username, email } as UserInfoDetails;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unable to get profile information');
  }
}

export default getUserInfo;
