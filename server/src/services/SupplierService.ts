import axios from 'axios';
const SupplierService = {
 async getSupplierInfo(assetId: string) {
   try {
     const res = await axios.get(
       'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
     );
     const btcUsd = res.data.bitcoin.usd;
     return { btcUsd, supplier: 'CoinGecko' };
   } catch (err) {
     console.error('CoinGecko-Fetch fehlgeschlagen', err);
     return { btcUsd: null, supplier: 'unbekannt' };
   }
 },
};
export default SupplierService;