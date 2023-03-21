export const getAllProducts = async () => {
    const token = window.localStorage.getItem("token")
    if(token){
        const res = await fetch(process.env.BaseUrl + "/admin/product/list",{
            method: "post",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            },
            body:JSON.stringify({
                name: ""
            })
        })
        const res_json = await res.json()
        console.log(res_json)
    }

}