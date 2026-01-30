import type { Lga } from "./types/Lga"


const baseUrl = 'https://housing.id.com.au'

const lgaData: Lga[] = [
  {
    "id": "20740",
    "name": "Bass Coast Shire",
    "alias": "basscoast",
    "image": "/static/b01468aa921533d1a851abf27c1134dc/deb99/20740.png"
  },  
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
    "id": "20910",
    "name": "City of Bayside",
    "alias": "bayside",
    "image": "/static/c2c08a5abae6c642433828290d8bec6b/deb99/20910.png"
  },
  {
    "id": "21610",
    "name": "City of Casey",
    "alias": "casey",
    "image": "/static/8ea0757de9edba8bdbef0da41b2b72cd/deb99/21610.png"
  },
  {
    "id": "24600",
    "name": "City of Melbourne",
    "alias": "melbourne",
    "image": "/static/6f6aa3851f2ca73a089493f9214bbf79/deb99/24600.png"
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