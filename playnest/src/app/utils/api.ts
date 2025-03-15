import {databases} from "@/app/(auth)/auth"
import {client} from "@/app/(auth)/auth"
import {Query} from "appwrite";
//get list of game requests where state is pending
async function getPendingGameRequests() {
    try {
        const response = await databases.listDocuments(
            'PlaynestDB',
            '67d5d8790001467b4a09',
            [
                Query.equal('state', 'pending')
            ]
        );
        return response.documents;
    } catch (error) {
        console.error('Error fetching pending game requests:', error);
        throw error;
    }
}

export {getPendingGameRequests};
//get user names and contact numbers of the person based on the match result
async function getUserDetailsByMatchResult(matchResult: string[][]) {
  try {
    // Flatten user IDs from all groups
    const userIds = matchResult.flat();

    if (userIds.length === 0) {
      return [];
    }

    // Fetch all users in one query
    const response = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USERS_COLLECTION_ID!, // Ensure this is the correct users collection
      [Query.equal("userid", userIds)]
    );

    const userMap = new Map(response.documents.map(user => [user.userid, {
      userName: user.userName,
      contactNumber: user.contactNumber
    }]));

    // Reconstruct match groups with user details
    const enrichedGroups = matchResult.map(group =>
      group.map(userId => userMap.get(userId) || { userName: "Unknown", contactNumber: "N/A" })
    );

    return enrichedGroups;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

export { getUserDetailsByMatchResult };



