import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getTopSoldProducts } from "../../services/orders.service";
import { Carousel } from "flowbite-react";
import { getProductsWithCategoriesByType } from "../../services/products.service";
import Footer from "../../components/Footer";
import MealAndDrinkCategories from "../../components/MealAndDrinkCategories";

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
    const [groupMealCategories, setGroupMealCategories] = useState<any[]>([]);
    const [groupDrinksCategories, setGroupDrinksCategories] = useState<any[]>(
        []
    );
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    function groupProductsByCategory(products: any[]) {
        return products.reduce((grouped: any, product: any) => {
            const category = product.category_name;
            // Initialize the category group if it doesn't exist
            if (!grouped[category]) {
                grouped[category] = [];
            }
            // Push the product into the appropriate category group
            grouped[category].push(product);
            return grouped;
        }, {});
    }

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

                setGroupMealCategories(groupProductsByCategory(meal_res));
                console.log(groupProductsByCategory(meal_res), "hehe");
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };
        const fetchDrinks = async () => {
            try {
                const drink_res = await getProductsWithCategoriesByType(
                    "drinks"
                );
                setDrinks(drink_res);
                setGroupDrinksCategories(groupProductsByCategory(drink_res));
                groupProductsByCategory(drink_res);
                console.log(groupDrinksCategories, "hehe");
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
                        <h2 className="text-3xl font-bold text-amber-900 uppercase title mb-10">
                            Menu
                        </h2>
                    </div>

                    <MealAndDrinkCategories
                        groupMealCategories={groupMealCategories}
                        groupDrinksCategories={groupDrinksCategories}
                    />
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
