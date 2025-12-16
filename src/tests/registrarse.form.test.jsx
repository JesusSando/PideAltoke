import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Registrarse from '../components/registrarse.jsx';

// ----------------- Mocks -----------------
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Mock de validaciones (podemos cambiar retornos en cada test)
vi.mock('../assets/js/validarcorreo', () => {
  return {
    validarCorreo: vi.fn(() => true),
    validarContraseñaSegura: vi.fn(() => true),
    validarRut: vi.fn(() => true),
    verificarCorreoExiste: vi.fn(),
  };
});

// Mock del service (es un singleton export default new UsuarioService())
vi.mock('../service/UsuarioService', () => {
  return {
    default: {
      registrar: vi.fn(),
      verificarCorreoExistente: vi.fn(),
    },
  };
});

import UsuarioService from '../service/UsuarioService';
import { validarCorreo, validarContraseñaSegura, validarRut } from '../assets/js/validarcorreo';

function renderRegistro() {
  return render(
    <MemoryRouter>
      <Registrarse />
    </MemoryRouter>
  );
}

function getPasswordInput() {
  // En el componente tiene la clase `contraseña-input`
  const el = document.querySelector('input.contraseña-input');
  if (!el) throw new Error('No se encontró el input de contraseña (.contraseña-input)');
  return el;
}

function fillForm({
  nombre = 'Juan Torres',
  rut = '191231431',
  correo = 'juan@test.com',
  password = 'Password1!',
  comuna = '1',
} = {}) {
  fireEvent.change(screen.getByPlaceholderText('Juan Torres'), {
    target: { value: nombre },
  });

  fireEvent.change(screen.getByPlaceholderText('19.123.143-1'), {
    target: { value: rut },
  });

  fireEvent.change(screen.getByPlaceholderText('ejemplo@ejemplo.com'), {
    target: { value: correo },
  });

  fireEvent.change(getPasswordInput(), { target: { value: password } });

  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: comuna },
  });
}

beforeEach(() => {
  navigateMock.mockClear();

  // Por defecto: todo válido
  validarCorreo.mockReturnValue(true);
  validarContraseñaSegura.mockReturnValue(true);
  validarRut.mockReturnValue(true);

  UsuarioService.verificarCorreoExistente.mockResolvedValue({ data: false });
  UsuarioService.registrar.mockResolvedValue({ data: {} });

  vi.spyOn(window, 'alert').mockImplementation(() => {});
});

// ----------------- Tests -----------------

describe('Formulario Registrarse (7 pruebas unitarias)', () => {
  it('1) Permite alternar la visibilidad de la contraseña (password <-> text)', () => {
    renderRegistro();

    const pwd = getPasswordInput();
    expect(pwd).toHaveAttribute('type', 'password');

    // El icono es un <p> con texto "visibility" / "visibility_off"
    fireEvent.click(screen.getByText('visibility'));
    expect(getPasswordInput()).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByText('visibility_off'));
    expect(getPasswordInput()).toHaveAttribute('type', 'password');
  });

  it('2) Si faltan campos, muestra: "Por favor completa todos los campos."', () => {
    renderRegistro();

    const form = screen.getByRole('button', { name: 'Registrarse' }).closest('form');
    fireEvent.submit(form);

    expect(screen.getByText('Por favor completa todos los campos.')).toBeInTheDocument();
  });

  it('3) Si el correo es inválido, muestra: "Correo inváalido."', () => {
    renderRegistro();
    validarCorreo.mockReturnValue(false);

    fillForm({ correo: 'malcorreo.com' });

    const form = screen.getByRole('button', { name: 'Registrarse' }).closest('form');
    fireEvent.submit(form);

    expect(screen.getByText('Correo inváalido.')).toBeInTheDocument();
  });

  it('4) Si el correo ya existe (API), muestra: "El correo ya esta registrado" y NO llama registrar()', async () => {
    renderRegistro();
    UsuarioService.verificarCorreoExistente.mockResolvedValueOnce({ data: true });

    fillForm();

    const form = screen.getByRole('button', { name: 'Registrarse' }).closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('El correo ya esta registrado')).toBeInTheDocument();
    });

    expect(UsuarioService.registrar).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('5) Si la contraseña es insegura, muestra: "Contraseña insegura."', async () => {
    renderRegistro();
    validarContraseñaSegura.mockReturnValue(false);

    fillForm({ password: '123' });

    const form = screen.getByRole('button', { name: 'Registrarse' }).closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Contraseña insegura.')).toBeInTheDocument();
    });
  });

  it('6) Si el RUT es inválido, muestra: "Rut no valido."', async () => {
    renderRegistro();
    validarRut.mockReturnValue(false);

    fillForm({ rut: '123' });

    const form = screen.getByRole('button', { name: 'Registrarse' }).closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Rut no valido.')).toBeInTheDocument();
    });
  });

  it('7) Registro exitoso: llama a UsuarioService.registrar() y navega a /iniciarsesion', async () => {
    renderRegistro();

    fillForm({
      nombre: 'Juan Torres',
      rut: '191231431',
      correo: 'juan@test.com',
      password: 'Password1!',
      comuna: '1',
    });

    const form = screen.getByRole('button', { name: 'Registrarse' }).closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(UsuarioService.registrar).toHaveBeenCalledTimes(1);
    });

    expect(UsuarioService.registrar).toHaveBeenCalledWith({
      nombre: 'Juan Torres',
      correo: 'juan@test.com',
      contrasena: 'Password1!',
      rut: '191231431',
      comuna: '1',
    });

    expect(window.alert).toHaveBeenCalledWith('Registro completado');
    expect(navigateMock).toHaveBeenCalledWith('/iniciarsesion');
  });
});
