import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from "../../components/Config";

const initialState = {
  isLoading: false,
  data: "",
  isError: false,
};

export const user = createAsyncThunk("user", async ({ bearerToken }) => {
  try {
    const LoggedInUser = await Config.get("/user", {
      headers: {
        Authorization: bearerToken,
      },
    });
    return LoggedInUser;
  } catch (error) {
    throw error;
  }
});

const UserSlice = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(user.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(user.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(user.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default UserSlice.reducer;
