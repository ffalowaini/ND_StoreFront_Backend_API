/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    productId bigint REFERENCES product(id),
    quantity int,
    userId bigint  REFERENCES users(id),
    statusId bigint REFERENCES statuses(id)
);