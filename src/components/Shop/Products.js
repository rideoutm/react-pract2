import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy_products = [
  {
    id: "p1",
    price: 6,
    title: "my first book",
    description: "first book i wrote",
  },
  {
    id: "p2",
    price: 6,
    title: "my second book",
    description: "second book i wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_products.map((el) => (
          <ProductItem title={el.title} price={el.price} description={el.description} key={el.id} id={el.id} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
