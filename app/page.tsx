import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCart from "./components/product/ProductCart";


export default function Home() {
  return (
    <div className="p-8">
    <Container>
      
      <HomeBanner/>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cold-4 xl:grid-cols-5 2xl:grid-col-6 gap-8">
      {products.map((product:any)=>{
        return <div ><ProductCart data={product} /></div>
      })}
      
      </div>
    </Container>
    </div>
  );
}
