import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const themes = [
  { key: "環教場域",   label: "環教場域",   color: "#16a34a", bg: "bg-green-600",   border: "border-green-600",   text: "text-green-600" },
  { key: "綠色餐廳",   label: "綠色餐廳",   color: "#ca8a04", bg: "bg-yellow-600",  border: "border-yellow-600",  text: "text-yellow-600" },
  { key: "環保旅館",   label: "環保旅館",   color: "#2563eb", bg: "bg-blue-600",    border: "border-blue-600",    text: "text-blue-600" },
  { key: "環保小學堂", label: "環保小學堂", color: "#9333ea", bg: "bg-purple-600",  border: "border-purple-600",  text: "text-purple-600" },
  { key: "台美生態認證", label: "台美生態認證", color: "#dc2626", bg: "bg-red-600", border: "border-red-600",     text: "text-red-600" },
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

const allVenues = [
  // 環教場域
  { theme: "環教場域" as ThemeKey, district: "新埔鎮", name: "九芎湖環境教育園區",             address: "新竹縣新埔鎮照門里九芎湖埤塘窩",                  phone: "(03)5899606",       email: "sp9@sp9.org.tw",                    lat: 24.850804698354548, lng: 121.10924069291615 },
  { theme: "環教場域" as ThemeKey, district: "竹東鎮", name: "新竹縣竹東頭前溪水質生態治理區", address: "新竹縣竹東鎮沿河街河堤竹林大橋下",                 phone: "(03)5519345#5107",  email: "30011687@hchg.gov.tw",              lat: 24.736281207379765, lng: 121.10056853432795 },
  { theme: "環教場域" as ThemeKey, district: "北埔鄉", name: "南埔黃金水鄉生態農村",           address: "新竹縣北埔鄉南埔村2鄰17號",                       phone: "(03)5805590",       email: "nanpuvillage@gmail.com",            lat: 24.696078549232258, lng: 121.04252382642875 },
  { theme: "環教場域" as ThemeKey, district: "新豐鄉", name: "小叮噹愛地球行動學堂",           address: "新竹縣新豐鄉康和路199號",                         phone: "03-5592132#2173",   email: "buddy@ding-dong.com.tw",            lat: 24.86938875406008,  lng: 120.98037076093105 },
  { theme: "環教場域" as ThemeKey, district: "竹北市", name: "竹北市水資源回收中心",           address: "新竹縣竹北市水防道路五段151號",                    phone: "(03)5566308#220",   email: "chupeiwrc2009@gmail.com",           lat: 24.853433449581143, lng: 120.95605965298029 },
  { theme: "環教場域" as ThemeKey, district: "竹東鎮", name: "竹東水資源回收中心",             address: "新竹縣竹東鎮水資路299號",                         phone: "03-5827959",        email: "a0939267435@gmail.com",             lat: 24.74690741866552,  lng: 121.08467919644765 },
  { theme: "環教場域" as ThemeKey, district: "北埔鄉", name: "寶山第二水庫",                   address: "新竹縣北埔鄉埔尾村埔尾34之8號",                   phone: "03-5805729",        email: "wrabao2.ee@gmail.com",              lat: 24.708368570575175, lng: 121.04534792469926 },
  // 綠色餐廳
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "Herefor",                        address: "新竹縣竹北市科大二街103號",                        phone: "03-6510185",        email: "",                                  lat: 24.820780373189482, lng: 121.00933500000001 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "Piccola Enoteca",                address: "新竹縣竹北市成功二街102號",                        phone: "03-6688313",        email: "",                                  lat: 24.819884767629574, lng: 121.02461079829703 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "川井鐵板燒",                     address: "新竹縣竹北市興隆路三段115號",                      phone: "03-6676588",        email: "",                                  lat: 24.807374070947468, lng: 121.02454143877807 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "一張白紙",                       address: "新竹縣竹北市自強南路151巷7號",                     phone: "0980780315",        email: "",                                  lat: 24.81525123313757,  lng: 121.02470480994268 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "上鼎鐵板燒",                     address: "新竹縣湖口鄉文化路81號",                           phone: "03-5973245",        email: "",                                  lat: 24.871211487788884, lng: 121.01576196946274 },
  { theme: "綠色餐廳" as ThemeKey, district: "湖口鄉", name: "大湖口石頭火鍋城",               address: "新竹縣湖口鄉中山路一段508號",                      phone: "03-5905809",        email: "",                                  lat: 24.89313058734218,  lng: 121.04154770994434 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "不二農產直販所",                 address: "新竹縣竹北市文興路二段382號",                      phone: "0917170201",        email: "",                                  lat: 24.80459020263013,  lng: 121.04329202528406 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "元氣燉品屋",                     address: "新竹縣竹北市縣政二路南段121號",                    phone: "03-5589632",        email: "",                                  lat: 24.818376699183396, lng: 121.0116997811074 },
  { theme: "綠色餐廳" as ThemeKey, district: "竹北市", name: "日嚐美",                         address: "新竹縣竹北市嘉豐二街一段118號",                    phone: "0933337526",        email: "",                                  lat: 24.815584503354685, lng: 121.02848888110736 },
  { theme: "綠色餐廳" as ThemeKey, district: "新豐鄉", name: "水蓮花生態餐廳",                 address: "新竹縣新豐鄉康和路199號",                          phone: "03-5592132#2506",   email: "",                                  lat: 24.869403354973173, lng: 120.97995233693158 },
  // 環保旅館
  { theme: "環保旅館" as ThemeKey, district: "新豐鄉", name: "小叮噹科學遊樂區生活大師會館",   address: "新竹縣新豐鄉松柏村康和路199號",                    phone: "(03)5592132",       email: "",                                  lat: 24.869364419218236, lng: 120.98008108295646 },
  { theme: "環保旅館" as ThemeKey, district: "竹北市", name: "新竹喜來登大飯店",               address: "新竹縣竹北市光明六路東一段265號",                  phone: "",                  email: "",                                  lat: 24.820247058570057, lng: 121.02820219644894 },
  { theme: "環保旅館" as ThemeKey, district: "竹北市", name: "享豪大飯店",                     address: "新竹縣竹北市信義街7號",                            phone: "",                  email: "",                                  lat: 24.836355881974377, lng: 121.0095749811078 },
  { theme: "環保旅館" as ThemeKey, district: "關西鎮", name: "統一渡假村",                     address: "新竹縣關西鎮金山里34號",                           phone: "",                  email: "",                                  lat: 24.767329801302214, lng: 121.21778766946031 },
  { theme: "環保旅館" as ThemeKey, district: "竹北市", name: "新竹安捷國際酒店",               address: "新竹縣竹北市復興三路二段168號14樓",                phone: "",                  email: "",                                  lat: 24.807838731310596, lng: 121.03827800994256 },
  // 環保小學堂
  { theme: "環保小學堂" as ThemeKey, district: "竹東鎮", name: "竹東鎮軟橋社區發展協會",       address: "新竹縣竹東鎮軟橋里1鄰55之2號",                    phone: "03-5102947",        email: "",                                  lat: 24.695838650570547, lng: 121.09783548210893 },
  { theme: "環保小學堂" as ThemeKey, district: "湖口鄉", name: "湖口鄉信勢社區發展協會",       address: "新竹縣湖口鄉信勢村成功路454巷68號",               phone: "",                  email: "",                                  lat: 24.89933903601417,  lng: 121.03443815412179 },
  // 台美生態認證
  { theme: "台美生態認證" as ThemeKey, district: "竹東鎮", name: "二重國小",                   address: "新竹縣竹東鎮光明路32號",                           phone: "03-5822098",        email: "",                                  lat: 24.768190515618326, lng: 121.05825714232918 },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "東興國小",                   address: "新竹縣竹北市嘉豐十一路二段100號",                  phone: "03-5502120",        email: "",                                  lat: 24.804905428528667, lng: 121.03243409991434 },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "中正國小",                   address: "新竹縣竹北市中山路190號",                          phone: "03-5552464",        email: "",                                  lat: 24.83670182558186,  lng: 121.01943107116458 },
  { theme: "台美生態認證" as ThemeKey, district: "竹北市", name: "六家國小",                   address: "新竹縣竹北市嘉興路62號",                           phone: "03-5502624",        email: "",                                  lat: 24.813612482484896, lng: 121.02579245767082 },
  { theme: "台美生態認證" as ThemeKey, district: "橫山鄉", name: "華山國中",                   address: "新竹縣橫山鄉橫山街一段29號",                       phone: "03-5934084",        email: "",                                  lat: 24.717938606315123, lng: 121.10917742883541 },
  { theme: "台美生態認證" as ThemeKey, district: "新豐鄉", name: "福龍國小",                   address: "新竹縣新豐鄉福興村113號",                          phone: "03-5993140",        email: "",                                  lat: 24.930542176192937, lng: 121.03582031349379 },
  { theme: "台美生態認證" as ThemeKey, district: "北埔鄉", name: "大坪國小",                   address: "新竹縣北埔鄉外坪村1鄰外大坪8號",                  phone: "03-5802264",        email: "",                                  lat: 24.675167710718473, lng: 121.0592820576708 },
  { theme: "台美生態認證" as ThemeKey, district: "新豐鄉", name: "新豐國中",                   address: "新竹縣新豐鄉成德街36號",                           phone: "03-5596573",        email: "",                                  lat: 24.90298309771238,  lng: 120.99121755767081 },
  { theme: "台美生態認證" as ThemeKey, district: "竹東鎮", name: "大同國小",                   address: "新竹縣竹東鎮莊敬路111號",                          phone: "03-5961160",        email: "",                                  lat: 24.740450833138247, lng: 121.08843828650623 },
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
              const color = themes.find((t) => t.key === v.theme)!.color;
              return (
                <Marker key={i} position={[v.lat, v.lng]} icon={makeIcon(color)}>
                  <Popup>
                    <div className="text-sm min-w-[180px]">
                      <div className="font-bold mb-1">{v.name}</div>
                      <div className="text-xs" style={{ color }}>{v.theme}</div>
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
