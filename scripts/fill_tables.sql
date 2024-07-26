CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE carts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  status cart_status NOT NULL
);

CREATE TABLE cart_items (
  cart_id UUID REFERENCES carts(id),
  product_id UUID,
  count INTEGER,
  PRIMARY KEY (cart_id, product_id)
);

select * from cart_items
select * from carts


INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES 
  (gen_random_uuid(), '37f37fa4-e3eb-4195-b984-b6e1e736c4a5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'OPEN'),
  (gen_random_uuid(), gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES 
  ((SELECT id FROM carts LIMIT 1), gen_random_uuid(), 2),
  ((SELECT id FROM carts LIMIT 1), gen_random_uuid(), 1),
  ((SELECT id FROM carts ORDER BY id DESC LIMIT 1), gen_random_uuid(), 3);