import axios from 'axios';
import AssetRepository from '../repositories/AssetRepository';
const IoTService = {
 async getLiveData(assetId: string) {
   // Stammdaten holen, um Koordinaten zu bekommen
   const asset = await AssetRepository.findById(assetId);
   const lat = asset?.lat ?? 47.4;   // Fallback: Zürich
   const lon = asset?.lon ?? 8.5;
   try {
     const url = 'https://api.open-meteo.com/v1/forecast';
     const { data } = await axios.get(url, {
       params: {
         latitude:  lat,
         longitude: lon,
         current:   'temperature_2m'
       }
     });
     const temperature = data.current.temperature_2m;
     // Vibration bleibt vorerst Dummy
     return { temperature, vibration: 0.5 };
   } catch (err) {
     console.error('Open-Meteo-Fetch fehlgeschlagen', err);
     return { temperature: null, vibration: 0.5 };
   }
 }
};
export default IoTService;