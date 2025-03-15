import { Client, Account, Databases, ID } from "appwrite";

// 初始化 Appwrite 客户端
export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API 端点
  .setProject("playnest"); // 你的 Appwrite 项目 ID

// 初始化 Account 实例（用于身份认证）
export const account = new Account(client);

// 初始化数据库（如果你要操作数据库）
export const databases = new Databases(client);

// 导出 ID 生成工具（用于创建唯一 ID）
export { ID };
