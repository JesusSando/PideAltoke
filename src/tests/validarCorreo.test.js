import { describe,it,expect } from "vitest";
import { validarCorreo } from "../assets/js/validarcorreo";

describe("validarCorreo",()=>{
    it("Los correos son validos deberia retornar true",()=>{
        const correosValidos=[
            "jesus@gmail.com",
            "fabian@gmail.cl"
        ];
        correosValidos.forEach(correo=>{
            expect(validarCorreo(correo)).toBe(true);
        });
    });


    it("Los correos no son validos deberia retornar false",()=>{
        const correosNoValidos=[
            "jesus.com",
            "fabiangmail.cl"
        ];
        correosNoValidos.forEach(correo=>{
            expect(validarCorreo(correo)).toBe(false);
        });
    });

});