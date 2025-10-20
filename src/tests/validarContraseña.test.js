import { describe,it,expect } from "vitest";
import { validarContraseñaSegura } from "../assets/js/validarcorreo";

describe("validarContraseñaSegura",()=>{
    it("Las contraseñas son validos deberia retornar true",()=>{
        const contraseñasValida=[
            "jeSu5***ssssAAA",
            "Fa444Biaaann***aaaAA",
            "Jojijij2222****aa",
            "aaaaBBBBBssusu!!!!223",
            "!!LaMas5egura!!"
        ];
        contraseñasValida.forEach(contraseña=>{
            expect(validarContraseñaSegura(contraseña)).toBe(true);
        });
    });


    it("Las contraseñas no son validos deberia retornar false",()=>{
        const contraseñaNoValido=[
            "jesus",
            "fabiangmail",
            "pepe",
            "1234",
            "contraseña"
        ];
        contraseñaNoValido.forEach(contraseña=>{
            expect(validarContraseñaSegura(contraseña)).toBe(false);
        });
    });

});