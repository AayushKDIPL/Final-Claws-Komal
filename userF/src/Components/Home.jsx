import Equipment from "./Equipment"
import Hero from "./Hero"
import Onmatch from "./Onmatch" 
const apiUrl = process.env.REACT_APP_API_URL;

const Home=()=>{
    return(
        <>
           
            <Hero/>
            <Equipment/>
            <Onmatch/>
            
        </>
    )
}
export default Home