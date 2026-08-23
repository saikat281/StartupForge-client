export const imageUpload = async(image)=>{
    const formData = new FormData();
    formData.append("image",image)
    const img_bb_api_key = process.env.NEXT_PUBLIC_IMG_BB_API_KEY;

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${img_bb_api_key}`,{
        method : "POST",
        body: formData,
    })

    const data = await res.json();

    return data.data;
}