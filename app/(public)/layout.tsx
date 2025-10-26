import {Navbar} from "./_components/Navbar";




 export default function HomeLayout ({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

