export const getStoreList = async (pageNum: number) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl +
        `/store_info/getList/?pageSize=8&pageNum=${pageNum}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const res_json = await res.json();
    console.log(res_json)
    return {storeList:res_json.stores,total: res_json["pageTotal "]};
  }
};
export const getStoreDetails = async (store_id: string) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl + `/store_info/getById/?store_id=${store_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const res_json = await res.json();
    console.log(res_json);
  }
};

export const deleteStores = async (store_id: string) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl + `/store_info/delete/?store_id=${store_id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const res_json = await res.json();
    console.log(res_json);
  }
};

export const addStores = async (
  store_name: string,
  address: string,
  phone_number: string,
  status: string
) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    console.log(store_name, address, phone_number, status)
    const res = await fetch(process.env.OptionalUrl + `/store_info/add/?store_name=${store_name}&address=${address}&phone_number=${phone_number}&status=${status}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res_json = await res.json();
    console.log(res_json);
  }
};
