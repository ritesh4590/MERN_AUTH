import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from "../../components/Config";

const initialState = {
  isLoading: false,
  data: "",
  isError: null,
};

export const register = createAsyncThunk("register", async (registerData) => {
  try {
    const { data } = await Config.post("/register", registerData);
    console.log("register:", data);
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const login = createAsyncThunk("login", async (loginData) => {
  try {
    const { data } = await Config.post("/login", loginData);
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const sendPasswordResetLink = createAsyncThunk(
  "sendPasswordResetLink",
  async (email) => {
    try {
      const response = await Config.post("sendpasswordlink", email);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ id, token }) => {
    console.log("Id and Token:", id, token);
    try {
      const responseForgotPassword = await Config.get(
        `/forgotPassword/${id}/${token}`
      );
      console.log("responseForgotPassword", responseForgotPassword);
      return responseForgotPassword;
    } catch (error) {
      console.log("Forgot password Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const updateForgottenPassword = createAsyncThunk(
  "updateForgottenPassword",
  async ({ id, token, password }) => {
    console.log("id:", id);
    console.log("token:", token);
    console.log("Password response:", password);
    try {
      const responseUpdatePassword = await Config.post(`${id}/${token}`, {
        password,
      });
      console.log("responseUpdatePassword:", responseUpdatePassword);
      return responseUpdatePassword;
    } catch (error) {
      console.log("Update password Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isError = action.error.message;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isError = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(sendPasswordResetLink.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendPasswordResetLink.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(sendPasswordResetLink.rejected, (state, action) => {
      state.isError = action.error.message;
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      console.log("forgotPassword payload:", action.payload);
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isError = action.error.message;
    });
    builder.addCase(updateForgottenPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateForgottenPassword.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      console.log("updateForgottenPassword payload:", action.payload);
    });
    builder.addCase(updateForgottenPassword.rejected, (state, action) => {
      state.isError = action.error.message;
    });
  },
});

export default AuthSlice.reducer;
