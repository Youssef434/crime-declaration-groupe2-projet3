export const GOOGLE_API_KEY = 'AIzaSyAuQ_dVfwObaxkoqgHkCcFkySu13q72xWY'

export const getMapPreview = (lat, lng) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return mapPreviewUrl
}

export const getAddress = async (lat, lng) => {
  const AddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response = await fetch(AddressUrl)
  const data = await response.json()
  return data?.results[0]?.formatted_address.split(', ').slice(0, 3).join(', ')
}
