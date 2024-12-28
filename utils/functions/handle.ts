export const postData = async (url: string, payload: any) => {
  try {
    // console.log("url, payload", url, payload);

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log("data", data);

    if (!res.ok)
      return {
        data: null,
        message: data?.message || data?.data?.message || "Post Failed",
      };

    return {
      data: data,
      message: data?.message || data?.data?.message || "Post Success",
    };
  } catch (err) {
    console.log("Fetch data error: ", err);
    return { data: null, message: "Post Error" };
  }
};

export const getData = async (url: string, token?: string) => {
  try {
    // console.log("url", url);
    const headers: any = {
      "Content-Type": "application/json",
    };

    // Thêm Authorization header nếu có token
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    // console.log("res", res);

    const data = await res.json();
    // console.log("data", data);
    // console.log("resssssssssssssss", res.ok);

    if (!res.ok)
      return { data: null, message: data?.message || data?.data?.message || "Get Failed" };

    return { data: data, message: data?.message || data?.data?.message || "Get Success" };
  } catch (err) {
    console.error("Fetch data error: ", err);
    return { data: null, message: "Get Error" };
  }
};

export const putData = async (url: string, payload: any, token?: string) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Thêm token nếu có
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        message: data?.message || data?.data?.message || "Put Failed",
      };
    }

    return {
      data: data,
      message: data?.message || data.data?.message || "Put Success",
    };
  } catch (err) {
    console.error("Fetch data error: ", err);
    return { data: null, message: "Put Error" };
  }
};

export const deleteData = async (url: string, token?: string) => {
  try {
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: "DELETE",
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        message: data.message || data.data?.message || "Delete Failed",
      };
    }

    return {
      data: data,
      message: data.message || data.data?.message || "Delete Success",
    };
  } catch (err) {
    console.error("Fetch data error: ", err);
    return { data: null, message: "Delete Error" };
  }
};
