import { request } from 'directus:api';

export async function getAccessToken(
  keycloak_base_url: string,
  realm: string,
  client_id: string,
  client_secret: string
): Promise<string> {
  const url = `${keycloak_base_url}/realms/${realm}/protocol/openid-connect/token`;
  try {
    const response = await request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials'
      },
    });

    const data = await response.data as Record<string, any>;
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
}