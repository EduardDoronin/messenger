export function calculateCombinedId(user1: any, user2: any) {
  return user1?.uid > user2?.uid ? user1?.uid + user2?.uid : user2?.uid + user1?.uid;
}
