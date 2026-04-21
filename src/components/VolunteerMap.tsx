import { useState } from "react";
import { Users } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const teams = [
  { no: 1,  name: "鳳坑社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉鳳坑村5鄰616號",               count: 64,  lat: 24.9420, lng: 121.0128 },
  { no: 2,  name: "上坑社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉上坑村12鄰531-2號",            count: 34,  lat: 24.9482, lng: 121.0198 },
  { no: 3,  name: "松柏社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉康樂路一段183巷1號",            count: 21,  lat: 24.9335, lng: 121.0265 },
  { no: 4,  name: "重興社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉明德巷24號",                   count: 60,  lat: 24.9280, lng: 121.0220 },
  { no: 5,  name: "埔和社區環保志工隊",           district: "新豐鄉", address: "新竹縣新豐鄉埔和村二鄰埔頂53號",           count: 43,  lat: 24.9360, lng: 121.0155 },
  { no: 6,  name: "新豐鄉水環隊",                 district: "新豐鄉", address: "新竹縣新豐鄉埔和村5鄰134號",               count: 61,  lat: 24.9310, lng: 121.0210 },
  { no: 7,  name: "新豐社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉新豐村15鄰池府路163號",         count: 92,  lat: 24.9258, lng: 121.0305 },
  { no: 8,  name: "福興社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉福興村6鄰圓山子98號",           count: 60,  lat: 24.9405, lng: 121.0088 },
  { no: 9,  name: "石滬文化協會環保志工隊",       district: "新豐鄉", address: "新竹縣新豐鄉後湖村1鄰後湖子14號",           count: 9,   lat: 24.9455, lng: 121.0042 },
  { no: 10, name: "大隘地區環境保護協會",         district: "北埔鄉", address: "新竹縣北埔鄉南興村城門街26號",              count: 58,  lat: 24.6958, lng: 121.0628 },
  { no: 11, name: "埔尾社區發展協會環保志工隊",   district: "北埔鄉", address: "新竹縣北埔鄉埔尾村13鄰42號",               count: 34,  lat: 24.7005, lng: 121.0582 },
  { no: 12, name: "婦女聯盟環保志工隊",           district: "北埔鄉", address: "新竹縣北埔鄉中山路20號",                   count: 72,  lat: 24.6982, lng: 121.0655 },
  { no: 13, name: "南興社區發展協會環保志工隊",   district: "北埔鄉", address: "新竹縣北埔鄉南興村光復街28號1樓",           count: 29,  lat: 24.6925, lng: 121.0702 },
  { no: 14, name: "湖口社區發展協會環保志工隊",   district: "湖口鄉", address: "新竹縣湖口鄉湖口村22鄰八德路2段598巷2弄5號", count: 22, lat: 24.8828, lng: 121.0698 },
  { no: 15, name: "湖南社區發展協會環保志工隊",   district: "湖口鄉", address: "新竹縣湖口鄉湖南村湖新路60巷123號",         count: 30,  lat: 24.8782, lng: 121.0752 },
  { no: 16, name: "四謙友愛守護協會環保志工隊",   district: "湖口鄉", address: "新竹縣湖口鄉明德街156號",                   count: 84,  lat: 24.8855, lng: 121.0675 },
  { no: 17, name: "中正社區發展協會環保志工隊",   district: "湖口鄉", address: "新竹縣湖口鄉中正村9鄰中正路二段121號",      count: 20,  lat: 24.8802, lng: 121.0722 },
  { no: 18, name: "信勢社區發展協會環保志工隊",   district: "湖口鄉", address: "新竹縣湖口鄉信勢村力行街20號",              count: 99,  lat: 24.8762, lng: 121.0782 },
  { no: 19, name: "文林社區發展協會環保志工隊",   district: "芎林鄉", address: "新竹縣芎林鄉文林村9鄰紙寮窩9號",            count: 30,  lat: 24.7622, lng: 121.0785 },
  { no: 20, name: "永興社區發展協會環保志工隊",   district: "芎林鄉", address: "新竹縣永興村富林路1段550巷5號",             count: 39,  lat: 24.7582, lng: 121.0822 },
  { no: 21, name: "東山社區發展協會環保志工隊",   district: "關西鎮", address: "新竹縣關西鎮東山里5鄰湖肚36號之20",         count: 25,  lat: 24.7925, lng: 121.1722 },
  { no: 22, name: "大鄉社區發展協會環保志工隊",   district: "竹東鎮", address: "新竹縣竹東鎮大鄉里大林路149號",             count: 18,  lat: 24.7282, lng: 121.0922 },
  { no: 23, name: "中山社區發展協會環保志工隊",   district: "竹東鎮", address: "新竹縣竹東鎮大同路257號",                   count: 98,  lat: 24.7322, lng: 121.0882 },
  { no: 24, name: "五豐社區發展協會環保志工隊",   district: "竹東鎮", address: "新竹縣竹東鎮五豐街18號",                   count: 28,  lat: 24.7382, lng: 121.0822 },
  { no: 25, name: "員山社區發展協會環保志工隊",   district: "竹東鎮", address: "新竹縣竹東鎮下員山路255號",                 count: 60,  lat: 24.7252, lng: 121.0982 },
  { no: 26, name: "峨嵋社區發展協會環保志工隊",   district: "峨眉鄉", address: "新竹縣峨眉鄉峨眉村峨眉街2-1號",             count: 34,  lat: 24.6722, lng: 121.0422 },
  { no: 27, name: "富興社區發展協會環保志工隊",   district: "峨眉鄉", address: "新竹縣峨眉鄉富興村富農新村33號",             count: 34,  lat: 24.6682, lng: 121.0482 },
  { no: 28, name: "新國社區發展協會環保志工隊",   district: "竹北市", address: "新竹縣竹北市新國里8鄰新光街63巷3號",         count: 57,  lat: 24.8422, lng: 121.0082 },
  { no: 29, name: "竹北長青環保志工",             district: "竹北市", address: "新竹縣竹北市新社里華興街86巷7號",            count: 50,  lat: 24.8382, lng: 121.0122 },
  { no: 30, name: "竹北社區發展協會環保志工隊",   district: "竹北市", address: "新竹縣竹北市竹北里6鄰中山路64號",            count: 58,  lat: 24.8352, lng: 121.0052 },
  { no: 31, name: "采田福地志工協會環保志工隊",   district: "竹北市", address: "新竹縣竹北市新國里中正西路219巷38號",        count: 23,  lat: 24.8402, lng: 121.0022 },
  { no: 32, name: "橫山社區發展協會環保志工隊",   district: "橫山鄉", address: "新竹縣橫山鄉橫山村中豐路1段268號",           count: 108, lat: 24.7622, lng: 121.1482 },
  { no: 33, name: "信義社區發展協會環保志工隊",   district: "湖口鄉", address: "新竹縣湖口鄉信義村中山街77巷9號",            count: 37,  lat: 24.8722, lng: 121.0802 },
  { no: 34, name: "鹿鳴社區發展協會環保志工隊",   district: "新埔鎮", address: "新竹縣新埔鎮田新路600號",                   count: 25,  lat: 24.8382, lng: 121.0822 },
  { no: 35, name: "東平社區發展協會環保志工隊",   district: "竹北市", address: "新竹縣竹北市興隆路三段37巷43號",             count: 22,  lat: 24.8452, lng: 121.0152 },
  { no: 36, name: "中正社區環保志工隊",           district: "湖口鄉", address: "新竹縣湖口鄉中正二路70號",                   count: 32,  lat: 24.8832, lng: 121.0652 },
  { no: 37, name: "新北社區環保志工隊",           district: "新埔鎮", address: "新竹縣新埔鎮新北里6鄰45-3號",               count: 35,  lat: 24.8422, lng: 121.0782 },
];

const VolunteerMap = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const visibleTeams = selected !== null ? [teams[selected]] : teams;

  return (
    <section id="volunteers">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">環保志工隊社區</h2>
        <p className="text-muted-foreground mt-1">115年新竹縣環保志工隊社區名冊，共 {teams.length} 支隊伍</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* 地圖 */}
        <div className="rounded-2xl overflow-hidden border border-border" style={{ minHeight: "480px" }}>
          <MapContainer
            center={[24.80, 121.07]}
            zoom={11}
            style={{ height: "480px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visibleTeams.map((t) => (
              <Marker key={t.no} position={[t.lat, t.lng]}>
                <Popup>
                  <div className="text-sm min-w-[180px]">
                    <div className="font-bold mb-1">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.district}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.address}</div>
                    <div className="mt-1 font-semibold text-green-700">志工人數：{t.count} 人</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 列表 */}
        <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
          {teams.map((t, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={t.no}
                onClick={() => setSelected(isSelected ? null : i)}
                className={`rounded-xl px-4 py-3 border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5 shadow-card-hover"
                    : "bg-card border-border hover:shadow-card-hover"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                }`}>
                  <Users size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.district}</div>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full shrink-0">
                  {t.count} 人
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VolunteerMap;
