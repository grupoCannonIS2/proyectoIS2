import { axiosInstance } from ".";

//Users Endpoints

export const getUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    return res.status(204);
  } catch (error) {
    return error.message;
  }
};
