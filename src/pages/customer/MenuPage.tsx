import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getTopSoldProducts } from "../../services/orders.service";
import { Carousel } from "flowbite-react";
import { getProductsWithCategoriesByType } from "../../services/products.service";
import Footer from "../../components/Footer";

interface ProductInterface {
    product_id: number;
    product_name: string;
    product_price: string;
    category_id: number;
    product_image: string;
    product_type: string;
    category_name: string;
}

const MenuPage = () => {
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [meals, setMeals] = useState<ProductInterface[]>([]);

    const [drinks, setDrinks] = useState<ProductInterface[]>([]);

    useEffect(() => {
        const fetchTopSoldProducts = async () => {
            try {
                const products = await getTopSoldProducts();
                setTopProducts(products);
                console.log(products);
            } catch (error) {
                console.error("Error fetching top sold products:", error);
            }
        };

        fetchTopSoldProducts();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const meal_res = await getProductsWithCategoriesByType("meal");
                setMeals(meal_res);
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };
        const fetchDrinks = async () => {
            try {
                const drink_res = await getProductsWithCategoriesByType(
                    "drink"
                );
                setDrinks(drink_res);
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };
        fetchMeals();
        fetchDrinks();
    }, []);

    return (
        <main>
            <Navbar />

            {/* Carousel section for top products */}
            {/* <section className="section__top_orders h-[80vh]">
                <div className="container mx-auto flex flex-col justify-center items-center h-full px-1.5">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold text-amber-900 uppercase title">
                            Our Best Sellers
                        </h2>
                    </div>
                    <Carousel className="h-[50%]">
                        {topProducts.map((product: any, index: number) => (
                            <div
                                className="h-full justify-center items-center flex"
                                key={index}
                            >
                                <h1 className="title sm:text-5xl text-2xl">
                                    {product.product_name}
                                </h1>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section> */}
            <section
                className="section__top_orders h-[80vh] bg-fixed bg-center bg-cover mt-[5rem]"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600')`,
                }}
            >
                <div className="container mx-auto flex flex-col justify-center items-center h-full px-1.5">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold text-white uppercase title">
                            Our Best Sellers
                        </h2>
                    </div>
                    <Carousel className="h-[50%]">
                        {topProducts.map((product: any, index: number) => (
                            <div
                                className="h-full justify-center items-center flex"
                                key={index}
                            >
                                <h1 className="title sm:text-5xl text-2xl text-white">
                                    {product.product_name}
                                </h1>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>

            {/* Meals Section */}

            <section className="section__top_orders min-h-[100vh] py-10">
                <div className="container mx-auto h-full px-1.5">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold text-amber-900 uppercase title">
                            Menu
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center mt-10 items-start">
                        <h2 className="text-2xl font-bold text-amber-900 uppercase title">
                            Meal
                        </h2>
                    </div>

                    <div className="meals flex gap-10 py-4 w-full mb-5 overflow-auto">
                        {meals.map((product: any) => (
                            <div
                                key={product.product_id}
                                className="card bg-base-100 border shadow-3xl flex flex-col items-center"
                            >
                                <figure className="rounded-t-md px-3 py-2 h-60 w-60 flex justify-center items-center">
                                    <img
                                        src={product.product_image}
                                        alt={product.product_name}
                                        className="h-[90%] w-[90%] object-center object-contain rounded-full border-2 border-amber-950"
                                    />
                                </figure>
                                <div className="card-body w-full text-white bg-amber-900 px-3 py-3 rounded-b-md flex flex-col justify-center items-center">
                                    <h2 className="card-title title text-xl text-center">
                                        {product.product_name}
                                    </h2>
                                    {/* Uncomment below if you want to include these fields */}
                                    {/* 
                <p className="text-center">{product.category_name}</p>
                <p className="text-center text-base">
                    Php {product.product_price}
                </p> 
                */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center mt-10 items-start">
                        <h2 className="text-2xl font-bold text-amber-900 uppercase title">
                            Drinks
                        </h2>
                    </div>

                    <div className="drinks flex gap-10 py-4 w-full mb-5 overflow-auto">
                        {drinks.map((product: any) => (
                            <div
                                key={product.product_id}
                                className="card bg-base-100 border shadow-3xl flex flex-col items-center"
                            >
                                <figure className="rounded-t-md px-3 py-2 h-60 w-60 flex justify-center items-center">
                                    <img
                                        src={
                                            product.product_image // Replace with your actual default image path
                                        }
                                        alt={product.product_name}
                                        className="h-[90%] w-[90%] object-center object-contain rounded-full border-2 border-amber-950"
                                    />
                                </figure>
                                <div className="card-body w-full text-white bg-amber-900 px-3 py-3 rounded-b-md flex flex-col justify-center items-center">
                                    <h2 className="card-title title text-xl text-center">
                                        {product.product_name}
                                    </h2>
                                    {/* Uncomment below if you want to include these fields */}
                                    {/* 
                <p className="text-center">{product.category_name}</p>
                <p className="text-center text-base">
                    Php {product.product_price}
                </p> 
                */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

//benjiez_wpstaging
// zdK~w3G3m%ZS
//7QZ6ebQhbRTxZa&%

export default MenuPage;
