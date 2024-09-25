import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OutlayRowRequest } from "../type/ProjectType";
import { updateGlobalState } from "../utils/updateGlobalState";
import { RequestData } from "../type/RequestData";

//const ID = { id: 128698, rowName: "d7c41e01-8b92-499c-b029-c9e95980064e" };
const ID = { id: 130026, rowName: "ff3eedcd-834f-411f-a124-f665981b70b2" };
export interface ICountLessons {
  [key: string]: number;
}

export interface IInitialState {
  success: boolean;
  data: OutlayRowRequest[];
  loading: boolean;
}
const state: IInitialState = {
  success: false,
  data: [],
  loading: true,
};
async function fetchDataWithRetry<T>(url: string, option: RequestInit) {
  let retry = 0;
  while (retry < 3) {
    try {
      const response = await Promise.race([
        fetch(url, option),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Превышено время ожидания")), 3000)
        ),
      ]);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Что-то пошло не так!");
      }
      const data: T = await response.json();
      return data;
    } catch (error) {
      retry++;
      if (retry === 3) {
        const errorMessage = (error as Error).message || "Что-то пошло не так!";
        throw new Error(`Ошибка после ${retry} попыток: ${errorMessage}`);
      }
    }
  }
  throw new Error("Не удалось получить ответ от сервера после всех попыток :(");
}
export const GET_DATA = createAsyncThunk<
  OutlayRowRequest[],
  undefined,
  {
    rejectValue: string;
  }
>("page/GET_DATA", async (_, { rejectWithValue }) => {
  try {
    const url = `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/list`;
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetchDataWithRetry<OutlayRowRequest[]>(url, option);
    return data;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const CREATE_ROW = createAsyncThunk<
  RequestData,
  { requestData: OutlayRowRequest },
  {
    rejectValue: string;
  }
>("page/CREATE_ROW", async ({ requestData }, { rejectWithValue }) => {
  try {
    const url = `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/create`;
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const data = await fetchDataWithRetry<RequestData>(url, option);
    return data;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const UPDATE_ROW = createAsyncThunk<
  RequestData,
  { rID: number | null; requestData: OutlayRowRequest },
  {
    rejectValue: string;
  }
>("page/UPDATE_ROW", async ({ rID, requestData }, { rejectWithValue }) => {
  try {
    const url = `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/${rID}/update`;
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const data = await fetchDataWithRetry<RequestData>(url, option);
    return data;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

export const DELETE_ROW = createAsyncThunk<
  RequestData,
  { rID: number },
  {
    rejectValue: string;
  }
>("page/DELETE_ROW", async ({ rID }, { rejectWithValue }) => {
  try {
    const url = `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/${rID}/delete`;
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetchDataWithRetry<RequestData>(url, option);
    return data;
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
  },
  extraReducers: (builder) => {
    builder.addCase(GET_DATA.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(GET_DATA.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(GET_DATA.rejected, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(CREATE_ROW.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(CREATE_ROW.fulfilled, (state, action) => {
      const rID = action.meta.arg.requestData.parentId;
      return {
        ...state,
        loading: false,
        data: updateGlobalState(state.data, [...action.payload.changed], null, {
          ...action.payload.current,
          parentId: rID,
          child: [],
        }),
      };
    });
    builder.addCase(UPDATE_ROW.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(UPDATE_ROW.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        data: updateGlobalState(state.data, [
          ...action.payload.changed,
          action.payload.current,
        ]),
      };
    });
    builder.addCase(DELETE_ROW.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(DELETE_ROW.fulfilled, (state, action) => {
      const rID = action.meta.arg.rID;
      return {
        ...state,
        loading: false,
        data: updateGlobalState(state.data, [...action.payload.changed], rID),
      };
    });
  },
});

export const { SET_LOADING } = slice.actions;
export default slice.reducer;

// fetch(
//     " http://185.244.172.108:8081/v1/outlay-rows/entity/create",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
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
