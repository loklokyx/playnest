import { Client, Account, Databases, ID } from "appwrite";

// Initialize Appwrite client
export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API endpoint
  .setProject("playnest"); // Your Appwrite project ID

// Initialize Account instance (for authentication)
export const account = new Account(client);

// Initialize Databases (if you need to operate on databases)
export const databases = new Databases(client);

// Export ID generation tool (for creating unique IDs)
export { ID };
