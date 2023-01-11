import '../styles/globals.css'
import { UserProvider } from '../common/Provider/UserProvider'
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>

  )
}

export default MyApp
