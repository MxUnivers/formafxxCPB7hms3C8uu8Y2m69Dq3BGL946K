import { localStorageKeys, profileRoleType } from "./localvalue";

export const isAdmin = () => {
  const role = getAndCheckLocalStorage(localStorageKeys.profileRole); // ex: "SuperAdmin"
  return role === profileRoleType.ADMIN;
};

export const isInstructor = () => {
  const role = getAndCheckLocalStorage(localStorageKeys.profileRole); // ex: "SuperAdmin"
  return role === profileRoleType.INSTRUCTOR;
};
export const isSupport = () => {
  const role = getAndCheckLocalStorage(localStorageKeys.profileRole); // ex: "SuperAdmin"
  return role === profileRoleType.SUPPORT;
};
export const isSudent = () => {
  const role = getAndCheckLocalStorage(localStorageKeys.profileRole); // ex: "SuperAdmin"
  return role === profileRoleType.STUDENT;
};