import axios from "axios"

export const getDataApi = async (url) => {
  const res = await axios.get(url)

  return res
}