import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import { ProductProps } from "../home";
import { CartContext } from "../../context/CartContext";

export const Product = () => {
  const { addItemCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data);
    };

    getProduct();
  }, [id]);

  const handleAddItem = (product: ProductProps) => {
    toast.success("Pruduto adicionado no carrinho", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF",
      },
    });
    addItemCart(product);
    navigate("/cart");
  };

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        {product && (
          <section className="w-full">
            <div className="flex flex-col lg:flex-row">
              <img
                className="flex-1 w-full max-h-72 object-contain"
                src={product?.cover}
                alt={product?.title}
              />

              <div className="flex-1">
                <p className="font-bold text-2xl mt-4 mb-2">{product?.title}</p>
                <p className="my-4">{product?.description}</p>
                <strong className="text-zinc-700/90 text-xl">
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  onClick={() => handleAddItem(product)}
                  className="bg-zinc-900 p-1 rounded ml-3"
                >
                  <BsCartPlus size={20} color="#fff" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
