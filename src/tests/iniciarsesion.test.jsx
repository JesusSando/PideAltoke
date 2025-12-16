import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { IniciarSesion } from "../components/iniciarsesion.jsx";

// ---------------- Mocks ----------------

// navegación
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// validar correo
vi.mock("../assets/js/validarcorreo", () => ({
  validarCorreo: vi.fn(() => true),
}));
import { validarCorreo } from "../assets/js/validarcorreo";

// notificación de cambio de usuario
vi.mock("../assets/js/cargo", () => ({
  notificarCambioUsuario: vi.fn(),
}));
import { notificarCambioUsuario } from "../assets/js/cargo";

// UsuarioService
vi.mock("../service/UsuarioService", () => ({
  default: {
    login: vi.fn(),
  },
}));
import UsuarioService from "../service/UsuarioService";

// ---------------- Setup ----------------
beforeEach(() => {
  navigateMock.mockClear();
  UsuarioService.login.mockReset();
  validarCorreo.mockReturnValue(true);
  notificarCambioUsuario.mockClear();

  // mock alert
  vi.spyOn(window, "alert").mockImplementation(() => {});

  // mock localStorage
  vi.spyOn(Storage.prototype, "setItem");
});

// ---------------- Test ----------------
describe("Iniciar Sesión", () => {
  it("login exitoso: guarda datos, notifica y navega según rol USER", async () => {
    UsuarioService.login.mockResolvedValueOnce({
      data: {
        token: "fake-jwt",
        usuario: {
          nombre: "Fabián",
          rol: { nombre: "USER" },
        },
      },
    });

    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    // inputs por type 
    const emailInput = document.querySelector('input[type="email"]');
    const passInput = document.querySelector('input[type="password"]');

    fireEvent.change(emailInput, {
      target: { value: "fabian@test.com" },
    });
    fireEvent.change(passInput, {
      target: { value: "Password1!" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    await waitFor(() => {
      expect(UsuarioService.login).toHaveBeenCalledTimes(1);
    });

    // credenciales correctas
    expect(UsuarioService.login).toHaveBeenCalledWith({
      correo: "fabian@test.com",
      contrasena: "Password1!",
    });

    // efectos secundarios
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "fake-jwt");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "usuario",
      JSON.stringify({
        nombre: "Fabián",
        rol: { nombre: "USER" },
      })
    );

    expect(notificarCambioUsuario).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Bienvenido Fabián");

    // navegación USER
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
