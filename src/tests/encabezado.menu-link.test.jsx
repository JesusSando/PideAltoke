import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Encabezado } from "../components/encabezado.jsx";

// Mock de cargo: usuario no logeado
vi.mock("../assets/js/cargo", () => ({
  obtenerUsuario: vi.fn(() => null),
  cerrarSesion: vi.fn(),
}));

beforeEach(() => {
  
  vi.restoreAllMocks();
});

describe("Encabezado", () => {
  it("al hacer click en 'Menu' debe dirigir a /pedirMenu", () => {
    render(
      <MemoryRouter>
        <Encabezado />
      </MemoryRouter>
    );

    // Encuentra el link "Menu"
    const menuLink = screen.getByRole("link", { name: /^menu$/i });

    // Verifica que el href sea el correcto
    expect(menuLink).toHaveAttribute("href", "/pedirMenu");
  });
});
