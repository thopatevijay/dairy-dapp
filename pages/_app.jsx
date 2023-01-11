import '../styles/globals.css'
import { UserProvider } from '../common/Provider/UserProvider'
import Navbar from '../common/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <div className="relative min-h-screen">
        <Component {...pageProps} />
      </div>
    </UserProvider>

  )
}

export default MyApp
