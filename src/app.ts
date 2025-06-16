import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'keycloak-user-management-operations',
	name: 'Keycloak User Management',
	icon: 'shield',
	description: 'User management in Keycloak via Directus.',
	overview: ({ keycloak_base_url, realm, operation }) => [
		{
			label: "Keycloak Base URL",
			text: keycloak_base_url ?? "Not specified"
		},
		{
			label: "Realm",
			text: realm ?? "Not specified"
		},
		{
			label: 'Operation',
			text: operation ?? "Not specified"
		},
	],
	options: (context) => {
		return [
			{
				field: 'keycloak_base_url',
				name: 'Keycloak Base URL',
				type: 'string',
				meta: {
					required: true,
					width: 'full',
					interface: 'input',
					note: "Example: https://idp.my.host.com"
				},
			},
			{
				field: 'client_id',
				name: 'Client ID',
				type: 'string',
				meta: {
					required: true,
					width: 'full',
					interface: 'input',
					note: "The client identifier registered with the identity provider."
				},
			},
			{
				field: 'client_secret',
				name: 'Client Secret',
				type: 'string',
				meta: {
					required: true,
					width: 'full',
					interface: 'input'
				},
			},
			{
				field: 'realm',
				name: 'Realm',
				type: 'string',
				meta: {
					required: true,
					width: 'full',
					interface: 'input',
					note: "Read more here: https://www.keycloak.org/docs/latest/server_admin/index.html#_configuring-realms"
				},
			},
			{
				field: 'operation',
				name: 'Operation',
				type: 'string',
				meta: {
					required: true,
					width: 'full',
					interface: 'select-dropdown',
					options: {
						choices: [
							{
								text: 'Create User',
								value: 'create-user',
							},
							{
								text: 'Update User',
								value: 'update-user',
							},
							{
								text: 'Delete User',
								value: 'delete-user',
							},
							{
								text: 'Search User',
								value: 'search-user',
							}
						]
					},
				},
			},
			{
				field: 'user_id',
				name: 'User ID',
				type: 'string',
				meta: {
					required: context.operation === 'delete-user' || context.operation === 'update-user',
					hidden: context.operation === 'create-user' || context.operation === 'search-user',
					width: 'full',
					interface: 'input',
				},
			},
			{
				field: 'user_name',
				name: 'User Name',
				type: 'string',
				meta: {
					required: context.operation === 'create-user',
					hidden: context.operation === 'delete-user' || context.operation === 'update-user',
					width: 'full',
					interface: 'input',
				},
			},
			{
				field: 'first_name',
				name: 'First Name',
				type: 'string',
				meta: {
					hidden: context.operation === 'delete-user',
					width: 'full',
					interface: 'input',
				},
			},
			{
				field: 'last_name',
				name: 'Last Name',
				type: 'string',
				meta: {
					hidden: context.operation === 'delete-user',
					width: 'full',
					interface: 'input',
				},
			},
			{
				field: 'email',
				name: 'Email',
				type: 'string',
				meta: {
					hidden: context.operation === 'delete-user',
					width: 'half-left',
					interface: 'input',
				},
			},
			{
				field: 'email_verified',
				name: 'Email Verified',
				type: 'boolean',
				meta: {
					required: context.operation === 'create-user' || context.operation === 'update-user',
					hidden: context.operation === 'delete-user',
					width: 'half-right',
				},
				schema: {
					default_value: false,
				},
			},
			{
				field: 'enabled',
				name: 'Enabled',
				type: 'boolean',
				meta: {
					required: context.operation === 'create-user' || context.operation === 'update-user',
					hidden: context.operation === 'delete-user',
					width: 'full',
				},
				schema: {
					default_value: true,
				},
			},
		]
	}
});
