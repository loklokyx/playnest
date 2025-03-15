import { Client, Account, Databases, ID } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('playnest'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
