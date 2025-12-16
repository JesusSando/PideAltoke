import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// ✅ OJO: es named export
import { Menu } from "../components/menu.jsx";

// --- Mocks ---
vi.mock("../service/ComidaService", () => ({
  default: {
    getAll: vi.fn(),
  },
}));

vi.mock("../assets/js/agregarCarrito", () => ({
  agregarAlCarrito: vi.fn(),
}));

// Evita que falle por componentes grandes / efectos laterales
vi.mock("../components/barraLateral", () => ({
  default: () => null,
}));

import ComidaService from "../service/ComidaService";
import { agregarAlCarrito } from "../assets/js/agregarCarrito";

beforeEach(() => {
  ComidaService.getAll.mockReset();
  agregarAlCarrito.mockReset();
});

describe("Carrito - agregar producto (Menu)", () => {
  it("al hacer click en 'Pedir' en producto NO complejo, llama agregarAlCarrito(producto)", async () => {
    // Producto NO complejo: tipoComida "bebida" => debe ir directo a agregarAlCarrito
    const productosFake = [
      {
        id: 1,
        nombre: "Coca Cola",
        descripcion: "350ml",
        precio: 1500,
        tipoComida: "bebida",
        oferta: false,
        imagen: null,
      },
    ];

    ComidaService.getAll.mockResolvedValueOnce({ data: productosFake });

    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    // Esperar a que cargue y renderice el producto
    await waitFor(() => {
      expect(screen.getByText("Coca Cola")).toBeInTheDocument();
    });

    // Click en "Pedir"
    fireEvent.click(screen.getByRole("button", { name: /pedir/i }));

    // Verificar que agrega al carrito con el producto correcto
    expect(agregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(agregarAlCarrito).toHaveBeenCalledWith(productosFake[0]);
  });
});
