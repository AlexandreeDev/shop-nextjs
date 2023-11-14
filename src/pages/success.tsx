import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Product Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>
        <p>
          Parabens pela compra <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name}</strong> chegara em breve.
        </p>
        <Link href="/">Voltar ao catálago</Link>
      </SuccessContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "line_items",
        "line_items.data.price.product",
        "customer_details",
      ],
    });

    if (!session.customer_details || !session.line_items) {
      return {
        props: {},
      };
    }

    const customerName = session.customer_details.name;
    const product = session.line_items.data[0]?.price
      ?.product as Stripe.Product;

    return {
      props: {
        customerName,
        product: {
          imageUrl: product.images[0],
          name: product.name,
        },
      },
    };
  } catch (error) {
    console.error("Error retrieving session:", error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
