-- Criando a tabela Order
CREATE TABLE "Order" (
    "orderId" VARCHAR(50) PRIMARY KEY,
    "value" NUMERIC(15, 2),
    "creationDate" TIMESTAMP
);

-- Criando a tabela Items
CREATE TABLE "Items" (
    "orderId" VARCHAR(50),
    "productId" VARCHAR(50),
    "quantity" INTEGER,
    "price" NUMERIC(15, 2),
    PRIMARY KEY ("orderId", "productId"),
    FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId")
        ON DELETE CASCADE
        ON UPDATE CASCADE
);