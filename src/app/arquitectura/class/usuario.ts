export class Usuario{
    userName: string
    password: string
    first_name: string
    last_name: string
    dateAdmission: Date
    dateborn: Date
    email: string
    address: string
    codPostal: string
    idRule: number
    Rule: string

    constructor(){
        this.userName = ""
        this.password = ""
        this.first_name = ""
        this.last_name = ""
        this.dateAdmission = undefined
        this.dateborn = undefined
        this.email = ""
        this.address = ""
        this.codPostal = ""
        this.idRule = 0
        this.Rule = ""
    }
}