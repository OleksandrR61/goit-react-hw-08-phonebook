export const selectUserName = ({auth}) => auth.userName;
export const selectIsLoggedIn = ({auth}) => auth.isLoggedIn;
export const selectIsAuthLoading = ({auth}) => auth.isAuthLoading;