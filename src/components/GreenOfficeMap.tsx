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
  { name: "九芎湖環境教育園區",                   district: "新埔鎮", address: "305新竹縣新埔鎮",                                   phone: "",             lat: 24.849606,  lng: 121.090833 },
  { name: "上杉診所",                             district: "竹北市", address: "新竹縣竹北市光明六路東二段60號",                     phone: "",             lat: 24.817813,  lng: 121.030118 },
  { name: "仁光牙醫診所",                         district: "竹北市", address: "新竹縣竹北市博愛街350號",                            phone: "",             lat: 24.835942,  lng: 121.008393 },
  { name: "元森中醫診所",                         district: "竹北市", address: "新竹縣竹北市復興三路二段二號",                       phone: "",             lat: 24.809559,  lng: 121.033850 },
  { name: "內灣彭名師野薑花粽",                   district: "橫山鄉", address: "新竹縣橫山鄉內灣村中正路283號",                     phone: "03-5849623",   lat: 24.705894,  lng: 121.181030 },
  { name: "日安牙醫診所",                         district: "竹北市", address: "新竹縣竹北市政二路南段69號",                         phone: "",             lat: 24.819764,  lng: 121.012839 },
  { name: "好婦眠診所",                           district: "竹北市", address: "新竹縣竹北市嘉豐南路一段143號",                     phone: "",             lat: 24.809181,  lng: 121.033173 },
  { name: "安興中醫診所",                         district: "竹北市", address: "新竹縣竹北市三民路407號",                            phone: "",             lat: 24.834336,  lng: 121.009487 },
  { name: "竹北市竹北社區發展協會",               district: "竹北市", address: "新竹縣竹北市竹北里中山路64號",                      phone: "",             lat: 24.834631,  lng: 121.024325 },
  { name: "竹北悠美診所",                         district: "竹北市", address: "新竹縣竹北市台一路172號",                            phone: "",             lat: 24.820650,  lng: 121.010637 },
  { name: "均豪精密工業股份有限公司",             district: "寶山鄉", address: "308新竹縣寶山鄉創新一路5-1號",                      phone: "",             lat: 24.773990,  lng: 120.999912 },
  { name: "良逸空調工程有限公司",                 district: "竹北市", address: "新竹縣竹北市福興東路一段328號",                     phone: "03-5505155",   lat: 24.817801,  lng: 121.023755 },
  { name: "佰嘉晨命理室",                         district: "新豐鄉", address: "304新竹縣新豐鄉明新街229號",                        phone: "",             lat: 24.863823,  lng: 120.985578 },
  { name: "長鑫廣告有限公司",                     district: "竹北市", address: "新竹縣竹北市三民路102號",                            phone: "",             lat: 24.833378,  lng: 121.016983 },
  { name: "冠泰科技有限公司",                     district: "竹北市", address: "新竹縣竹北市環北路三段85號10樓",                    phone: "",             lat: 24.848735,  lng: 121.001032 },
  { name: "建漢科技股份有限公司",                 district: "新竹市", address: "300新竹市東區園區三路99號",                         phone: "",             lat: 24.771749,  lng: 121.001987 },
  { name: "將文企業有限公司",                     district: "竹北市", address: "302新竹縣竹北市中正東路133號",                      phone: "",             lat: 24.834988,  lng: 121.016671 },
  { name: "敏實科技大學智慧生活應用學院",         district: "芎林鄉", address: "307新竹縣芎林鄉大華路1號",                          phone: "",             lat: 24.778883,  lng: 121.088684 },
  { name: "雪之湖咖啡",                           district: "峨眉鄉", address: "新竹縣峨眉鄉峨眉太平街8巷1-1號",                   phone: "03-5806852",   lat: 24.684187,  lng: 120.988558 },
  { name: "智諭潛能發展心理治療所",               district: "竹北市", address: "新竹縣竹北市科大二街49號",                          phone: "",             lat: 24.821447,  lng: 121.007810 },
  { name: "愛迪亞科技股份有限公司",               district: "竹北市", address: "302新竹縣竹北市中和街62巷25號",                     phone: "",             lat: 24.848108,  lng: 121.012899 },
  { name: "新竹縣牙醫師公會",                     district: "竹北市", address: "302新竹縣竹北市縣政三街136號4號樓之2",              phone: "",             lat: 24.824488,  lng: 121.013821 },
  { name: "新竹縣北埔鄉農會",                     district: "北埔鄉", address: "314新竹縣北埔鄉中正路94號",                         phone: "",             lat: 24.700446,  lng: 121.055152 },
  { name: "新竹縣四謙友愛志工守望相助協會",       district: "湖口鄉", address: "新竹縣湖口鄉明德街296號",                           phone: "",             lat: 24.901760,  lng: 121.038322 },
  { name: "新竹縣立忠孝國民中學",                 district: "新豐鄉", address: "新竹縣新豐鄉孝六街1號",                             phone: "",             lat: 24.879701,  lng: 120.999641 },
  { name: "新竹縣芎林鄉農會信用部",               district: "芎林鄉", address: "307新竹縣芎林鄉竹林路38號",                         phone: "",             lat: 24.750121,  lng: 121.097328 },
  { name: "新竹縣新豐鄉水環境守護協會",           district: "新豐鄉", address: "新竹縣新豐鄉新豐和村5鄰134號",                     phone: "",             lat: 24.927262,  lng: 120.996236 },
  { name: "新竹縣關西鎮坪林國民小學",             district: "關西鎮", address: "306新竹縣關西鎮11鄰11號",                           phone: "",             lat: 24.800560,  lng: 121.140610 },
  { name: "新竹縣關西鎮農會",                     district: "關西鎮", address: "新竹縣關西鎮北山里高橋坑10鄰6號",                  phone: "",             lat: 24.804503,  lng: 121.161108 },
  { name: "溫媽媽傳統客家菜包",                   district: "橫山鄉", address: "新竹縣橫山鄉中正路22號",                            phone: "03-5849623",   lat: 24.705442,  lng: 121.182037 },
  { name: "鳳姊莊園民宿",                         district: "峨眉鄉", address: "315新竹縣峨眉鄉峨眉三峰路8.5k號",                  phone: "",             lat: 24.713406,  lng: 120.995993 },
  { name: "德旺有限公司",                         district: "北埔鄉", address: "314新竹縣北埔鄉仁愛路16巷19號",                     phone: "",             lat: 24.704191,  lng: 121.051316 },
  { name: "摩斯漢堡-台積12P7店",                  district: "新竹市", address: "300新竹市東區園區二路188號",                        phone: "",             lat: 24.770318,  lng: 121.012296 },
  { name: "摩斯漢堡-竹北文興店",                  district: "竹北市", address: "302新竹縣竹北市文興路一段308號",                    phone: "",             lat: 24.809291,  lng: 121.030379 },
  { name: "摩斯漢堡-竹北華興店",                  district: "竹北市", address: "302新竹縣竹北市中正西路21號",                      phone: "",             lat: 24.839945,  lng: 121.002308 },
  { name: "摩斯漢堡-竹北縣政店",                  district: "竹北市", address: "302新竹縣竹北市縣政九路147號",                     phone: "",             lat: 24.828084,  lng: 121.010186 },
  { name: "摩斯漢堡-明新科大店",                  district: "新豐鄉", address: "304新竹縣新豐鄉新興路25號",                         phone: "",             lat: 24.865235,  lng: 120.991845 },
  { name: "摩斯漢堡-高鐵新竹店",                  district: "竹北市", address: "302新竹縣竹北市高鐵七路6號",                        phone: "",             lat: 24.808157,  lng: 121.040139 },
  { name: "摩斯漢堡-湖口服務區店",                district: "湖口鄉", address: "303新竹縣湖口鄉園區街1巷8號",                      phone: "",             lat: 24.857241,  lng: 121.007709 },
  { name: "磐龍石木坊",                           district: "關西鎮", address: "新竹縣關西鎮7鄰3號",                               phone: "03-5872829",   lat: 24.804485,  lng: 121.148128 },
  { name: "優仕診所",                             district: "竹北市", address: "新竹縣竹北市光明六路東一段212號",                  phone: "",             lat: 24.820664,  lng: 121.024650 },
  { name: "擎昊科技股份有限公司",                 district: "竹北市", address: "新竹縣竹北市縣政九路147號5樓",                     phone: "",             lat: 24.828084,  lng: 121.010186 },
  { name: "擎昊資訊整合股份有限公司",             district: "竹北市", address: "新竹縣竹北市縣政九路145號3樓之2",                  phone: "",             lat: 24.827984,  lng: 121.010120 },
  { name: "瀚華診所",                             district: "新豐鄉", address: "新竹縣新豐鄉新市路3號",                             phone: "",             lat: 24.899072,  lng: 120.986752 },
  { name: "FCM炸雞大獅 竹北台元",                 district: "竹北市", address: "302新竹縣竹北市台元一街7號",                        phone: "",             lat: 24.841637,  lng: 121.017713 },
  { name: "MWD麥味登 台積電P7",                   district: "寶山鄉", address: "新竹縣寶山鄉園區二路188號",                        phone: "",             lat: 24.770318,  lng: 121.012296 },
  { name: "MWD麥味登 台積電P4",                   district: "寶山鄉", address: "新竹縣寶山鄉園區路168號",                          phone: "",             lat: 24.770222,  lng: 121.013308 },
  { name: "MWD麥味登 竹北十興",                   district: "竹北市", address: "新竹縣竹北市十興路308號",                          phone: "",             lat: 24.833149,  lng: 121.024086 },
  { name: "MWD麥味登 竹北中醫",                   district: "竹北市", address: "新竹縣竹北市興隆路一段199號B1",                    phone: "",             lat: 24.824256,  lng: 121.001488 },
  { name: "MWD麥味登 竹北六家",                   district: "竹北市", address: "新竹縣竹北市東平里六家一路一段111號",              phone: "",             lat: 24.810092,  lng: 121.027844 },
  { name: "MWD麥味登 竹北民權",                   district: "竹北市", address: "新竹縣竹北市民權街31-1號1樓",                      phone: "",             lat: 24.832758,  lng: 121.012343 },
  { name: "MWD麥味登 竹北幸福",                   district: "竹北市", address: "302新竹縣竹北市福興東路二段161號",                 phone: "",             lat: 24.814158,  lng: 121.029296 },
  { name: "MWD麥味登 竹北莊敬",                   district: "竹北市", address: "新竹縣竹北市莊敬五街112號",                        phone: "",             lat: 24.824273,  lng: 121.027268 },
  { name: "MWD麥味登 竹北勝利",                   district: "竹北市", address: "新竹縣竹北市莊敬北路256號1樓",                     phone: "",             lat: 24.828767,  lng: 121.025981 },
  { name: "MWD麥味登 竹北縣政",                   district: "竹北市", address: "新竹縣竹北市縣政路231號1樓",                       phone: "",             lat: 24.832853,  lng: 121.018547 },
  { name: "MWD麥味登 竹東中興",                   district: "竹東鎮", address: "新竹縣竹東鎮中興路二段430號",                      phone: "",             lat: 24.765232,  lng: 121.058462 },
  { name: "MWD麥味登 竹東幸福",                   district: "竹東鎮", address: "310新竹縣竹東鎮東寧路一段139號",                   phone: "",             lat: 24.725267,  lng: 121.094393 },
  { name: "MWD麥味登 竹東長春",                   district: "竹東鎮", address: "310新竹縣竹東鎮長春路三段250號",                   phone: "",             lat: 24.745128,  lng: 121.082464 },
  { name: "MWD麥味登 竹東信義",                   district: "竹東鎮", address: "新竹縣竹東鎮信義路121號",                          phone: "",             lat: 24.736515,  lng: 121.089649 },
  { name: "MWD麥味登 芎林文山",                   district: "芎林鄉", address: "新竹縣芎林鄉文山路303號",                          phone: "",             lat: 24.774242,  lng: 121.081778 },
  { name: "MWD麥味登 湖口中山",                   district: "湖口鄉", address: "303新竹縣湖口鄉中山二街67號",                      phone: "",             lat: 24.895604,  lng: 121.040580 },
  { name: "MWD麥味登 湖口仁慈",                   district: "湖口鄉", address: "303新竹縣湖口鄉民生街42號",                        phone: "",             lat: 24.901198,  lng: 121.046413 },
  { name: "MWD麥味登 湖口思牛的店",               district: "湖口鄉", address: "303新竹縣湖口鄉中山路422號",                       phone: "",             lat: 24.907411,  lng: 121.048446 },
  { name: "MWD麥味登 湖口新興",                   district: "湖口鄉", address: "新竹縣湖口鄉新興路308號",                          phone: "",             lat: 24.872079,  lng: 120.999439 },
  { name: "MWD麥味登 新竹新埔",                   district: "新埔鎮", address: "305新竹縣新埔鎮仁愛路30號",                        phone: "",             lat: 24.826976,  lng: 121.081001 },
  { name: "MWD麥味登 新豐明新",                   district: "新豐鄉", address: "304新竹縣新豐鄉明一街111號",                       phone: "",             lat: 24.864925,  lng: 120.988985 },
  { name: "MWD麥味登 新豐振興",                   district: "新豐鄉", address: "304新竹縣新豐鄉振興街22號",                        phone: "",             lat: 24.903508,  lng: 120.986719 },
  { name: "MWD麥味登 關西正義",                   district: "關西鎮", address: "306新竹縣關西鎮正義路175號",                       phone: "",             lat: 24.796400,  lng: 121.173076 },
  { name: "MWD麥味登 寶山雙豐店",                 district: "寶山鄉", address: "308新竹縣寶山鄉雙豐路170號",                       phone: "",             lat: 24.767805,  lng: 120.988612 },
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
            center={[24.76, 121.05]}
            zoom={10}
            style={{ height: "480px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visibleOffices.map((o, i) => (
              <Marker key={`${o.name}-${i}`} position={[o.lat, o.lng]}>
                <Popup>
                  <div className="text-sm min-w-[180px]">
                    <div className="font-bold mb-1">{o.name}</div>
                    <div className="text-gray-500 text-xs">{o.district}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{o.address}</div>
                    {o.phone && <div className="text-gray-500 text-xs mt-0.5">電話：{o.phone}</div>}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 列表 */}
        <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
          {offices.map((o, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={`${o.name}-${i}`}
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
