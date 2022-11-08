/* Replace with your SQL commands */
CREATE TABLE productOrder (
    id SERIAL PRIMARY KEY,
    productId bigint REFERENCES product(id),
    quantity int,
    orderId bigint  REFERENCES orders(id)
);