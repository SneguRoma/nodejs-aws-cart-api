import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { DatabaseService } from 'src/database/database.service';



@Injectable()
export class CartService {
  constructor(private databaseService: DatabaseService) {}
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    
    /* return this.userCarts[ userId ]; */
    const query = `
      SELECT * FROM carts WHERE user_id = $1
    `;
    const values = [userId];
    
    const result = await this.databaseService.query(query, values);
    const items = await this.databaseService.query(
      `SELECT product_id, count FROM cart_items WHERE cart_id = $1`,
      [result.rows[0].id],
    )
    
    return {...result.rows[0], items: items.rows};

  }
  

  async createByUserId(userId: string): Promise<Cart> {
     const id = v4();
    /*const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart as Cart;

    return userCart as Cart; */
    
    const query = `
      INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [id, userId, new Date(), new Date(), 'OPEN'];
    await this.databaseService.query(query);
    return this.findByUserId(userId);

  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart):  Promise<Cart> {
   /*  const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart }; */
    const cart = await this.findOrCreateByUserId(userId);
    await this.databaseService.query('DELETE FROM cart_items WHERE cart_id = $1', [cart.id]);
    for (const item of items) {
      await this.databaseService.query(
        'INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3)',
        [cart.id, item.product.id, item.count]
      );
    }
    await this.databaseService.query(
      'UPDATE carts SET updated_at = $1 WHERE id = $2',
      [new Date(),cart.id]
    );

    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    /* this.userCarts[ userId ] = null; */
    const cart = await this.findByUserId(userId);
    if (cart) {
      await this.databaseService.query('DELETE FROM cart_items WHERE cart_id = $1', [cart.id]);
      await this.databaseService.query('DELETE FROM carts WHERE id = $1', [cart.id]);
    }
  } 

}
