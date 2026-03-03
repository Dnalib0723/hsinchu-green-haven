import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 修正 Leaflet 預設 icon 路徑問題
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const venues = [
  { name: "新竹縣自然谷環境信託", district: "芎林鄉", type: "森林生態", lat: 24.7432, lng: 121.0891 },
  { name: "金漢柿餅文化園區", district: "新埔鎮", type: "農業文化", lat: 24.8378, lng: 121.0823 },
  { name: "綠世界生態農場", district: "北埔鄉", type: "生態教育", lat: 24.6952, lng: 121.0612 },
  { name: "內灣老街生態步道", district: "橫山鄉", type: "步道導覽", lat: 24.7601, lng: 121.1523 },
  { name: "新豐紅樹林生態區", district: "新豐鄉", type: "濕地生態", lat: 24.9321, lng: 121.0234 },
  { name: "頭前溪生態教育園區", district: "竹北市", type: "河川生態", lat: 24.8393, lng: 121.0045 },
];

const VenueMap = () => {
  return (
    <section id="venues">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">認證環教場域</h2>
        <p className="text-muted-foreground mt-1">探索新竹縣優質環境教育場所</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* 真實地圖 */}
        <div className="rounded-2xl overflow-hidden border border-border min-h-[320px]">
          <MapContainer
            center={[24.78, 121.05]}
            zoom={11}
            style={{ height: "100%", minHeight: "320px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {venues.map((v) => (
              <Marker key={v.name} position={[v.lat, v.lng]}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-bold">{v.name}</div>
                    <div className="text-gray-500">{v.district}・{v.type}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 場域列表 */}
        <div className="space-y-3">
          {venues.map((v) => (
            <div
              key={v.name}
              className="bg-card rounded-xl p-4 border border-border hover:shadow-card-hover transition-all duration-300 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                <MapPin size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground text-sm">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.district}</div>
              </div>
              <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full shrink-0">
                {v.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueMap;
