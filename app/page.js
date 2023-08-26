
import axios from 'axios'
import Footer from './components/footer'
import Header from './components/header'

export default function Home({ country }) {

  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  let data = await axios
    .get("https://api.ipregistry.co/?key=rjkcr55mf3j78o4i")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(data);
  return {
    props: {
      country: data
    }
  }
}
