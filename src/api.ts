/// <reference types="@directus/extensions/api.d.ts" />

import { defineOperationApi } from '@directus/extensions-sdk';

import { getAccessToken } from './services/keycloak-service';
import { createUser, deleteUser } from './services/user-operations';

type Options = {
  keycloak_base_url: string;
  client_id: string;
  client_secret: string;
  realm: string;
  operation: 'create-user' | 'update-user' | 'delete-user';
  user_id?: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  email_verified: boolean;
  enabled: boolean;
};

export default defineOperationApi<Options>({
  id: 'keycloak-user-management-operations',
  handler: async ({
    keycloak_base_url,
    client_id,
    client_secret,
    realm,
    operation,
    user_id,
    user_name,
    first_name,
    last_name,
    email,
    email_verified,
    enabled,
  }) => {
    try {
      const accessToken = await getAccessToken(keycloak_base_url, realm, client_id, client_secret);

      switch (operation) {
        case 'create-user':
          return createUser(
            keycloak_base_url,
            realm,
            accessToken,
            enabled,
            email_verified,
            user_name,
            email,
            first_name,
            last_name
          )
        case 'update-user':
          console.log('Updating user...');
          // Логика для обновления пользователя с использованием accessToken
          break;

        case 'delete-user':
          if (!user_id) {
            throw new Error('user_id is required for delete-user operation');
          }
          return deleteUser(
            keycloak_base_url,
            realm,
            accessToken,
            user_id
          )
        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }
    } catch (error) {
      console.error('Error handling operation:', error);
      throw error;
    }
  },
});
