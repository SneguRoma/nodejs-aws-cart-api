INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
  (gen_random_uuid(), gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN'),
  (gen_random_uuid(), gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES 
  ((SELECT id FROM carts LIMIT 1), gen_random_uuid(), 2),
  ((SELECT id FROM carts LIMIT 1), gen_random_uuid(), 1),
  ((SELECT id FROM carts ORDER BY id DESC LIMIT 1), gen_random_uuid(), 3);