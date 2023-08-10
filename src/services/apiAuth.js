import secureLocalStorage from "react-secure-storage";
import supabase, { supabaseUrl } from "./supabase";
import { isEqual } from "lodash";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: userData } = await supabase.auth.getUser();
  secureLocalStorage.setItem("login", userData.user);

  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    fullName,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  if (data?.user) {
    const getStoredUser = secureLocalStorage.getItem("login");

    const authUser = data?.user.id;
    const localStoredId = getStoredUser?.id;

    return isEqual(authUser, localStoredId) ? data?.user : { isHacked: true };
  }
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  secureLocalStorage.clear();
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1 . Update password or fullname
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2.  Update the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (error) throw new Error(error.message);

  // 3. Update avatar in the user

  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedUserError) throw new Error(updatedUserError.message);

  return updatedUser;
}
