import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const themes = [
  { key: "環教場域",   label: "環教場域",       color: "#16a34a", bg: "bg-green-600",   border: "border-green-600",   text: "text-green-600",   iconUrl: "/icons/環教場域icon.png" },
  { key: "綠色餐廳",   label: "綠色餐廳綠時飯桌", color: "#ca8a04", bg: "bg-yellow-600",  border: "border-yellow-600",  text: "text-yellow-600",  iconUrl: "/icons/綠色餐廳icon.png" },
  { key: "環保旅館",   label: "環保旅館",       color: "#2563eb", bg: "bg-blue-600",    border: "border-blue-600",    text: "text-blue-600",    iconUrl: "/icons/環保旅館icon.png" },
  { key: "環保小學堂", label: "環保小學堂",     color: "#9333ea", bg: "bg-purple-600",  border: "border-purple-600",  text: "text-purple-600",  iconUrl: "/icons/環保小學堂icon.png" },
  { key: "台美生態認證", label: "台美生態認證", color: "#dc2626", bg: "bg-red-600",     border: "border-red-600",     text: "text-red-600",     iconUrl: "/icons/台美生態認證icon.png" },
  { key: "受補助學校",   label: "受補助學校",   color: "#ea580c", bg: "bg-orange-600",  border: "border-orange-600",  text: "text-orange-600",  iconUrl: "/icons/受補助學校icon.png" },
  { key: "社區培力",     label: "社區培力",     color: "#92400e", bg: "bg-amber-800",   border: "border-amber-800",   text: "text-amber-800",   iconUrl: "/icons/社區培力icon.png" },
] as const;

type ThemeKey = typeof themes[number]["key"];

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="${color}"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
}

function makeImageIcon(url: string) {
  return L.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

const allVenues = [
  // 環教場域
  { theme: "環教場域" as ThemeKey, district: "新埔鎮", name: "九芎湖環境教育園區",             address: "新竹縣新埔鎮照門里九芎湖埤塘窩",      phone: "03-5899606",           email: "sp9@sp9.org.tw",              lat: 24.850804698354548, lng: 121.10924069291615 },
  { theme: "環教場域" as ThemeKey, district: "新豐鄉", name: "小叮噹愛地球行動學堂",           address: "新竹縣新豐鄉康和路199號",             phone: "03-5592132 #2173",     email: "buddy@ding-dong.com.tw",      lat: 24.86938875406008,  lng: 120.98037076093105 },
  { theme: "環教場域" as ThemeKey, district: "竹北市", name: "竹北市水資源回收中心",           address: "新竹縣竹北市水防道路五段151號",       phone: "03-5566308#220",       email: "chupeiwrc2009@gmail.com",     lat: 24.853433449581143, lng: 120.95605965298029 },
  { theme: "環教場域" as ThemeKey, district: "竹東鎮", name: "竹東水資源回收中心",             address: "新竹縣竹東鎮水資路299號",             phone: "03-5827959",           email: "a0939267435@gmail.com",       lat: 24.74690741866552,  lng: 121.08467919644765 },
  { theme: "環教場域" as ThemeKey, district: "北埔鄉", name: "南埔黃金水鄉生態農村",           address: "新竹縣北埔鄉南埔村2鄰17號",          phone: "03-5805590",           email: "nanpuvillage@gmail.com",      lat: 24.696078549232258, lng: 121.04252382642875 },
  { theme: "環教場域" as ThemeKey, district: "竹東鎮", name: "新竹縣竹東頭前溪水質生態治理區", address: "新竹縣竹東鎮沿河街河堤竹林大橋下",   phone: "03-5519345 #5107",     email: "30011687@hchg.gov.tw",        lat: 24.736281207379765, lng: 121.10056853432795 },
  { theme: "環教場域" as ThemeKey, district: "北埔鄉", name: "寶山第二水庫",                   address: "新竹縣北埔鄉埔尾村埔尾34之8號",      phone: "03-5805729 #108、#111", email: "wrabao2.ee@gmail.com",        lat: 24.708368570575175, lng: 121.04534792469926 },
  // 綠色餐廳
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "一張白紙",                                   address: "新竹縣竹北市自強南路151巷7號",                      phone: "0980780315",           email: "", lat: 24.8150078,  lng: 121.024737  },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "八方雲集(台積電12P7商場)",                   address: "新竹縣寶山鄉園區二路188號",                         phone: "03-5636688#727171",    email: "", lat: 24.7703177,  lng: 121.0122961 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "上鼎鐵板燒",                                address: "新竹縣湖口鄉文化路81號",                            phone: "03-5973245",           email: "", lat: 24.8710071,  lng: 121.0156976 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "大中華(台積電12P7商場)",                    address: "新竹縣寶山鄉園區二路188號",                         phone: "03-5636688#727171",    email: "", lat: 24.7703177,  lng: 121.0122961 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "大戶屋竹北遠百店",                          address: "新竹縣竹北市莊敬北路18號B2",                        phone: "03-6586332",           email: "", lat: 24.8232661,  lng: 121.0238389 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "大湖口石頭火鍋城",                          address: "新竹縣湖口鄉中山路一段508號",                       phone: "03-5905809",           email: "", lat: 24.8929457,  lng: 121.0415799 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "川井鐵板燒",                               address: "新竹縣竹北市興隆路三段115號",                       phone: "03-6676588",           email: "", lat: 24.8071501,  lng: 121.0245629 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "川炁 飯麵館",                              address: "新竹縣竹北市莊敬六街109號",                         phone: "03-6585544",           email: "", lat: 24.8243652,  lng: 121.0287512 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "工業技術研究院-中興院區",                   address: "新竹縣竹東鎮中興路四段195號52、53館B1餐廳",          phone: "03-5913010",           email: "", lat: 24.775049,   lng: 121.0444219 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "不二農產直販所",                           address: "新竹縣竹北市文興路二段382號",                       phone: "0917170201",           email: "", lat: 24.8044344,  lng: 121.0432813 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "中華汽車新竹廠員工餐廳",                    address: "新竹縣湖口鄉新竹工業區光復路2號",                   phone: "03-5985841#2358",      email: "", lat: 24.8729481,  lng: 121.0380072 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "元氣燉品屋",                               address: "新竹縣竹北市縣政二路南段121號",                     phone: "03-5589632",           email: "", lat: 24.8181917,  lng: 121.0117427 },
  { theme: "綠色餐廳" as ThemeKey, district: "橫山鄉", name: "內灣老街芋圓豆花創始店",                    address: "新竹縣橫山鄉內灣村中正路333號",                     phone: "0932109915",           email: "", lat: 24.706808,   lng: 121.1805641 },
  { theme: "綠色餐廳" as ThemeKey, district: "橫山鄉", name: "內灣彭老師野薑花粽",                        address: "新竹縣橫山鄉內灣村中正路283號",                     phone: "03-5849060",           email: "", lat: 24.7058938,  lng: 121.1810303 },
  { theme: "綠色餐廳" as ThemeKey, district: "橫山鄉", name: "內灣溫媽媽傳統客家菜包",                    address: "新竹縣橫山鄉中正路22號",                            phone: "03-5849623",           email: "", lat: 24.705442,   lng: 121.1820373 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "日嚐美",                                   address: "新竹縣竹北市嘉豐二街一段118號",                     phone: "0933337526",           email: "", lat: 24.8153995,  lng: 121.0285318 },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "水蓮花生態餐廳",                           address: "新竹縣新豐鄉康和路199號",                           phone: "03-5592132#2506",      email: "", lat: 24.8692379,  lng: 120.9800489 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "火山岩燒肉",                               address: "新竹縣竹北市自強北路230號",                         phone: "03-6688951",           email: "", lat: 24.8240501,  lng: 121.0320596 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "世界先進FAB1 員工餐廳",                    address: "新竹縣寶山鄉園區三路123號",                         phone: "03-5770355#1333",      email: "", lat: 24.775455,   lng: 120.9963714 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "丼‧好食",                                 address: "新竹縣竹北市嘉豐五路二段25號1樓",                  phone: "03-5506552",           email: "", lat: 24.8101245,  lng: 121.0269735 },
  { theme: "綠色餐廳" as ThemeKey, district: "尖石鄉", name: "以娜的店",                                 address: "新竹縣尖石鄉玉峰村1鄰宇老3-2號",                   phone: "03-5847222",           email: "", lat: 24.6678064,  lng: 121.2823864 },
  { theme: "綠色餐廳" as ThemeKey, district: "北埔鄉", name: "北埔第一棧",                               address: "新竹縣北埔鄉水際村3鄰31之1號",                     phone: "03-5803131",           email: "", lat: 24.6998411,  lng: 121.0563176 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "卡菲努努景觀餐廳",                         address: "新竹縣竹東鎮明星一路138號",                         phone: "03-5827709",           email: "", lat: 24.7752076,  lng: 121.0548773 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "台積電12P7商場摩斯漢堡",                   address: "新竹縣寶山鄉園區二路188號",                         phone: "03-5636688#727171",    email: "", lat: 24.7703177,  lng: 121.0122961 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "台灣山葉機車員工餐廳",                     address: "新竹縣湖口鄉東興村山葉路81號",                     phone: "03-5991111#3902",      email: "", lat: 24.9200529,  lng: 121.053694  },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "石林家 鮮果食坊",                          address: "新竹縣湖口鄉中山路一段581號",                       phone: "0917709655",           email: "", lat: 24.8953268,  lng: 121.0416597 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "光鮮綠蔬地中海廚房",                       address: "新竹縣竹北市文興路二段3號",                         phone: "03-5508101",           email: "", lat: 24.8085019,  lng: 121.0330262 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "吉品初筵港式茶居",                         address: "新竹縣竹北市莊敬北路18號6樓611櫃",                 phone: "03-6676455",           email: "", lat: 24.8232661,  lng: 121.0238389 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "好初鍋物",                                 address: "新竹縣竹北市環北路一段232號",                       phone: "03-5552878",           email: "", lat: 24.8397263,  lng: 121.0211916 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "老乾杯 新竹喜來登店",                      address: "新竹縣竹北市光明六路東一段265號2樓",               phone: "03-6579222",           email: "", lat: 24.8204254,  lng: 121.0281441 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "尚羽水產",                                 address: "新竹縣竹北市東興路一段412號",                       phone: "0925000289",           email: "", lat: 24.8144961,  lng: 121.0359554 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "岩漿火鍋竹北復興店",                       address: "新竹縣竹北市復興一街236號",                         phone: "03-6579651",           email: "", lat: 24.8127001,  lng: 121.0334949 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "岩漿火鍋竹東明星店",                       address: "新竹縣竹東鎮明星一路110號",                         phone: "03-5821318",           email: "", lat: 24.7746618,  lng: 121.0545373 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "果然匯-竹北遠百店",                        address: "新竹縣竹北市莊敬北路18號8樓",                      phone: "03-5508883",           email: "", lat: 24.8223688,  lng: 121.02362   },
  { theme: "綠色餐廳" as ThemeKey, district: "峨眉鄉", name: "沽月日光",                                 address: "新竹縣峨眉鄉湖光村十二寮12鄰6之5號",               phone: "03-7601630",           email: "", lat: 24.6719449,  lng: 120.9842312 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "芸崴自助餐(台積電12P7商場)",               address: "新竹縣寶山鄉園區二路188號",                         phone: "03-5636688#727171",    email: "", lat: 24.7703177,  lng: 121.0122961 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "南茂科技竹北一廠員工餐廳",                 address: "新竹縣竹北市新泰路37號",                            phone: "03-6562078",           email: "", lat: 24.8406004,  lng: 121.0084136 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "南茂科技竹北二廠員工餐廳",                 address: "新竹縣竹北市中和街112號",                           phone: "03-5770055#6064",      email: "", lat: 24.8483208,  lng: 121.0107923 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "南茂科技竹科一廠員工餐廳",                 address: "新竹縣寶山鄉研發一路一號",                          phone: "03-5770055",           email: "", lat: 24.7752641,  lng: 121.0021044 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "南茂科技湖口廠員工餐廳",                   address: "新竹縣湖口鄉仁德路4號",                             phone: "03-5770055#6064",      email: "", lat: 24.8697614,  lng: 121.0118187 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "品串小吃",                                 address: "新竹縣竹北市博愛街210之6號",                        phone: "03-5589632",           email: "", lat: 24.8334528,  lng: 121.0068064 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "虹光精密員工餐廳",                         address: "新竹縣寶山鄉研新一路20號",                          phone: "03-5782388#8157",      email: "", lat: 24.776435,   lng: 120.99528   },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "食在燒竹北縣政店",                         address: "新竹縣竹北市縣政二路394巷1號",                      phone: "0966302783",           email: "", lat: 24.8276865,  lng: 121.01679   },
  { theme: "綠色餐廳" as ThemeKey, district: "尖石鄉", name: "凌雲閣",                                   address: "新竹縣尖石鄉玉峰村宇老7號",                         phone: "03-5847257",           email: "", lat: 24.658818,   lng: 121.279585  },
  { theme: "綠色餐廳" as ThemeKey, district: "橫山鄉", name: "高林餐廳",                                 address: "新竹縣橫山鄉內灣村中正路32號1樓",                  phone: "0988288786",           email: "", lat: 24.7056216,  lng: 121.1818177 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "乾杯燒肉居酒屋 竹北遠百店",                address: "新竹縣竹北市莊敬北路18號7樓",                      phone: "03-5501217",           email: "", lat: 24.8232661,  lng: 121.0238389 },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "健康轉角",                                 address: "新竹縣新豐鄉民安街21號",                            phone: "0912315132",           email: "", lat: 24.8654764,  lng: 120.991565  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "曼陀羅滴水坊",                             address: "新竹縣竹北市十興路一段255號",                       phone: "03-6580619",           email: "", lat: 24.8295545,  lng: 121.0280723 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "盒食日式料理",                             address: "新竹縣竹北市博愛街168之2號",                        phone: "03-5559537",           email: "", lat: 24.8322391,  lng: 121.0056741 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "盛宴自助餐廳(新竹喜來登大飯店)",            address: "新竹縣竹北市光明六路東一段265號2樓",               phone: "03-6206092",           email: "", lat: 24.8204254,  lng: 121.0281441 },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "陳家休閒農場",                             address: "新竹縣新埔鎮照門里九芎湖24號旁",                    phone: "03-5890035",           email: "", lat: 24.8620461,  lng: 121.1055852 },
  { theme: "綠色餐廳" as ThemeKey, district: "峨眉鄉", name: "雪之湖咖啡",                               address: "新竹縣峨眉鄉太平街8巷1-1號",                       phone: "03-5806852",           email: "", lat: 24.6841866,  lng: 120.9885582 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "麥味登(台積電12P7商場)",                   address: "新竹縣寶山鄉園區二路188號",                         phone: "03-5636688#727171",    email: "", lat: 24.7703177,  lng: 121.0122961 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "麥味登台積P4",                            address: "新竹縣寶山鄉園區二路168號",                         phone: "0978305178",           email: "", lat: 24.7702224,  lng: 121.0133076 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北十興",                           address: "新竹縣竹北市十興路308號",                           phone: "03-6688158",           email: "", lat: 24.8331487,  lng: 121.0240864 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北中醫",                           address: "新竹縣竹北市興隆路一段199號(B1一號櫃位)",          phone: "0965132558",           email: "", lat: 24.8252271,  lng: 121.0026877 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北六家",                           address: "新竹縣竹北市六家一路一段111號",                     phone: "03-6581230",           email: "", lat: 24.8100915,  lng: 121.0278439 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北正毅",                           address: "新竹縣竹北市膉口六街43號",                          phone: "03-6670606",           email: "", lat: 24.8102379,  lng: 121.022887  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北民權",                           address: "新竹縣竹北市民權街31-1號",                          phone: "03-5555050",           email: "", lat: 24.8327579,  lng: 121.0123428 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北成功",                           address: "新竹縣竹北市成功八路266號1樓",                      phone: "03-6579386",           email: "", lat: 24.8162959,  lng: 121.0214728 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北幸福",                           address: "新竹縣竹北市福興東路二段161號",                     phone: "03-5501161",           email: "", lat: 24.8141578,  lng: 121.0292955 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北東元",                           address: "新竹縣竹北市政三街55號",                            phone: "03-6573558",           email: "", lat: 24.8346871,  lng: 120.9933678 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北莊敬",                           address: "新竹縣竹北市莊敬五街112號",                         phone: "03-5500901",           email: "", lat: 24.8242732,  lng: 121.0272677 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北勝利",                           address: "新竹縣竹北市莊敬北路256號1樓",                      phone: "03-5873658",           email: "", lat: 24.8287671,  lng: 121.0259806 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北縣府",                           address: "新竹縣竹北市福興路596號",                           phone: "03-5558648",           email: "", lat: 24.8224768,  lng: 121.0111561 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "麥味登竹北縣政",                           address: "新竹縣竹北市縣政二路231號",                         phone: "03-5587236",           email: "", lat: 24.8328525,  lng: 121.018547  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "麥味登竹東中興",                           address: "新竹縣竹東鎮中興路二段430號",                       phone: "03-5827168",           email: "", lat: 24.7652318,  lng: 121.0584615 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "麥味登竹東幸福",                           address: "新竹縣竹東鎮東寧路一段139號",                       phone: "03-5960785",           email: "", lat: 24.7252673,  lng: 121.0943934 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "麥味登竹東長春",                           address: "新竹縣竹東鎮長春路三段250號",                       phone: "03-5951520",           email: "", lat: 24.7451277,  lng: 121.0824641 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹東鎮", name: "麥味登竹東信義",                           address: "新竹縣竹東鎮信義路121號",                           phone: "03-5961277",           email: "", lat: 24.7365152,  lng: 121.0896491 },
  { theme: "綠色餐廳" as ThemeKey, district: "芎林鄉", name: "麥味登芎林文山",                           address: "新竹縣芎林鄉文山路303號",                           phone: "03-5120480",           email: "", lat: 24.774242,   lng: 121.0817784 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "麥味登湖口中山",                           address: "新竹縣湖口鄉中正六街56號",                          phone: "0975027948",           email: "", lat: 24.8974053,  lng: 121.0444751 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "麥味登湖口中正",                           address: "新竹縣湖口鄉中山二街67號",                          phone: "03-5990711",           email: "", lat: 24.8956042,  lng: 121.0405796 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "麥味登湖口思牛的店",                       address: "新竹縣湖口鄉中山路二段422號",                       phone: "03-5998179",           email: "", lat: 24.9074114,  lng: 121.0484456 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "麥味登湖口新興",                           address: "新竹縣湖口鄉新興路308號",                           phone: "03-5575572",           email: "", lat: 24.8720794,  lng: 120.9994394 },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "麥味登新竹新埔",                           address: "新竹縣新埔鎮仁愛路30號",                            phone: "03-5883708",           email: "", lat: 24.8269758,  lng: 121.0810005 },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "麥味登新埔中正",                           address: "新竹縣新埔鎮中正路110號",                           phone: "03-5891296",           email: "", lat: 24.8266167,  lng: 121.0848633 },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "麥味登新豐明新",                           address: "新竹縣新豐鄉明新一街111號",                         phone: "03-5575188",           email: "", lat: 24.8649254,  lng: 120.988985  },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "麥味登新豐振興",                           address: "新竹縣新豐鄉振興街22號",                            phone: "03-5591570",           email: "", lat: 24.9035076,  lng: 120.9867186 },
  { theme: "綠色餐廳" as ThemeKey, district: "關西鎮", name: "麥味登關西正義",                           address: "新竹縣關西鎮正義路175號",                           phone: "03-5170028",           email: "", lat: 24.7964004,  lng: 121.1730763 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "善菓堂",                                   address: "新竹縣竹北市莊敬南路188號1樓",                      phone: "03-6675955",           email: "", lat: 24.8154935,  lng: 121.0193358 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "堺坊有機農場直送shabushabu",               address: "新竹縣竹北市光明二街79號",                          phone: "03-5536182",           email: "", lat: 24.8317421,  lng: 121.0075197 },
  { theme: "綠色餐廳" as ThemeKey, district: "峨眉鄉", name: "富興青•據點",                             address: "新竹縣峨眉鄉富興村太平街1號",                       phone: "0972925534",           email: "", lat: 24.687165,   lng: 120.9880175 },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "景碩科技新豐廠員工餐廳",                   address: "新竹縣新豐鄉建興路二段526號",                       phone: "03-5571799#26840",     email: "", lat: 24.8928386,  lng: 120.9877991 },
  { theme: "綠色餐廳" as ThemeKey, district: "關西鎮", name: "萊馥玫瑰廳",                               address: "新竹縣關西鎮玉山里2鄰12號",                         phone: "03-5476188#200",       email: "", lat: 24.8517944,  lng: 121.139542  },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "街尾妹妹季",                               address: "新竹縣新埔鎮中正路615號",                           phone: "03-5889668",           email: "", lat: 24.8276373,  lng: 121.0714394 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "開心田緣農場",                             address: "新竹縣寶山鄉新城村新湖路五段220巷9號",              phone: "0926171705",           email: "", lat: 24.7268191,  lng: 120.9729892 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "黑毛屋 竹北遠百店",                        address: "新竹縣竹北市莊敬北路18號6F",                        phone: "03-5505779",           email: "", lat: 24.8232661,  lng: 121.0238389 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "黑沃咖啡-竹北縣政店",                      address: "新竹縣竹北市縣政二路47號",                          phone: "04-22624040",          email: "", lat: 24.8232985,  lng: 121.014018  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "黑沃咖啡-新竹竹北店",                      address: "新竹縣竹北市文喜街27號",                            phone: "04-22624040",          email: "", lat: 24.8320916,  lng: 121.0107075 },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "黑沃咖啡-新竹遠東店",                      address: "新竹縣新埔鎮文山路亞東段369號",                     phone: "04-22624040",          email: "", lat: 24.8252445,  lng: 121.0573227 },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "愛吃乳酪蛋糕的魚",                         address: "新竹縣新埔鎮新關路五埔段236號",                     phone: "0935514891",           email: "", lat: 24.8166693,  lng: 121.1085803 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "新竹默克餐廳",                             address: "新竹縣湖口鄉新興路458-6號",                         phone: "03-5970885#5321",      email: "", lat: 24.8749256,  lng: 121.0091696 },
  { theme: "綠色餐廳" as ThemeKey, district: "峨眉鄉", name: "歇心茶樓",                                 address: "新竹縣峨眉鄉七星村六寮60-8號一樓",                 phone: "035-809689",           email: "", lat: 24.6548782,  lng: 121.0244631 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "蜀味古巷串香火鍋",                         address: "新竹縣竹北市莊敬二街20號",                          phone: "03-6682076",           email: "", lat: 24.8225705,  lng: 121.0244699 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "隔壁宵夜(竹北店)",                         address: "新竹縣竹北市光明三路71號",                          phone: "03-6573429",           email: "", lat: 24.8300315,  lng: 121.0086514 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "實物生活 x 攪攪雜食舖 Real Things x la-la-e", address: "新竹縣竹北市勝利五路197號",                   phone: "03-5313923",           email: "", lat: 24.8233154,  lng: 121.0291192 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "碳吉鍋物",                                 address: "新竹縣竹北市文喜街15號",                            phone: "03-6570797",           email: "", lat: 24.8312367,  lng: 121.0101798 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "綠禾塘",                                   address: "新竹縣竹北市文興路一段123-11號",                    phone: "03-6683510",           email: "", lat: 24.8119444,  lng: 121.0267277 },
  { theme: "綠色餐廳" as ThemeKey, district: "峨眉鄉", name: "鳳姊莊園民宿",                             address: "新竹縣峨眉鄉富興村18鄰12之6號",                     phone: "0932302113",           email: "", lat: 24.6967413,  lng: 120.9790281 },
  { theme: "綠色餐廳" as ThemeKey, district: "新埔鎮", name: "劉家莊燜雞",                               address: "新竹縣新埔鎮照門里九芎湖6鄰16-2號",                phone: "03-5890709",           email: "", lat: 24.8497229,  lng: 121.1072885 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "樂心料理",                                 address: "新竹縣竹北市縣政三街130號1樓",                      phone: "03-5583344",           email: "", lat: 24.8243117,  lng: 121.0139748 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "樂好找餐(台積電12P7商場)",                 address: "新竹縣寶山鄉園區二路188號",                         phone: "03-5636688#727171",    email: "", lat: 24.7703177,  lng: 121.0122961 },
  { theme: "綠色餐廳" as ThemeKey, district: "關西鎮", name: "磐龍石木坊",                               address: "新竹縣關西鎮7鄰3號",                                phone: "03-5872829",           email: "", lat: 24.8044851,  lng: 121.1481284 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "緯創資通竹北AI廠B1F員工餐廳",               address: "新竹縣竹北市智慧路1號",                             phone: "03-5770707",           email: "", lat: 24.8280916,  lng: 121.0231462 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "緯創資通湖口N2廠員工餐廳",                 address: "新竹縣湖口鄉工業三路2號",                           phone: "03-6125598",           email: "", lat: 24.8667946,  lng: 121.0160485 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "緯創資通N1廠K2F員工餐廳",                 address: "新竹縣湖口鄉光復北路50號",                          phone: "03-6125598",           email: "", lat: 24.8716379,  lng: 121.0206847 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "橙家新日本料理",                           address: "新竹縣竹北市文信路208號",                           phone: "03-5589900",           email: "", lat: 24.8317903,  lng: 121.0160163 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "燒肉Smile 竹北享平方店",                   address: "新竹縣竹北市自強南路36號1樓",                       phone: "03-6583913",           email: "", lat: 24.8188908,  lng: 121.0271594 },
  { theme: "綠色餐廳" as ThemeKey, district: "橫山鄉", name: "磚瓦食堂",                                 address: "新竹縣橫山鄉內灣村中正路113號",                     phone: "03-5849227",           email: "", lat: 24.7054749,  lng: 121.1818174 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "築間幸福鍋物 竹北中山店",                  address: "新竹縣竹北市中山路178號",                           phone: "03-5517555",           email: "", lat: 24.8357333,  lng: 121.02089   },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "築間幸福鍋物 竹北享平方店",                address: "新竹縣竹北市自強南路36號2樓",                       phone: "03-6580228",           email: "", lat: 24.8188908,  lng: 121.0271594 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "築間幸福鍋物 竹北隘口店",                  address: "新竹縣竹北市隘口二路139號",                         phone: "03-6580113",           email: "", lat: 24.8051923,  lng: 121.0371902 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "翰林茶館-竹北遠百店",                      address: "新竹縣竹北市莊敬北路18號B2樓",                      phone: "03-6580679",           email: "", lat: 24.8232661,  lng: 121.0238389 },
  { theme: "綠色餐廳" as ThemeKey, district: "寶山鄉", name: "聯電 8S 餐廳",                            address: "新竹縣寶山鄉研新一路16號",                          phone: "03-5782258#59434",     email: "", lat: 24.7749013,  lng: 120.9936335 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "鴻蝦匯庭園餐廳",                           address: "新竹縣竹北市光明六路東二段77號",                    phone: "03-6688987",           email: "", lat: 24.8177023,  lng: 121.0309027 },
  { theme: "綠色餐廳" as ThemeKey, district: "尖石鄉", name: "薰衣草森林尖石店",                         address: "新竹縣尖石鄉嘉樂村嘉樂129號1F",                    phone: "03-5842013",           email: "", lat: 24.729611,   lng: 121.227015  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "藏壽司 竹北文興店",                        address: "新竹縣竹北市文興路一段301號2樓",                    phone: "03-6589793",           email: "", lat: 24.8087388,  lng: 121.0324461 },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "邊界驛站新豐店",                           address: "新竹縣新豐鄉鳳坑村坑子口569-7號",                  phone: "03-5575577",           email: "", lat: 24.9031758,  lng: 120.9733463 },
  { theme: "綠色餐廳" as ThemeKey, district: "關西鎮", name: "關西六福莊 生態度假旅館",                  address: "新竹縣關西鎮仁安里拱子溝60號",                     phone: "03-5475365#3453",      email: "", lat: 24.824623,   lng: 121.1834459 },
  { theme: "綠色餐廳" as ThemeKey, district: "關西鎮", name: "關西仙草博物館",                           address: "新竹縣關西鎮中豐路二段326號",                       phone: "03-5870058",           email: "", lat: 24.801449,   lng: 121.186043  },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "鐵三角吐司專賣(新豐店)",                   address: "新竹縣新豐鄉民安街32號1樓",                         phone: "0958907975",           email: "", lat: 24.8657513,  lng: 120.9915677 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "Herefor",                                  address: "新竹縣竹北市科大二街103號",                         phone: "03-651018",            email: "", lat: 24.8206197,  lng: 121.009335  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "Piccola Enoteca",                          address: "新竹縣竹北市成功二街102號",                         phone: "03-6688313",           email: "", lat: 24.8194758,  lng: 121.0245357 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "Q Burger竹北三民店",                       address: "新竹縣竹北市三民路318號",                           phone: "03-5531233",           email: "", lat: 24.834559,   lng: 121.009544  },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "Q Burger竹北台元店",                       address: "新竹縣竹北市博愛街611號",                           phone: "03-5555605",           email: "", lat: 24.8416033,  lng: 121.0122622 },
  // 環保旅館
  { theme: "環保旅館" as ThemeKey, district: "新豐鄉", name: "小叮噹科學遊樂區生活大師會館", address: "新竹縣新豐鄉松柏村康和路199號",          phone: "03-5592132",     email: "", lat: 24.869364419218236, lng: 120.98008108295646 },
  { theme: "環保旅館" as ThemeKey, district: "竹北市", name: "享豪大飯店",                   address: "新竹縣竹北市信義街7號",                   phone: "03-6565501",     email: "", lat: 24.836355881974377, lng: 121.00957498110788 },
  { theme: "環保旅館" as ThemeKey, district: "關西鎮", name: "統一渡假村",                   address: "新竹縣關西鎮金山里34號",                  phone: "03-5478888",     email: "", lat: 24.767329801302214, lng: 121.21778766946903 },
  { theme: "環保旅館" as ThemeKey, district: "竹北市", name: "新竹安捷國際酒店",             address: "新竹縣竹北市復興三路二段168號14樓-18樓", phone: "03-6209777#660", email: "", lat: 24.807838731310596, lng: 121.03827800994250 },
  { theme: "環保旅館" as ThemeKey, district: "竹北市", name: "新竹喜來登大飯店",             address: "新竹縣竹北市光明六路東一段265號",         phone: "03-6206126",     email: "", lat: 24.820247058570057, lng: 121.02820219644894 },
  // 環保小學堂
  { theme: "環保小學堂" as ThemeKey, district: "竹東鎮", name: "竹東鎮軟橋社區發展協會",       address: "新竹縣竹東鎮軟橋里1鄰55之2號",                    phone: "03-5102947",        email: "",                                  lat: 24.695838650570547, lng: 121.09783548210893 },
  { theme: "環保小學堂" as ThemeKey, district: "湖口鄉", name: "湖口鄉信勢社區發展協會",       address: "新竹縣湖口鄉信勢村成功路454巷68號",               phone: "",                  email: "",                                  lat: 24.89933903601417,  lng: 121.03443815412179 },
  // 台美生態認證
  { theme: "台美生態認證" as ThemeKey, district: "竹東鎮", name: "二重國小", address: "新竹縣竹東鎮光明路32號",            phone: "03-5822098", email: "", lat: 24.768190515618326, lng: 121.05825714232918 },
  { theme: "台美生態認證" as ThemeKey, district: "竹東鎮", name: "大同國小", address: "新竹縣竹東鎮莊敬路111號",           phone: "03-5961160", email: "", lat: 24.740450833138247, lng: 121.08843828650623 },
  { theme: "台美生態認證" as ThemeKey, district: "北埔鄉", name: "大坪國小", address: "新竹縣北埔鄉外坪村1鄰外大坪8號",   phone: "03-5802264", email: "", lat: 24.675167710718473, lng: 121.0592820576708  },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "中正國小", address: "新竹縣竹北市中山路190號",           phone: "03-5552464", email: "", lat: 24.83670182558186,  lng: 121.01943107116458 },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "中正國小", address: "新竹縣竹北市中山路190號",           phone: "03-5552464", email: "", lat: 24.83666287962658,  lng: 121.01944180000444 },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "六家國小", address: "新竹縣竹北市嘉興路62號",            phone: "03-5502624", email: "", lat: 24.813612482484896, lng: 121.02579245767082 },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "東興國中", address: "新竹縣竹北市嘉豐十一路二段100號",  phone: "03-5502120", email: "", lat: 24.804905428528667, lng: 121.03243409991434 },
  { theme: "台美生態認證" as ThemeKey, district: "橫山鄉", name: "華山國中", address: "新竹縣橫山鄉橫山街一段29號",       phone: "03-5934084", email: "", lat: 24.717938606315123, lng: 121.10917742883541 },
  { theme: "台美生態認證" as ThemeKey, district: "新豐鄉", name: "新豐國中", address: "新竹縣新豐鄉成德街36號",            phone: "03-5596573", email: "", lat: 24.902983097717238, lng: 120.99121755767081 },
  { theme: "台美生態認證" as ThemeKey, district: "新豐鄉", name: "福龍國小", address: "新竹縣新豐鄉福興村113號",           phone: "03-5993140", email: "", lat: 24.930542176192937, lng: 121.03582031349379 },
  { theme: "台美生態認證" as ThemeKey, district: "新豐鄉", name: "福龍國小", address: "新竹縣新豐鄉福興村113號",           phone: "03-5993140", email: "", lat: 24.930347979924978, lng: 121.03583444837984 },
  // 受補助學校
  { theme: "受補助學校" as ThemeKey, district: "竹東鎮", name: "大同國小",        address: "新竹縣竹東鎮莊敬路111號",      phone: "", email: "", lat: 24.7402998, lng: 121.088406 },
  { theme: "受補助學校" as ThemeKey, district: "竹北市", name: "竹北社區發展協會", address: "新竹縣竹北市中山路236號",      phone: "", email: "", lat: 24.8371476, lng: 121.01771  },
  { theme: "受補助學校" as ThemeKey, district: "竹北市", name: "竹北國小",        address: "新竹縣竹北市中央路98號",       phone: "", email: "", lat: 24.8382957, lng: 121.002329 },
  { theme: "受補助學校" as ThemeKey, district: "竹東鎮", name: "竹東高中",        address: "新竹縣竹東鎮大林路2號",        phone: "", email: "", lat: 24.7322005, lng: 121.087609 },
  { theme: "受補助學校" as ThemeKey, district: "芎林鄉", name: "芎林國小",        address: "新竹縣芎林鄉文山路288號",      phone: "", email: "", lat: 24.7739175, lng: 121.08349  },
  { theme: "受補助學校" as ThemeKey, district: "新豐鄉", name: "埔和國小",        address: "新竹縣新豐鄉466號",            phone: "", email: "", lat: 24.9132859, lng: 120.999103 },
  { theme: "受補助學校" as ThemeKey, district: "湖口鄉", name: "華興國小",        address: "新竹縣湖口鄉文化路171號",      phone: "", email: "", lat: 24.8745991, lng: 121.020429 },
  // 社區培力
  { theme: "社區培力" as ThemeKey, district: "竹北市", name: "竹北市新國社區發展協會",     address: "新竹縣竹北市新光街63巷3號",             phone: "", email: "", lat: 24.8399168, lng: 120.997761 },
  { theme: "社區培力" as ThemeKey, district: "峨眉鄉", name: "峨眉鄉湖光社區發展協會",     address: "新竹縣峨眉鄉湖光村赤柯坪5鄰16-1號",    phone: "", email: "", lat: 24.693551,  lng: 121.001427 },
  { theme: "社區培力" as ThemeKey, district: "新埔鎮", name: "新埔鄉巨埔社區發展協會",     address: "新竹縣新埔鎮巨埔里12鄰新龍路752巷20號", phone: "", email: "", lat: 24.8409163, lng: 121.126432 },
  { theme: "社區培力" as ThemeKey, district: "橫山鄉", name: "橫山鄉沙坑社區發展協會",     address: "新竹縣橫山鄉沙坑村沙坑街50號",          phone: "", email: "", lat: 24.7391373, lng: 121.16131  },
  { theme: "社區培力" as ThemeKey, district: "關西鎮", name: "關西鎮玉山社區發展協會",     address: "新竹縣關西鎮玉山里1鄰赤柯山10號",       phone: "", email: "", lat: 24.756689,  lng: 121.201485 },
  { theme: "社區培力" as ThemeKey, district: "關西鎮", name: "關西鎮東光社區發展協會",     address: "新竹縣關西鎮東光里10鄰19號",            phone: "", email: "", lat: 24.7693284, lng: 121.196808 },
];

export default function VenueMap() {
  const [active, setActive] = useState<Set<ThemeKey>>(new Set(themes.map((t) => t.key)));
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (key: ThemeKey) => {
    setSelected(null);
    setActive((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filtered = allVenues.filter((v) => active.has(v.theme));
  const visible = selected !== null ? [filtered[selected]] : filtered;

  return (
    <section id="venues">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">環教相關場域機構</h2>
        <p className="text-muted-foreground mt-1">探索新竹縣優質環境教育場所</p>
      </div>

      {/* 主題篩選按鈕 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {themes.map((t) => {
          const isOn = active.has(t.key);
          return (
            <button
              key={t.key}
              onClick={() => toggle(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                isOn
                  ? `${t.bg} text-white ${t.border}`
                  : `bg-transparent ${t.text} ${t.border}`
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 地圖 */}
        <div className="rounded-2xl overflow-hidden border border-border" style={{ minHeight: "480px" }}>
          <MapContainer
            center={[24.80, 121.05]}
            zoom={10}
            style={{ height: "480px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visible.map((v, i) => {
              const theme = themes.find((t) => t.key === v.theme)!;
              const icon = theme.iconUrl ? makeImageIcon(theme.iconUrl) : makeIcon(theme.color);
              return (
                <Marker key={i} position={[v.lat, v.lng]} icon={icon}>
                  <Popup>
                    <div className="text-sm min-w-[180px]">
                      <div className="font-bold mb-1">{v.name}</div>
                      <div className="text-xs" style={{ color: theme.color }}>{v.theme}</div>
                      <div className="text-gray-500 text-xs mt-1">{v.address}</div>
                      {v.phone && <div className="text-gray-500 text-xs">電話：{v.phone}</div>}
                      {v.email && <div className="text-gray-500 text-xs">Email：{v.email}</div>}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* 列表 */}
        <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
          {filtered.map((v, i) => {
            const theme = themes.find((t) => t.key === v.theme)!;
            const isSelected = selected === i;
            return (
              <div
                key={i}
                onClick={() => setSelected(isSelected ? null : i)}
                className={`rounded-xl px-4 py-3 border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? "border-2 bg-card shadow-card-hover"
                    : "bg-card border-border hover:shadow-card-hover"
                }`}
                style={isSelected ? { borderColor: theme.color } : {}}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: theme.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.district}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-12">請選擇至少一個主題</div>
          )}
        </div>
      </div>

      {/* 圖例 */}
      <div className="flex flex-wrap gap-4 mt-4">
        {themes.map((t) => (
          <div key={t.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: t.color }} />
            {t.label}
          </div>
        ))}
      </div>
    </section>
  );
}
