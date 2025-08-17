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
      "id": "10470",
      "name": "Bathurst Regional Council",
      "alias": "bathurst",
      "image": "/static/564eef6a7de91d9cd96d3a808ca306d0/deb99/10470.png"
    },
    {
      "id": "20830",
      "name": "Baw Baw Shire",
      "alias": "bawbaw",
      "image": "/static/33c68c41c0b563fa99e9391685f0d8f5/deb99/20830.png"
    },
    {
      "id": "10550",
      "name": "Bega Valley Shire",
      "alias": "begavalley",
      "image": "/static/0d471135a9f937a93269dce4b6d55aea/deb99/10550.png"
    },
    {
      "id": "10600",
      "name": "Bellingen Shire",
      "alias": "bellingen",
      "image": "/static/25416ab53eaf350d64e16d14b2c7e19b/deb99/10600.png"
    },
    {
      "id": "10750",
      "name": "Blacktown City Council",
      "alias": "blacktown",
      "image": "/static/f432350247c64be5d301154e805eaa8b/deb99/10750.png"
    },
    {
      "id": "11250",
      "name": "Broken Hill City",
      "alias": "brokenhill",
      "image": "/static/f6c6b043f8c0cb989f3864a7587ef0ab/deb99/11250.png"
    },
    {
      "id": "11650",
      "name": "Central Coast Council",
      "alias": "centralcoastnsw",
      "image": "/static/009b403ce4ccfb7f296fb22371f58226/deb99/11650.png"
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
      "id": "51330",
      "name": "City of Canning",
      "alias": "canning",
      "image": "/static/310665c930efe2b06aaad37aa0341950/deb99/51330.png"
    },
    {
      "id": "21610",
      "name": "City of Casey",
      "alias": "casey",
      "image": "/static/8ea0757de9edba8bdbef0da41b2b72cd/deb99/21610.png"
    },
    {
      "id": "11800",
      "name": "City of Coffs Harbour",
      "alias": "coffsharbour",
      "image": "/static/9caa8028b4e15c4d395f935091a61b1a/deb99/11800.png"
    },
    {
      "id": "22750",
      "name": "City of Greater Geelong",
      "alias": "geelong",
      "image": "/static/8a565e0f2606a4cc01a9e661fe0aed68/deb99/22750.png"
    },
    {
      "id": "62810",
      "name": "City of Hobart",
      "alias": "hobart",
      "image": "/static/4c82c5bba1444ff1b66bcd33f7c69a01/12432/62810.png"
    },
    {
      "id": "54170",
      "name": "City of Joondalup",
      "alias": "joondalup",
      "image": "/static/c27ec86a2e0c4c04f03086686be2d9a0/deb99/54170.png"
    },
    {
      "id": "23430",
      "name": "City of Kingston",
      "alias": "kingston",
      "image": "/static/5191fa45cbb44ab6acbb89fb52045258/deb99/23430.png"
    },
    {
      "id": "23670",
      "name": "City of Knox",
      "alias": "knox",
      "image": "/static/2417cac96e1d0addb74765503e6766d3/deb99/23670.png"
    },
    {
      "id": "24330",
      "name": "City of Maribyrnong",
      "alias": "maribyrnong",
      "image": "/static/69cfce295ad408fc60633da844e8b4f8/deb99/24330.png"
    },
    {
      "id": "24600",
      "name": "City of Melbourne",
      "alias": "melbourne",
      "image": "/static/6f6aa3851f2ca73a089493f9214bbf79/deb99/24600.png"
    },
    {
      "id": "25250",
      "name": "City of Merri-bek",
      "alias": "merribek",
      "image": "/static/4725645d217fda2a3ec6abd8ce8bacdd/deb99/25250.png"
    },
    {
      "id": "25060",
      "name": "City of Moonee Valley",
      "alias": "mooneevalley",
      "image": "/static/3951e390e57aaad9a9ff93b6af85c137/deb99/25060.png"
    },
    {
      "id": "15900",
      "name": "City of Newcastle",
      "alias": "newcastle",
      "image": "/static/7097c0d1c63863e774da5a1ae4644bc3/deb99/15900.png"
    },
    {
      "id": "16260",
      "name": "City of Parramatta",
      "alias": "parramatta",
      "image": "/static/42265e3260d66d9332982888a8c0f823/deb99/16260.png"
    },
    {
      "id": "57080",
      "name": "City of Perth",
      "alias": "perth",
      "image": "/static/0d0025d4167d81a0dac234d71a90127f/deb99/57080.png"
    },
    {
      "id": "47140",
      "name": "City of Salisbury",
      "alias": "salisbury",
      "image": "/static/cdc620b10391829f829d665fd85fc5e3/deb99/47140.png"
    },
    {
      "id": "37010",
      "name": "City of Townsville",
      "alias": "townsville",
      "image": "/static/557ee7af221241d64268492a63cff5d3/deb99/37010.png"
    },
    {
      "id": "58570",
      "name": "City of Vincent",
      "alias": "vincent",
      "image": "/static/0bd6b74baba36b9d3a65e9306700709d/deb99/58570.png"
    },
    {
      "id": "27070",
      "name": "City of Whittlesea",
      "alias": "whittlesea",
      "image": "/static/52456eb5a07be70ab66e8578c045fa2f/deb99/27070.png"
    },
    {
      "id": "27170",
      "name": "City of Wodonga",
      "alias": "wodonga",
      "image": "/static/f572ca2347a4d799da52064771a40c1d/deb99/27170.png"
    },
    {
      "id": "27260",
      "name": "City of Wyndham",
      "alias": "wyndham",
      "image": "/static/953519628784a090c62c7ec8ea3916fc/deb99/27260.png"
    },
    {
      "id": "22110",
      "name": "East Gippsland Shire",
      "alias": "eastgippsland",
      "image": "/static/db42e513abd1e1fe3283790fbc8333cf/deb99/22110.png"
    },
    {
      "id": "640",
      "name": "Far North Queensland Regional Organisation of Councils",
      "alias": "fnqroc",
      "image": "/static/3926d28d77c5e8811ccedae43701cdfe/4215a/640.png"
    },
    {
      "id": "22170",
      "name": "Frankston City",
      "alias": "frankston",
      "image": "/static/09aa3b6fa94ad6888858cfda8a76a3f8/deb99/22170.png"
    },
    {
      "id": "21",
      "name": "G21 - Geelong Region Alliance",
      "alias": "g21region",
      "image": "/static/416124f4f34e1714eacde7dd98a20e83/deb99/21.png"
    },
    {
      "id": "12930",
      "name": "Georges River Council",
      "alias": "georgesriver",
      "image": "/static/791882c0bbd51fe73bfaca8ae27fe440/deb99/12930.png"
    },
    {
      "id": "62610",
      "name": "Glenorchy City Council",
      "alias": "glenorchy",
      "image": "/static/078b5ef0d4dce9be26a9c017ef0d33db/deb99/62610.png"
    },
    {
      "id": "33430",
      "name": "Gold Coast City",
      "alias": "goldcoast",
      "image": "/static/302a187b98946589db2415eeff3be242/deb99/33430.png"
    },
    {
      "id": "13550",
      "name": "Gunnedah Shire Council",
      "alias": "gunnedah",
      "image": "/static/8158cca211c6195fb64be585f27fd469/deb99/13550.png"
    },
    {
      "id": "33620",
      "name": "Gympie Regional Council",
      "alias": "gympie",
      "image": "/static/a80139efeb956f83723c70baddcc56cb/deb99/33620.png"
    },
    {
      "id": "23110",
      "name": "Hobsons Bay City",
      "alias": "hobsonsbay",
      "image": "/static/6a030f6533fec370bdcd061b5aceccd6/deb99/23110.png"
    },
    {
      "id": "14000",
      "name": "Hornsby Shire Council",
      "alias": "hornsby",
      "image": "/static/7bf9fa713055501c3befc680263ac7ff/deb99/14000.png"
    },
    {
      "id": "23190",
      "name": "Horsham Rural City",
      "alias": "horsham",
      "image": "/static/45872872e3f444cd782b522e8f409015/deb99/23190.png"
    },
    {
      "id": "14170",
      "name": "Inner West Council",
      "alias": "innerwest",
      "image": "/static/2b228abbadd5f476cee43e53227bdf9b/deb99/14170.png"
    },
    {
      "id": "14350",
      "name": "Kempsey Shire",
      "alias": "kempsey",
      "image": "/static/c49276114fbfa22dfc5ec283462b55ed/deb99/14350.png"
    },
    {
      "id": "24130",
      "name": "Macedon Ranges Shire",
      "alias": "macedonranges",
      "image": "/static/63621f3e3adee6d86f6b0760d6567d49/deb99/24130.png"
    },
    {
      "id": "15240",
      "name": "MidCoast Council",
      "alias": "midcoast",
      "image": "/static/5d3f3ec016d587c744eecfa8e23bf451/deb99/15240.png"
    },
    {
      "id": "24850",
      "name": "Mitchell Shire",
      "alias": "mitchell",
      "image": "/static/ac820739f22362d5856214fac5ab0bce/deb99/24850.png"
    },
    {
      "id": "25340",
      "name": "Mornington Peninsula Shire",
      "alias": "morningtonpeninsula",
      "image": "/static/a5be7cfdefb7ba11abe80272b05d5d56/deb99/25340.png"
    },
    {
      "id": "35740",
      "name": "Noosa Shire",
      "alias": "noosa",
      "image": "/static/94d253321f55503c174d87b8a0b3b020/deb99/35740.png"
    },
    {
      "id": "15950",
      "name": "North Sydney Council",
      "alias": "northsydney",
      "image": "/static/2aebdd61259a8d21e47a5f4f11ab9776/deb99/15950.png"
    },
    {
      "id": "16550",
      "name": "Randwick City Council",
      "alias": "randwick",
      "image": "/static/e317719a26fc8c9cb79b94a202c27539/deb99/16550.png"
    },
    {
      "id": "36370",
      "name": "Rockhampton Regional Council",
      "alias": "rockhampton",
      "image": "/static/c914e5d870ef95f0bf491d3c290a508b/deb99/36370.png"
    },
    {
      "id": "16900",
      "name": "Shellharbour City Council",
      "alias": "shellharbour",
      "image": "/static/80f2094a22921c426d75659eb4228b78/deb99/16900.png"
    },
    {
      "id": "16950",
      "name": "Shoalhaven City Council",
      "alias": "shoalhaven",
      "image": "/static/9bee45c5076715028d105fc44dbde53c/deb99/16950.png"
    },
    {
      "id": "17040",
      "name": "Snowy Monaro Regional Council",
      "alias": "snowymonaro",
      "image": "/static/d6da7c11f5b467f2c7c80efca3aff162/deb99/17040.png"
    },
    {
      "id": "26170",
      "name": "South Gippsland Shire",
      "alias": "southgippsland",
      "image": "/static/d12543fa81e8afe632b3e3bf3d248756/deb99/26170.png"
    },
    {
      "id": "36720",
      "name": "Sunshine Coast Region",
      "alias": "sunshinecoast",
      "image": "/static/5a42ba73b061ae285b019c97ad4efc7b/deb99/36720.png"
    },
    {
      "id": "17310",
      "name": "Tamworth Regional Council",
      "alias": "tamworth",
      "image": "/static/8f6be8d76e4f2628435c675ca0b96dae/deb99/17310.png"
    },
    {
      "id": "17750",
      "name": "Wagga Wagga City Council",
      "alias": "waggawagga",
      "image": "/static/92263016914d60b4a3dbb76d36927ea0/deb99/17750.png"
    },
    {
      "id": "37310",
      "name": "Western Downs Regional Council",
      "alias": "westerndowns",
      "image": "/static/95fd1c1f6379e5a270f0304233a9c994/deb99/37310.png"
    },
    {
      "id": "18350",
      "name": "Wingecarribee Shire",
      "alias": "wingecarribee",
      "image": "/static/40d93a1405bf7316023bca399c4328cd/deb99/18350.png"
    },
    {
      "id": "18450",
      "name": "Wollongong City Council",
      "alias": "wollongong",
      "image": "/static/e8d40cbcecff1d2dce436f985ba7ec56/deb99/18450.png"
    },
    {
      "id": "27450",
      "name": "Yarra Ranges Council",
      "alias": "yarraranges",
      "image": "/static/ee5952809e51bb1669016e35276c2070/deb99/27450.png"
    }
  ]

  export {lgaData, baseUrl}