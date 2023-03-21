export const getOrderLists = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/admin/order/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        pageNum: 1,
        pageSize: 5
      })
    });
    const res_json = await res.json();
    console.log(res_json);
  }
};
