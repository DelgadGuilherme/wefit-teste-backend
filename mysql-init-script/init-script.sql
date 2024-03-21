create table if not exists state (
    id int not null auto_increment,
    name varchar(255) not null,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    primary key(id)
);

create table if not exists city (
    id int not null auto_increment,
    state_id int not null,
    name varchar(255) not null,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    primary key(id),
    foreign key (state_id) references state(id)
);

create table if not exists street (
    id int not null auto_increment,
    city_id int not null,
    name varchar(255) not null,
    number int,
    complement varchar(255),
    neighborhood varchar(255),
    postal_code varchar(255),
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    primary key(id),
    foreign key (city_id) references city(id)
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
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    primary key(id),
    foreign key (street_id) references street(id)
);