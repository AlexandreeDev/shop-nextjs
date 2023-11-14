import { useState } from "react";

import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string | null;
    defaultPriceId: string;
  };
  revalidate: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(amount / 100);
};

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] =
    useState(false);
  async function handleBuyProduct() {
    try {
      setisCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setisCreatingCheckoutSession(false);
      alert("falha ao redirecionar ao checkout!");
    }
  }
  return (
    <>
      <Head>
        <title>{product.name} | Prodcut Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar Agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [{ params: { id: "prod_OyAnX5Az6Xoyzc" } }],
  };
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {
  const productId = params?.id;

  if (!productId) {
    return {
      notFound: true,
    };
  }

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const price = product.default_price as Stripe.Price;

    if (price.billing_scheme === "per_unit" && price.unit_amount !== null) {
      return {
        props: {
          product: {
            defaultPriceId: price.id,
            description: product.description,
            id: product.id,
            imageUrl: product.images?.[0] || "",
            // Make sure to handle the case where images is undefined or an empty array
            name: product.name,
            price: formatCurrency(price.unit_amount),
          },
          revalidate: 60 * 60 * 1,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }

  // Return a default fallback
  return {
    notFound: true,
  };
};
