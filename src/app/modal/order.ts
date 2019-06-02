import {User} from "./user";

export class Order {
  id: number;
  date: string;
  instruction: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
  users: User;
  isDisabled: boolean;


  /*constructor(id: number, date: string, instruction: string, name: string, price: number, quantity: number, type: string, users: User) {
    this.id = id;
    this.date = date;
    this.instruction = instruction;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
    this.users = users;
  }*/
}
