"use client";

import { useEffect, useState } from "react";
import "../styles/page.scss";
import { getProducts } from "@/services/apiCalls";
import { Carousel } from "@/components/Carousel/Carousel";
import { ShippingInformation } from "@/components/ShippingInformation/ShippingInformation";
import { Product } from "@/types/product";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";
import Loading from "@/components/Loading/Loading";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts: Product[] = await getProducts();
      setProducts(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main className="homepage">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="carousel-container">
            <Carousel />
          </div>
          <section className="shipping-information">
            <ShippingInformation />
          </section>
          <section className="latest-articles">
            {products && <LatestArticles products={products} />}
          </section>
          <section className="brands"></section>
          <section className="clients-opinions"></section>
        </>
      )}
    </main>
  );
}
