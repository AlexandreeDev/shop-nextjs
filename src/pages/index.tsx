// eslint-disable-next-line import-helpers/order-imports
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    datetime: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <>
      <Head>
        <title>Home | Product Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <time dateTime="2016-10-25" suppressHydrationWarning />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    if (price.billing_scheme === "per_unit" && price.unit_amount !== null)
      return {
        id: product.id,
        imageUrl: product.images[0],
        name: product.name,
        price: new Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(price.unit_amount / 100),
      };
  });
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // a cada 2 horas
  };
};
