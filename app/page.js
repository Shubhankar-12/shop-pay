import axios from 'axios'
import Footer from './components/footer'
import Header from './components/header'
import HomeComponent from './components/home/Home';

export default async function Home() {
  const country = await fetchLocation();
  return (
    <div>
      <Header country={country} />
      <HomeComponent />
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
