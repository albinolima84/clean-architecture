export default class Cpf {
    
    constructor(readonly value: string){
        if(!this.validate(value)) throw new Error("CPF inválido.");
    }

    private validate (document: string) {
        if (!this.isValid(document)) return false;
        document = this.cleanDocument(document);
        if (this.isSameNumber(document)) return false;
        const firstCheckDigit = this.calculateCheckDigit(document);
        const secondCheckDigit = this.calculateCheckDigit(document + firstCheckDigit);
        const documentCheckDigit = this.extractDocumentDigit(document);
        const completeCheckDigit = `${firstCheckDigit}${secondCheckDigit}`;
        return documentCheckDigit == completeCheckDigit;
    }

    private isValid(document: string) {
        return (document && document.length >= 11 && document.length <= 14);
    }
    
    private cleanDocument(document: string) {
        return document
            .replace('.','')
            .replace('.','')
            .replace('-','')
            .replace(" ","");
    }
    private isSameNumber(document: string) {
        return document.split("").every(c => c === document[0]);
    }

    private calculateCheckDigit(document: string) {
        let digit = 0;
        let sumDigits = 0;
        for (let index = 1; index < document.length -1; index++) {  
            digit = parseInt(document.substring(index -1, index));  							
            sumDigits += (document.length - index) * digit;  
        }
        return this.generateCheckDigit(sumDigits);
    }

    private generateCheckDigit(sumNumbers: number) {
        let rest = sumNumbers % 11;
        return (rest < 2) ? 0 : 11 - rest;
    }

    private extractDocumentDigit(document: string) {
        return document.substring(document.length-2, document.length);
    }
}