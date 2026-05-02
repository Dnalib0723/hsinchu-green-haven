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
  { no: 1,  name: "上坑社區環保志工",                         district: "新豐鄉", address: "新豐鄉上坑村10鄰537-1號",                    features: "7.環境清掃 8.其他",                                                        lat: 24.940174,  lng: 121.022946 },
  { no: 2,  name: "大鄉環保志工隊",                           district: "竹東鎮", address: "新竹縣竹東鎮大鄉里大林路149號",                features: "7.環境清掃",                                                               lat: 24.7293323, lng: 121.088643 },
  { no: 3,  name: "中正社區",                                 district: "湖口鄉", address: "新竹縣湖口鄉中正路121號",                      features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8814458, lng: 121.044977 },
  { no: 4,  name: "北埔南興社區發展協會",                     district: "北埔鄉", address: "新竹縣北埔鄉南興村3鄰公園街16巷7號",            features: "6.環境綠化 7.環境清掃",                                                    lat: 24.6992356, lng: 121.058302 },
  { no: 5,  name: "北埔鄉大隘地區環境保護協會",               district: "北埔鄉", address: "新竹縣北埔鄉南興村城門街26號",                  features: "6.環境綠化 7.環境清掃",                                                    lat: 24.6983952, lng: 121.055281 },
  { no: 6,  name: "四謙友愛志工守望相助協會",                 district: "湖口鄉", address: "新竹縣湖口鄉明德街156號",                       features: "1.環境教育 4.節能減碳 5.綠色生活及消費 6.環境綠化 7.環境清掃",             lat: 24.9045137, lng: 121.040441 },
  { no: 7,  name: "四謙友愛志工守望相助協會",                 district: "竹東鎮", address: "新竹縣竹東鎮五豐街18號",                        features: "1.環境教育 4.節能減碳 5.綠色生活及消費 6.環境綠化 7.環境清掃",             lat: 24.743562,  lng: 121.082282 },
  { no: 8,  name: "石滬文化協會",                             district: "新豐鄉", address: "新竹縣新豐鄉後湖村1鄰後湖子14號",                features: "6.環境綠化 7.環境清掃",                                                    lat: 24.93329,   lng: 120.998153 },
  { no: 9,  name: "竹北市竹北社區發展協會",                   district: "竹北市", address: "竹北市中山路236號",                             features: "1.環境綠化 2.環境清掃 3.資源回收",                                         lat: 24.8371476, lng: 121.017710 },
  { no: 10, name: "竹北市長青環保志工協進會",                 district: "竹北市", address: "新竹縣竹北市中正西路102號",                      features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8402334, lng: 121.002245 },
  { no: 11, name: "竹北市新國社區發展協會",                   district: "竹北市", address: "新竹縣竹北市新國里華興一街160號",                 features: "6.環境綠化 7.環境清掃",                                                    lat: 24.840892,  lng: 121.008200 },
  { no: 12, name: "竹東中山社區發展協會",                     district: "竹東鎮", address: "新竹縣竹東鎮大同路257號",                        features: "7.環境清掃",                                                               lat: 24.7370003, lng: 121.094183 },
  { no: 13, name: "竹東鎮五豐社區發展協會",                   district: "竹東鎮", address: "新竹縣竹東鎮五豐街18號",                         features: "6.環境綠化 7.環境清掃",                                                    lat: 24.743562,  lng: 121.082282 },
  { no: 14, name: "芎林鄉文林社區發展協會",                   district: "芎林鄉", address: "新竹縣芎林鄉文山路327號",                        features: "6.環境綠化 7.環境清掃",                                                    lat: 24.774705,  lng: 121.081372 },
  { no: 15, name: "芎林鄉永興社區發展協會",                   district: "芎林鄉", address: "新竹縣芎林鄉永興村7鄰王爺坑39之3號",             features: "6.環境綠化 7.環境清掃",                                                    lat: 24.746881,  lng: 121.109007 },
  { no: 16, name: "東平社區",                                 district: "竹北市", address: "新竹縣竹北市六家八街287號",                      features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8053527, lng: 121.029060 },
  { no: 17, name: "信義社區",                                 district: "湖口鄉", address: "新竹縣湖口鄉信義村中山二街77巷9號",              features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8952514, lng: 121.040605 },
  { no: 18, name: "埔和社區環保工隊",                         district: "新豐鄉", address: "新竹縣新豐鄉埔和村二鄰埔頭53號",                 features: "7.環境清掃",                                                               lat: 24.925897,  lng: 120.987628 },
  { no: 19, name: "鹿鳴社區",                                 district: "新埔鎮", address: "新竹縣新埔鎮鹿鳴里5鄰35-5號",                   features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8517039, lng: 121.139536 },
  { no: 20, name: "湖口社區發展協會",                         district: "湖口鄉", address: "新竹縣湖口鄉中正路3段159巷96號",                 features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8839667, lng: 121.054503 },
  { no: 21, name: "湖口鄉信勢社區",                           district: "湖口鄉", address: "新竹縣湖口鄉信勢村力行街20號",                   features: "1.環境教育 2.資源回收 3.節能減碳 4.綠色生活及消費 5.環境綠化 6.環境清掃",  lat: 24.9034952, lng: 121.043333 },
  { no: 22, name: "湖口親善",                                 district: "湖口鄉", address: "新竹縣湖口鄉愛勢村中興街195號",                  features: "6.環境綠化 7.環境清掃",                                                    lat: 24.904198,  lng: 121.050294 },
  { no: 23, name: "新竹縣竹東鎮員山社區發展協會",             district: "竹東鎮", address: "新竹縣竹東鎮下員山路255號",                      features: "6.環境綠化 7.環境清掃",                                                    lat: 24.7835227, lng: 121.041159 },
  { no: 24, name: "新竹縣峨嵋社區發展協會",                   district: "峨眉鄉", address: "新竹縣峨眉鄉峨眉街2號",                          features: "6.環境綠化 7.環境清掃",                                                    lat: 24.6887329, lng: 121.021531 },
  { no: 25, name: "新竹縣湖口鄉信勢社區發展協會",             district: "湖口鄉", address: "新竹縣湖口鄉明德街265號",                         features: "1.環境教育 2.資源回收 3.節能減碳 4.綠色生活及消費 5.環境綠化 6.環境清掃",  lat: 24.9017683, lng: 121.037808 },
  { no: 26, name: "新竹縣新豐鄉重興社區發展協會環保志工隊",   district: "新豐鄉", address: "新竹縣新豐鄉明德巷24號",                          features: "1.環境教育 3.資源回收 6.環境綠化 7.環境清掃",                              lat: 24.9014074, lng: 120.987583 },
  { no: 27, name: "新豐社區",                                 district: "新豐鄉", address: "新豐鄉新豐村5鄰152號",                           features: "6.環境綠化 7.環境清掃",                                                    lat: 24.9152288, lng: 120.979028 },
  { no: 28, name: "新豐鄉上坑社區發展協會",                   district: "新豐鄉", address: "新竹縣新豐鄉新豐村5鄰152號",                      features: "6.環境綠化 7.環境清掃",                                                    lat: 24.9152288, lng: 120.979028 },
  { no: 29, name: "新豐鄉水環境守護協會",                     district: "新豐鄉", address: "新竹縣新豐鄉埔和村5鄰134號",                      features: "6.環境綠化 7.環境清掃",                                                    lat: 24.9272619, lng: 120.996236 },
  { no: 30, name: "新豐鄉松柏社區發展協會",                   district: "新豐鄉", address: "新竹縣新豐鄉康樂路一段183巷1號",                  features: "6.環境綠化 7.環境清掃",                                                    lat: 24.8683323, lng: 120.988866 },
  { no: 31, name: "鳳坑社區發展協會",                         district: "新豐鄉", address: "新竹縣新豐鄉鳳坑村5鄰616號",                      features: "1.環境教育 3.資源回收 4.節能減碳 5.綠色生活及消費 6.環境綠化 7.環境清掃",  lat: 24.8912182, lng: 120.967555 },
  { no: 32, name: "橫山社區發展協會",                         district: "橫山鄉", address: "新竹縣橫山鄉洋街128號",                           features: "6.環境綠化 7.環境清掃",                                                    lat: 24.7049169, lng: 121.105902 },
  { no: 33, name: "關西東山社區發展協會",                     district: "關西鎮", address: "新竹縣關西鎮東山里5鄰35之2號",                    features: "6.環境綠化 7.環境清掃",                                                    lat: 24.835045,  lng: 121.177986 },
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
                  <div className="text-sm min-w-[200px]">
                    <div className="font-bold mb-1">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.district}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.address}</div>
                    <div className="mt-1 text-green-700 text-xs">{t.features}</div>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VolunteerMap;
