import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./Store";

const ID = {"id":128698, "rowName":"d7c41e01-8b92-499c-b029-c9e95980064e"}
export interface ICountLessons {
  [key: string]: number;
}
export interface IData {
    name: string,
    amount: number,
    category: string,
  
}
const mockOutlayRowRequest = {

  name: "Новая строка",

  amount: 100,

  category: "Расходы",


};

export interface IInitialState {
  success: boolean;
  listLessons: ICountLessons;
  loading: boolean;
  meetTheUser: boolean,
}
const state: IInitialState = {
  success: false,
  listLessons: {},
  loading: true,
  meetTheUser: true
};
export const GET_DATA = createAsyncThunk<
  { success: boolean; message: string },
  undefined,
  {
    rejectValue: string;
  }
>("page/GET_DATA", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CREATE_ROW = createAsyncThunk<
  { success: boolean; message: string },
  { eID: number; requestData: IData }, 
  {
    rejectValue: string;
  }
>("page/CREATE_ROW", async ({ eID, requestData }, { rejectWithValue }) => { 
  try {
    const response = await fetch(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/create`, 
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), 
      }
    );
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const UPDATE_ROW = createAsyncThunk<
  { success: boolean; message: string },
  { eID: number; rID: number; requestData: IData },
  {
    rejectValue: string;
  }
>("page/UPDATE_ROW", async ({ eID, rID, requestData }, { rejectWithValue }) => { 
  try {
    const response = await fetch(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/${rID}/update`, 
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), 
      }
    );
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const DELETE_ROW = createAsyncThunk<
  { success: boolean; message: string },
  { eID: number; rID: number }, 
  {
    rejectValue: string;
  }
>("page/DELETE_ROW", async ({ eID, rID }, { rejectWithValue }) => { 
  try {
    const response = await fetch(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/${rID}/delete`, 
      {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});



const slice = createSlice({
  name: "Page",
  initialState: state,
  reducers: {
    SET_LOADING: (state, action) => {
      state.loading = action.payload;
    },
    SET_MEET_THE_USER: (state, action) => {
      state.meetTheUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GET_DATA.fulfilled, (state, action) => {
      console.log("?///////////", action.payload)
      return {
        ...state,
        success: true,
        message: action.payload.message,
      };
    });
    builder.addCase(GET_DATA.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        message: action.payload as string,
      };
    });
  },
});

export const { SET_LOADING,  SET_MEET_THE_USER } =
  slice.actions;
export default slice.reducer;

//   fetch(
  //     " http://185.244.172.108:8081/v1/outlay-rows/entity/create",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       // body: JSON.stringify({
  //       //   email,
  //       //   password,
  //       // }),
  //     }
  //   )
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Fetch error:', error);
  //   });