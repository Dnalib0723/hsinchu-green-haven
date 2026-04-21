import { useState } from "react";
import { Leaf } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const offices = [
  {
    name: "良逸空調工程有限公司",
    district: "竹北市",
    address: "新竹縣竹北市福興東路一段328號",
    phone: "03 550 5155",
    lat: 24.817991090794255,
    lng: 121.0237760576708,
  },
  {
    name: "溫媽媽傳統客家菜包",
    district: "橫山鄉",
    address: "新竹縣橫山鄉中正路22號",
    phone: "35849623",
    lat: 24.705636914069622,
    lng: 121.1820051099402,
  },
];

const GreenOfficeMap = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const visibleOffices = selected !== null ? [offices[selected]] : offices;

  return (
    <section id="green-office">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">ESG 綠色辦公</h2>
        <p className="text-muted-foreground mt-1">新竹縣響應 ESG 綠色辦公認證單位，共 {offices.length} 處</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* 地圖 */}
        <div className="rounded-2xl overflow-hidden border border-border" style={{ minHeight: "480px" }}>
          <MapContainer
            center={[24.76, 121.10]}
            zoom={10}
            style={{ height: "480px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visibleOffices.map((o) => (
              <Marker key={o.name} position={[o.lat, o.lng]}>
                <Popup>
                  <div className="text-sm min-w-[180px]">
                    <div className="font-bold mb-1">{o.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{o.address}</div>
                    <div className="text-gray-500 text-xs mt-0.5">電話：{o.phone}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 列表 */}
        <div className="space-y-2">
          {offices.map((o, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={o.name}
                onClick={() => setSelected(isSelected ? null : i)}
                className={`rounded-xl px-4 py-4 border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5 shadow-card-hover"
                    : "bg-card border-border hover:shadow-card-hover"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                }`}>
                  <Leaf size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">{o.name}</div>
                  <div className="text-xs text-muted-foreground">{o.district}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GreenOfficeMap;
