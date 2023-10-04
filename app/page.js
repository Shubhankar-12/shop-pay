import axios from 'axios'
import Footer from './components/footer'
import Header from './components/header'
import HomeComponent from './components/home/Home';
import db from '@/utils/db';
import Product from '@/models/product';

export default async function Home() {
  const country = await fetchLocation();
  const products = await fetchProducts();

  return (
    <div>
      <Header country={country} />
      <HomeComponent products={products} />
      <Footer country={country} />
    </div>
  )
}
// SSR
export const fetchLocation = async () => {
  let locationRespone = await axios.get(`https://api.ipregistry.co/?key=${process.env.NEXT_APP_IPREG_KEY}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })

  let country = {
    name: locationRespone.location.country.name,
    flag: locationRespone.location.country.flag.emojitwo,
    currency: locationRespone.currency.code
  }
  return country;
}

export const fetchProducts = async () => {
  await db.connectDb();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  await db.disconnectDb();
  return JSON.parse(JSON.stringify(products));
}