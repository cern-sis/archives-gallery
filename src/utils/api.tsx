import axios from "axios";

export const api = "https://s3.cern.ch/swift/v1/sis-archives-gallery/";

export const getAllKeys: () => Promise<string[]> = async () =>{
  const response =  await axios.get(api)
  const keysString: string = response.data
  const keys = keysString.split("\n")
  return keys.filter((key)=> key.includes(".jpg"))
}
