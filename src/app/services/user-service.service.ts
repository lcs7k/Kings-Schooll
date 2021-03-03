import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(
    private http: HttpClient,
    private firedb:AngularFirestore
  ) { }

  pegaCEP(cep: string) {
    var local: string = "https://viacep.com.br/ws/" + cep + "/json";
    return this.http.get<User>(local);
  }

  add(usuario:User){
    return this.firedb.collection<User>("usuarios").add(
      {
        nome : usuario.nome,
        email: usuario.email,
        bairro : usuario.bairro,
        cep: usuario.cep,
        logradouro : usuario.logradouro,
        localidade: usuario.localidade,
        uf: usuario.uf,
        complemento:usuario.complemento,
        numero: usuario.numero,
        senha: usuario.senha,
        erro: usuario.erro
      }
    )
  }

  getAll(){
    return this.firedb.collection<User>("usuarios").valueChanges()
  }
}
