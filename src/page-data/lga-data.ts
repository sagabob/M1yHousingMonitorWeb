import type { Lga } from "./types/Lga"


const baseUrl = 'https://housing.id.com.au'

const lgaData: Lga[] = [
  {
    "id": "10750",
    "name": "Blacktown City Council",
    "alias": "blacktown",
    "image": "/static/f432350247c64be5d301154e805eaa8b/deb99/10750.png"
  },
  {
    "id": "40070",
    "name": "City of Adelaide",
    "alias": "adelaide",
    "image": "/static/665313beab7ae3329158177dfb25c01f/deb99/40070.png"
  },
  {
    "id": "22170",
    "name": "Frankston City",
    "alias": "frankston",
    "image": "/static/09aa3b6fa94ad6888858cfda8a76a3f8/deb99/22170.png"
  },
  {
    "id": "15240",
    "name": "MidCoast Council",
    "alias": "midcoast",
    "image": "/static/5d3f3ec016d587c744eecfa8e23bf451/deb99/15240.png"
  },
]

export { lgaData, baseUrl }