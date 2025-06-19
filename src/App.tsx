import './App.css'
import { Suspense } from 'react'
import reactLogo from './assets/react.svg'
import Card from './Card'


export interface AppProps {
  serverData?: any // 替换为你实际的数据类型
}
const App: React.FC<AppProps> = ({ serverData }) => {
  return (
    <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        {serverData.product_name}
        <Suspense fallback={<p>Loading card component...</p>}>
          <Card  />
        </Suspense>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
    </>
  )
}

export default App