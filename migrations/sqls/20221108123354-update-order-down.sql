/* Replace with your SQL commands */
ALTER TABLE orders
ADD COLUMN productId bigint REFERENCES product(id),
ADD COLUMN quantity int;