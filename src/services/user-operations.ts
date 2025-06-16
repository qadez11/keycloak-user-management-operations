import { UnexpectedResponseError } from '@directus/errors';
import { request } from 'directus:api';

export class UserOperationsService {
  private keycloakBaseUrl: string;
  private realm: string;
  private accessToken: string;

  constructor(keycloakBaseUrl: string, realm: string, accessToken: string) {
    this.keycloakBaseUrl = keycloakBaseUrl;
    this.realm = realm;
    this.accessToken = accessToken;
  }

  async createUser(
    enabled: boolean,
    emailVerified: boolean,
    username: string,
    email?: string,
    firstName?: string,
    lastName?: string,
  ): Promise<Object> {
    const url = `${this.keycloakBaseUrl}/admin/realms/${this.realm}/users`;

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
        'Authorization': `Bearer ${this.accessToken}`
      },
      body,
    });

    if (response.status === 201) {
      return { "status": "ok" };
    } else {
      throw new UnexpectedResponseError();
    }
  }

  async deleteUser(userId: string): Promise<Object> {
    const url = `${this.keycloakBaseUrl}/admin/realms/${this.realm}/users/${userId}`;

    const response = await request(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    if (response.status === 204) {
      return { "status": "ok" };
    } else {
      throw new UnexpectedResponseError();
    }
  }

  async updateUser(
    userId: string,
    updates: {
      enabled?: boolean,
      emailVerified?: boolean,
      username?: string,
      email?: string,
      firstName?: string,
      lastName?: string,
    }
  ): Promise<Object> {
    const url = `${this.keycloakBaseUrl}/admin/realms/${this.realm}/users/${userId}`;

    const body = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value != null)
    );

    const response = await request(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body,
    });

    if (response.status === 204) {
      return { "status": "ok" };
    } else {
      throw new UnexpectedResponseError();
    }
  }

  async searchUser(
    enabled?: boolean,
    emailVerified?: boolean,
    username?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
  ): Promise<Object> {
    const queryParams = Object.entries({
      enabled,
      emailVerified,
      username,
      email,
      firstName,
      lastName,
    })
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');

    const url = `${this.keycloakBaseUrl}/admin/realms/${this.realm}/users${queryParams ? `?${queryParams}` : ''}`;

    const response = await request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
    });

    if (response.status === 200) {
      return await response.data;
    } else {
      throw new UnexpectedResponseError();
    }
  }
}