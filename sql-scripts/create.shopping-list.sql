DROP TYPE IF EXISTS grocery;

CREATE TYPE grocery AS ENUM
( 'Main', 'Snack', 'Lunch', 'Breakfast' );

CREATE TABLE
IF NOT EXISTS shopping_list
(
id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
name TEXT NOT NULL,
price NUMERIC(12, 2),
date_added TIMESTAMP default now() NOT NULL,
checked BOOLEAN default false NOT NULL,
category grocery NOT NULL
);