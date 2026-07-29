export function canViewPlayer(user, playerId) {
  if (!user) return false;

  if (user.role === "coach" || user.role === "admin") {
    return true;
  }

  if (user.role === "player") {
    return user.playerProfile?.id === playerId;
  }

  if (user.role === "parent") {
    return (user.linkedChildren || []).some(
      (child) => child.id === playerId
    );
  }

  return false;
}

export function canViewTeamAnalytics(user) {
  return user?.role === "coach" || user?.role === "admin";
}

export function canUploadMatch(user) {
  return user?.role === "coach" || user?.role === "admin";
}

export function permittedPlayerIds(user) {
  if (!user) return [];

  if (user.role === "player") {
    return user.playerProfile?.id
      ? [user.playerProfile.id]
      : [];
  }

  if (user.role === "parent") {
    return (user.linkedChildren || []).map(
      (child) => child.id
    );
  }

  return ["*"];
}
