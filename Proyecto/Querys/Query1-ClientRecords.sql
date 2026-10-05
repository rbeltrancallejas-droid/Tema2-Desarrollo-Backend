create table client_records(
 id SERIAL primary key,
 username VARCHAR(100) not null,
 payment_status VARCHAR(50),
 comission_status VARCHAR(50),
 deadline DATE
)