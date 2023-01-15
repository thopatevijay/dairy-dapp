import '../styles/globals.css'
import { UserProvider, WalletProvider } from '../common/Provider'
import Navbar from '../common/Navbar'
import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <WalletProvider>
        <UserProvider>
          <Navbar />
          <div className="relative min-h-screen">
            <Component {...pageProps} />
          </div>
        </UserProvider>
      </WalletProvider>
    </MetaMaskProvider>
  )
}

export default MyApp
