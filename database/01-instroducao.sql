CREATE TABLE products (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NULL DEFAULT 'general'
);

-- ADICIONAR UMA NOVA COLUNA
ALTER TABLE products ADD quantity INTEGER NOT NULL;

-- REMOVER UMA COLUNA
ALTER TABLE products DROP COLUMN quantity;

-- RENOMEAR UMA COLUNA
ALTER TABLE products RENAME COLUMN description TO name;

-- RENOMEAR O NOME DA TABELA
ALTER TABLE items RENAME TO products;

-- REMOVER UMA TABELA
DROP TABLE products;

-- INSERIR DADOS NA TABELA
INSERT INTO products (name, price) VALUES ('Mouse', 50);

INSERT INTO
    products (name, price, category)
VALUES (
        'Teclado Mecânico',
        500.50,
        'accessory'
    );

-- SELECIONAR OS REGISTROS
SELECT * FROM products;

-- DEFINIR A ORDEM DE EXIBIÇAO DAS COLUNAS.
SELECT price, name FROM products;

-- ATUALIZAR REGISTROS
UPDATE products
SET
    price = 45.90,
    category = 'accessory'
WHERE
    id = 1;

---------------
INSERT INTO
    products (name, price, category)
VALUES ('Microfone', 550, 'audio');

INSERT INTO
    products (name, price, category)
VALUES ('Webcam', 1200, 'image');

INSERT INTO
    products (name, price, category)
VALUES ('Headset', 800, 'audio');

DELETE FROM products WHERE id = 1;