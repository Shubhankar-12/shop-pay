import Header from "@/app/components/header"
import Product from "@/models/product"
import styles from "../../styles/product.module.scss"
import db from "@/utils/db"
import Footer from "@/app/components/footer"
import Category from "@/models/Category"
import SubCategory from "@/models/SubCategory"
import User from "@/models/User"

const productPage = async (context) => {
    const slug = context.params.slug[0]
    const style = context.searchParams.style
    const size = context.searchParams.size || 0
    const productDetails = await fetchProduct(slug, style, size);
    let country = {
        name: "India",
        currency: "INR"
    }
    return (
        <div>
            <Header country={country} />
            <div className={styles.product}>
                <div className={styles.product__container}>
                    <div className={styles.path}>
                        Home / {productDetails.category.name}
                        {productDetails.subCategories.map((sub, i) => (
                            <span key={i}>/{sub.name}</span>
                        ))}
                    </div>
                    <h1>{productDetails.name} </h1>
                </div>
            </div>
            <Footer country={country} />
        </div>
    )
}

const fetchProduct = async (slug, style, size) => {
    await db.connectDb();

    const product = await Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories", model: SubCategory })
        .populate({ path: "reviews.reviewBy", model: User })
        .lean();
    const subProduct = product.subProducts[style];

    let prices = subProduct.sizes
        .map((s) => {
            return s.price;
        })
        .sort((a, b) => {
            return a - b;
        });
    // newProduct
    let newProduct = {
        ...product,
        style,
        images: subProduct.images,
        sizes: subProduct.sizes,
        discount: subProduct.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((p) => {
            return p.color;
        }),
        priceRange: subProduct.discount
            ? `From ₹ ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
                prices[prices.length - 1] -
                prices[prices.length - 1] / subProduct.discount
            ).toFixed(2)}`
            : `From ₹ ${prices[0]} to ${prices[prices.length - 1]}`,
        price:
            subProduct.discount > 0
                ? (
                    subProduct.sizes[size].price -
                    subProduct.sizes[size].price / subProduct.discount
                ).toFixed(2)
                : subProduct.sizes[size].price,
        priceBefore: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
        ratings: [
            {
                percentage: calculatePercentage("5"),
            },
            {
                percentage: calculatePercentage("4"),
            },
            {
                percentage: calculatePercentage("3"),
            },
            {
                percentage: calculatePercentage("2"),
            },
            {
                percentage: calculatePercentage("1"),
            },
        ],
        reviews: product.reviews.reverse(),
        allSizes: product.subProducts
            .map((p) => {
                return p.sizes;
            })
            .flat()
            .sort((a, b) => {
                return a.size - b.size;
            })
            .filter(
                (element, index, array) =>
                    array.findIndex((el2) => el2.size === element.size) === index
            ),
    };

    function calculatePercentage(num) {
        return (
            (product.reviews.reduce((a, review) => {
                return (
                    a +
                    (review.rating == Number(num) || review.rating == Number(num) + 0.5)
                );
            }, 0) *
                100) /
            product.reviews.length
        ).toFixed(1);
    }
    await db.disconnectDb();
    return JSON.parse(JSON.stringify(newProduct))

}

export default productPage;