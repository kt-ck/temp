export const getAllCategory = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.OptionalUrl + "/category/getAll/", {
      method: "get",
      headers: {
        Authorization: token,
      },
    });
    const res_json = await res.json();
    console.log(JSON.parse(res_json));
    return JSON.parse(res_json).categories
  }
};

export const delCategory = async (categoryId:string) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const res = await fetch(process.env.OptionalUrl + `/category/delete/?categoryId=${categoryId}`, {
        method: "post",
        headers: {
          Authorization: token,
        },
      });
      const res_json = await res.json();
      console.log(res_json);
    }
}

export const addCategory = async (parentId:string,name:string,level:number) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const res = await fetch(process.env.OptionalUrl + `/category/add/?parentId=${parentId}&name=${name}&level=${level}`, {
        method: "post",
        headers: {
          Authorization: token,
        },
      });
      const res_json = await res.json();
      console.log(res_json);
    }
}

