CREATE DATABASE operative_systems;

USE operative_systems;

CREATE TABLE Platform (
    platformId INT NOT NULL AUTO_INCREMENT,
    platformName VARCHAR(255) NOT NULL,
    PRIMARY KEY (platformId)
);

CREATE TABLE Product (
    productId INT NOT NULL AUTO_INCREMENT,
    productPlatform INT NOT NULL,
    productName VARCHAR(255) NOT NULL,
    productPrice FLOAT NOT NULL,
    PRIMARY KEY (productId),
    FOREIGN KEY (productPlatform) REFERENCES Platform(platformId)
);

CREATE TABLE Coin (
    coinId INT NOT NULL AUTO_INCREMENT,
    coinPlatform INT NOT NULL,
    coinBalance FLOAT NOT NULL,
    PRIMARY KEY (coinId),
    FOREIGN KEY (coinPlatform) REFERENCES Platform(platformId)
);

CREATE TABLE Purchase (
    purchaseId INT NOT NULL AUTO_INCREMENT,
    purchaseOriginPlatform INT NOT NULL,
    purchaseDestinyPlatform INT NOT NULL,
    purchaseCoinId INT NOT NULL,
    purchaseProduct INT NOT NULL,
    purchaseQuantity INT NOT NULL,
    PRIMARY KEY (purchaseId),
    FOREIGN KEY (purchaseOriginPlatform) REFERENCES Platform(platformId),
    FOREIGN KEY (purchaseDestinyPlatform) REFERENCES Platform(platformId),
    FOREIGN KEY (purchaseCoinId) REFERENCES Coin(coinId),
    FOREIGN KEY (purchaseProduct) REFERENCES Product(productId)
);

INSERT INTO Platform(platformName) VALUES('Pokemon Go');
INSERT INTO Platform(platformName) VALUES('Amazon');
INSERT INTO Platform(platformName) VALUES('Google Play');
INSERT INTO Product(productPlatform, productName, productPrice) VALUES(1, 'Poke-ball', 2.3);
INSERT INTO Product(productPlatform, productName, productPrice) VALUES(1, 'Battle pass', 10);
INSERT INTO Product(productPlatform, productName, productPrice) VALUES(2, 'Gift card', 10);
INSERT INTO Product(productPlatform, productName, productPrice) VALUES(2, 'Pokemon Battle pass', 11);
INSERT INTO Product(productPlatform, productName, productPrice) VALUES(3, 'Gift card', 20);
INSERT INTO Product(productPlatform, productName, productPrice) VALUES(3, 'Pokemon Battle pass', 10.5);
INSERT INTO Coin(coinPlatform, coinBalance) VALUES(1, 300);
INSERT INTO Coin(coinPlatform, coinBalance) VALUES(2, 500);
INSERT INTO Coin(coinPlatform, coinBalance) VALUES(3, 200);
INSERT INTO Coin(coinPlatform, coinBalance) VALUES(1, 134);
INSERT INTO Coin(coinPlatform, coinBalance) VALUES(2, 178);
INSERT INTO Coin(coinPlatform, coinBalance) VALUES(3, 876);

#ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
#flush privileges;