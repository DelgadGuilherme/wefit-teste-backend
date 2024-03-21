create table if not exists state (
    id int not null auto_increment,
    name varchar(255) not null,
    abbreviation varchar(255) not null,
    primary key(id)
);

create table if not exists city (
    id int not null auto_increment,
    state_id int not null,
    name varchar(255) not null,
    primary key(id),
    foreign key (state_id) references state(id)
);

create table if not exists street (
    id int not null auto_increment,
    state_id int not null,
    name varchar(255) not null,
    primary key(id),
    foreign key (state_id) references state(id)
);

create table if not exists user (
    id int not null auto_increment,
    street_id int not null,
    name varchar(255) not null,
    phone bigint,
    cell_phone bigint,
    email varchar(255) not null,
    cpf bigint not null,
    cnpj bigint,
    primary key(id),
    foreign key (street_id) references street(id)
);