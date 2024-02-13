import React from 'react';
import { Rating } from "@mui/material";
import { products } from "./products";
interface ProductReviewsListProps{
    ProductReviews:any
}
const ProductRating: React.FC<ProductReviewsListProps>= ({ProductReviews}) => {
    // const productRating = products.reduce((acc:any, item:any) => acc + (ProductReviews.reduce((sum:any, review:any) => sum + review.rating, 0)/ProductReviews.length) / ProductReviews.length);

    const totalRating = products.reduce((acc, product) => {

        const productRating = ProductReviews.reduce((sum:any, review:any) => sum + review.rating, 0);
        return acc + (productRating / ProductReviews.length);
    }, 0);

    const averageRating = totalRating / products.length;

    return (
        <Rating value={averageRating} readOnly  className='custom-rating-style'/>
    );
};

export default ProductRating;
