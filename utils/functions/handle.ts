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

    if (!res.ok) return { data: null, message: data.message || data.data.message || "Post Failed" };

    return { data: data, message: data.message || data.data.message || "Post Success" };
  } catch (err) {
    console.log("Fetch data error: ", err);
    return { data: null, message: "Post Error" };
  }
};

export const getData = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data", data);

    if (!res.ok) return { data: null, message: data.data.message || "Get Failed" };

    return { data: data, message: data.data.message || "Get Success" };
  } catch (err) {
    console.log("Fetch data error: ", err);
    return { data: null, message: "Get Error" };
  }
};
