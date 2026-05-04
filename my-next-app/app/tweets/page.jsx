import React from "react";
import { card } from "../../styles/global";
import SingleProductPage from "./[id]/page";

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();

  console.log(data);
  return (
    <div>
      {" "}
      Product Page<h1>{data.title}</h1>
    </div>
  );
}
