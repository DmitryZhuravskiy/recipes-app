export const useGetUserID: () => string | null = () => {
  return window.localStorage.getItem("userID");
};
