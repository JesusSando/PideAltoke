import { describe, it, expect } from "vitest";

const productos = [
  {
    id: 1,
    nombre: "pan de hamburguesas",
    stok: 33,
    fecha_vencimiento: "2025-12-31",
    img: "../src/assets/images/f7.png",
    nombre_modificado: "Jose Perez",
    fecha_modificacion: "2025-06-10",
  },
  {
    id: 2,
    nombre: "queso cheddar",
    stok: 20,
    fecha_vencimiento: "2025-11-30",
    img: "../src/assets/images/f2.png",
    nombre_modificado: "Ana Gomez",
    fecha_modificacion: "2025-06-11",
  },
  {
    id: 3,
    nombre: "pechuga de pollo",
    stok: 15,
    fecha_vencimiento: "2025-12-15",
    img: "../src/assets/images/f8.png",
    nombre_modificado: "Luis Martinez",
    fecha_modificacion: "2025-06-12",
  },
  {
    id: 4,
    nombre: "pasta fettuccine",
    stok: 25,
    fecha_vencimiento: "2025-01-20",
    img: "../src/assets/images/f9.png",
    nombre_modificado: "Maria Lopez",
    fecha_modificacion: "2024-06-13",
  },
];

describe("Validación de productos del inventario", () => {
  it("debería haber 4 productos cargados", () => {
    expect(productos.length).toBe(4);
  });

  it("todos los productos deben tener stock mayor a 0", () => {
    productos.forEach((p) => {
      expect(p.stok).toBeGreaterThan(0);
    });
  });

  it("todos los productos deben tener nombre y fecha de vencimiento", () => {
    productos.forEach((p) => {
      expect(p.nombre).toBeTypeOf("string");
      expect(p.fecha_vencimiento).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("todas las fechas de vencimiento deben ser futuras", () => {
    const hoy = new Date();
    productos.forEach((p) => {
      const fechaVenc = new Date(p.fecha_vencimiento);
      expect(fechaVenc.getTime()).toBeGreaterThan(hoy.getTime());
    });
  });

  it("cada producto debe tener nombre_modificado y fecha_modificacion", () => {
    productos.forEach((p) => {
      expect(p.nombre_modificado).not.toBe("");
      expect(p.fecha_modificacion).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
