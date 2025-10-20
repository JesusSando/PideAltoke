import { describe, it, expect } from "vitest";

const productos = [
  {
    id: 1,
    nombre: "Pizza 4 estaciones",
    descripcion:
      "Pizza clásica con jamón, champiñones, aceitunas y alcachofas en cuatro secciones.",
    precio: 1000,
    img: "../src/assets/images/f1.png",
    categoria: "pizza",
  },
  {
    id: 2,
    nombre: "Haburguesa grande",
    descripcion:
      "Hamburguesa con queso, lechuga, tomate y ketchup.Uno de los mas pedidos",
    precio: 8000,
    img: "../src/assets/images/f2.png",
    categoria: "hamburguesas",
  },
  {
    id: 3,
    nombre: "Napolitana",
    descripcion:
      "La clasica con tomate, aceituna, oregano y alcaparras",
    precio: 5000,
    img: "../src/assets/images/f3.png",
    categoria: "pizza",
  },
  {
    id: 4,
    nombre: "Ñoquis",
    descripcion:
      "Pasta italiana hecha de papas y harina, servida con salsa a elección",
    precio: 7000,
    img: "../src/assets/images/f4.png",
    categoria: "pasta",
  },
  {
    id: 5,
    nombre: "Macarrones con queso",
    descripcion: "Una muy apetecida con macarrones y el queso",
    precio: 7000,
    img: "../src/assets/images/f5.png",
    categoria: "pasta",
  },
  {
    id: 6,
    nombre: "Pizza vegetariana",
    descripcion:
      "Natural y fresco con cebolla, queso, champiñones y pimiento verde",
    precio: 9000,
    img: "../src/assets/images/f6.png",
    categoria: "pizza",
  },
  {
    id: 7,
    nombre: "Hamburguesa de pollo",
    descripcion:
      "Una alternativa ligera con lechuga, tomate, queso y el clasico pollo",
    precio: 10000,
    img: "../src/assets/images/f7.png",
    categoria: "hamburguesas",
  },
  {
    id: 8,
    nombre: "Hamburguesa pollo rostizado",
    descripcion:
      "Una de las mas gutosa con lechuga y tomate. Poco pero mucho",
    precio: 13000,
    img: "../src/assets/images/f8.png",
    categoria: "hamburguesas",
  },
  {
    id: 9,
    nombre: "Pasta tradicional",
    descripcion:
      "Pasta tradicional con salsa de tomate del chef",
    precio: 13000,
    img: "../src/assets/images/f9.png",
    categoria: "pasta",
  },
];

describe("Validación de los productos del menú", () => {
  it("debería haber 9 productos en total", () => {
    expect(productos.length).toBe(9);
  });

  it("cada producto debe tener id, nombre, descripción, precio, imagen y categoría", () => {
    productos.forEach((p) => {
      expect(typeof p.id).toBe("number");
      expect(typeof p.nombre).toBe("string");
      expect(typeof p.descripcion).toBe("string");
      expect(typeof p.precio).toBe("number");
      expect(typeof p.img).toBe("string");
      expect(typeof p.categoria).toBe("string");
    });
  });

  it("ningún producto debe tener precio negativo o 0", () => {
    productos.forEach((p) => {
      expect(p.precio).toBeGreaterThan(0);
    });
  });

  it("todas las categorías deben ser válidas (pizza, hamburguesas o pasta)", () => {
    const categoriasValidas = ["pizza", "hamburguesas", "pasta"];
    productos.forEach((p) => {
      expect(categoriasValidas).toContain(p.categoria);
    });
  });

  it("los IDs deben ser únicos", () => {
    const ids = productos.map((p) => p.id);
    const idsUnicos = new Set(ids);
    expect(idsUnicos.size).toBe(ids.length);
  });
});
