
import ProductDetails, { Horizontal } from "./ProductDetails";
import Container from "./../../components/Container";
import { products } from "@/utils/products";
import ListRating from "./ListRating";
import moment from "moment";
import { Rating } from "@mui/material";


interface Iparams{
    productId?:string
}
const Product = ({params}:{params:Iparams}) => {
    // console.log("params",params)
    const selectedProduct:any = products.find(product => product.id === params.productId);
    //console.log("selectedProduct",selectedProduct)
    return ( 
        <Container>
            <ProductDetails product={selectedProduct } />
            <div className="flex flex-col mt-20 gap-4">
                <Horizontal />
                <ListRating  product={selectedProduct}/>
                
            </div>
        </Container>
    );
}

export default Product;