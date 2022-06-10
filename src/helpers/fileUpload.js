export const fileUpload = async(file)=>{

  // const cloudUrl = 'https://616324354898612:Okra6bggB5XbKKjQeHUC2QjDf_E@api.cloudinary.com/v1_1/dah6qjgsq/resources/image'
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dah6qjgsq/upload'

  const formData = new FormData();
  formData.append('upload_preset','react-journal');
  formData.append('file',file);

  try {
    const resp = await fetch(cloudUrl,{
      method: 'POST',
      body: formData
    })

    if(resp.ok){
      const cloudResp = await resp.json(); 
      return cloudResp.secure_url;
    }else{
      throw await resp.json();
    }
  } catch (error) {
    console.log(error)
  }

  //return url de la imagen
}