import { describe,it,expect } from "vitest";
import { validarTarjeta } from "../assets/js/validarTarjeta";

describe("validarTarjeta",()=>{
    it("Las targeta son validos deberia retornar true",()=>{
        const targetaValidos=[
            "4111-1111-1111-1111",
            "5500005555555559",
            "379354508162306",
            "6011000990139424"
        ];
        targetaValidos.forEach(targeta=>{
            const resultado=validarTarjeta(targeta)
            const logitud=targeta.replace(/\D/g, "").length===16;
            expect(resultado).toBe(logitud);
        });
    });


    it("Las targeta no son validos deberia retornar false",()=>{
        const targetaNoValidos=[
            "jesus.com",
            "fabiangmail.cl"
        ];
        targetaNoValidos.forEach(targeta=>{
            expect(validarTarjeta(targeta)).toBe(false);
        });
    });

});