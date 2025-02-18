import { ProductDTO } from "./ProductDTO";
import { UserDTO } from "./UserDTO";
import { CartDTO } from "./CartDTO";

export class CartRequestDTO {
    userDTO: UserDTO = new UserDTO;
    cartDTO: CartDTO = new CartDTO;
    productDTO: ProductDTO = new ProductDTO;
}
