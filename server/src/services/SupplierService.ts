import axios from 'axios';
const SupplierService = {
 async getSupplierInfo(assetId: string) {
   try {
      // Anfrage an CoinGecko API, um aktuellen Bitcoin-Preis in USD zu holen
     const res = await axios.get(
       'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
     );
     const btcUsd = res.data.bitcoin.usd;  // Preis aus der API-Response extrahieren
     return { btcUsd, supplier: 'CoinGecko' }; // Supplier-Info zurückgeben
   } catch (err) {
     console.error('CoinGecko-Fetch fehlgeschlagen', err); // Falls API-Request fehlschlägt → Fehler loggen und Fallback liefern
     return { btcUsd: null, supplier: 'unbekannt' }; // Null-Wert + "unbekannt" als Supplier
   }
 },
};
export default SupplierService;