import { request } from 'directus:api';

export async function createUser(
  keycloak_base_url: string,
  realm: string,
  accessToken: string,
  enabled: boolean,
  emailVerified: boolean,
  username: string,
  email?: string,
  firstName?: string,
  lastName?: string,
): Promise<Object> {
  const url = `${keycloak_base_url}/admin/realms/${realm}/users`;
  try {
    const response = await request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: {
        "username": username,
        "enabled": enabled,
        "emailVerified": emailVerified,
        "email": email,
        "firstName": firstName,
        "lastName": lastName
      },
    });

    if (response.status === 201) {
      return { "status": "ok" };
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function deleteUser(
  keycloak_base_url: string,
  realm: string,
  accessToken: string,
  user_id: string,
): Promise<Object> {
  const url = `${keycloak_base_url}/admin/realms/${realm}/users${user_id}`;
  try {
    const response = await request(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response.status === 204) {
      return { "status": "ok" };
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}