const onlineUsers =
  new Map();

/*
|--------------------------------------------------------------------------
| Online Users Store
|--------------------------------------------------------------------------
*/

export const addUser = (
  userId,
  socketId
) => {
  onlineUsers.set(
    userId,
    socketId
  );
};

export const removeUser =
  (socketId) => {
    for (const [
      userId,
      sId
    ] of onlineUsers.entries()) {

      if (sId === socketId) {
        onlineUsers.delete(
          userId
        );
        break;
      }
    }
  };

export const getUserSocket =
  (userId) => {
    return onlineUsers.get(
      userId
    );
  };

export const getOnlineUsers =
  () => {
    return Array.from(
      onlineUsers.keys()
    );
  };