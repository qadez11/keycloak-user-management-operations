import { UnexpectedResponseError } from '@directus/errors';
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

  const body = Object.fromEntries(
    Object.entries({
      username,
      enabled,
      emailVerified,
      email,
      firstName,
      lastName,
    }).filter(([_, value]) => value != null)
  );

  const response = await request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body,
  });

  if (response.status === 201) {
    return { "status": "ok" };
  } else {
    throw new UnexpectedResponseError();
  }

}

export async function deleteUser(
  keycloak_base_url: string,
  realm: string,
  accessToken: string,
  user_id: string,
): Promise<Object> {
  const url = `${keycloak_base_url}/admin/realms/${realm}/users/${user_id}`;

  const response = await request(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (response.status === 204) {
    return { "status": "ok" };
  } else {
    throw new UnexpectedResponseError();
  }
}

export async function updateUser(
  keycloak_base_url: string,
  realm: string,
  accessToken: string,
  user_id: string,
  updates: {
    enabled?: boolean,
    emailVerified?: boolean,
    username?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
  }
): Promise<Object> {
  const url = `${keycloak_base_url}/admin/realms/${realm}/users/${user_id}`;

  // Формируем объект с обновлениями, исключая null и undefined
  const body = Object.fromEntries(
    Object.entries(updates).filter(([_, value]) => value != null)
  );

  const response = await request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body,
  });

  if (response.status === 204) {
    return { "status": "ok" };
  } else {
    throw new UnexpectedResponseError();
  }
}