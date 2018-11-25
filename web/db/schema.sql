DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS optimal;
DROP TABLE IF EXISTS manualWater;
DROP TABLE IF EXISTS plant;

CREATE TABLE user (
	username VARCHAR(50) PRIMARY KEY,
	password VARCHAR(50),
	name VARCHAR(50)
);

CREATE TABLE owner (
	plantID INTEGER PRIMARY KEY AUTOINCREMENT REFERENCES plant(plantID),
	username VARCHAR(50) REFERENCES user(username)
);

CREATE TABLE plant (
	plantID INTEGER PRIMARY KEY,
	plantType VARCHAR(50),
	plantName VARCHAR(50)
);

CREATE TABLE history (
	plantID INTEGER,
	recordDate BIGINT,
	moisture INT,
	humidity INT,
	temp INT,
	PRIMARY KEY(plantID, recordDate)
);

CREATE TABLE optimal (
	plantType VARCHAR(50) PRIMARY KEY,
	optMoisture INT,
	optHumidity INT,
	optTemp INT

);

CREATE TABLE manualWater (
	plantID INTEGER PRIMARY KEY AUTOINCREMENT REFERENCES plant(plantID),
	doWater BOOLEAN
);

-- INSERT Values for DEMO

INSERT INTO user(username, password, name) VALUES ("John", "password", "John");

INSERT INTO owner(plantID, username) VALUES (1, "John");
INSERT INTO owner(plantID, username) VALUES (2, "John");
INSERT INTO owner(plantID, username) VALUES (3, "John");
INSERT INTO owner(plantID, username) VALUES (4, "John");

INSERT INTO plant(plantID, plantType, plantName) VALUES (1, "Succulent", "Hedgehog Aloe");
INSERT INTO plant(plantID, plantType, plantName) VALUES (2, "Succulent", "Snake Plant");
INSERT INTO plant(plantID, plantType, plantName) VALUES (3, "Rose", "Red Rose");
INSERT INTO plant(plantID, plantType, plantName) VALUES (4, "Fern", "Ostrich Fern");

INSERT INTO manualWater(plantID, doWater) VALUES (1, 0);
INSERT INTO manualWater(plantID, doWater) VALUES (2, 0);
INSERT INTO manualWater(plantID, doWater) VALUES (3, 0);
INSERT INTO manualWater(plantID, doWater) VALUES (4, 0);

INSERT INTO history VALUES (1, 200, 3, 4, 10);
INSERT INTO history VALUES (1, 204, 7, 4, 10);
INSERT INTO history VALUES (1, 210, 14, 4, 10);

INSERT INTO optimal(plantType, optMoisture, optHumidity, optTemp) VALUES ("Succulent", 10, 0, 0);
