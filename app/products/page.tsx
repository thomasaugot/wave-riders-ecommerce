"use client";

import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import useFilterByCategory from "@/hooks/useFilterByCategory";
import useFilterByBrand from "@/hooks/useFilterByBrand";
import { useSearchParams } from "next/navigation";
import "./products.scss";
import SearchBar from "@/components/SearchBar/SearchBar";

const Products: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  const {
    searchQuery: categorySearchQuery,
    setSearchQuery: setCategorySearchQuery,
    currentProducts: categoryCurrentProducts,
    totalPages: categoryTotalPages,
    currentPage: categoryCurrentPage,
    handlePageChange: handleCategoryPageChange,
  } = useFilterByCategory();

  const {
    searchQuery: brandSearchQuery,
    setSearchQuery: setBrandSearchQuery,
    currentProducts: brandCurrentProducts,
    totalPages: brandTotalPages,
    currentPage: brandCurrentPage,
    handlePageChange: handleBrandPageChange,
  } = useFilterByBrand();

  const searchQuery = categorySearchQuery || brandSearchQuery;
  const setSearchQuery = (query: string) => {
    setCategorySearchQuery(query);
    setBrandSearchQuery(query);
  };

  const currentProducts = categoryCurrentProducts.length
    ? categoryCurrentProducts
    : brandCurrentProducts;

  const totalPages = Math.max(categoryTotalPages, brandTotalPages);
  const currentPage = categoryCurrentPage || brandCurrentPage;
  const handlePageChange = (page: number) => {
    handleCategoryPageChange(page);
    handleBrandPageChange(page);
  };

  const getTitle = () => {
    if (category && brand) {
      return `All ${category} Products from ${brand}`;
    } else if (category) {
      return `All ${category} Products`;
    } else if (brand) {
      return `All Products from ${brand}`;
    }
    return "All Products";
  };

  return (
    <div className="products-container">
      <h1>{getTitle()}</h1>
      <SearchBar
        onChange={(query) => setSearchQuery(query)}
        placeholder="Search a product, a brand, a sport..."
      />
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
