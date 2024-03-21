class tables {
    async init(databaseConnector) {
        this.databaseConnector = databaseConnector;

        await this.creatTableState();
        await this.creatTableCity();
        await this.creatTableStreet();
        await this.creatTableUser();
    }

    async creatTableState() {
        const sql = `
            create table if not exists state 
                (id int not null auto_increment,
                name varchar(255) not null,
                abbreviation varchar(255) not null,
                primary key(id))`;

        this.databaseConnector.query(sql, (error) => {
            if(error) {
                console.log("Creation of the state table failed.", error)
            } else {
                console.log("Creation of the state table was successful.")
            }
        })
    }

    async creatTableCity() {
        const sql = `
            create table if not exists city 
                (id int not null auto_increment,
                state_id int not null,
                name varchar(255) not null,
                primary key(id),
                foreign key (state_id) references state(id))`;

        this.databaseConnector.query(sql, (error) => {
            if(error) {
                console.log("Creation of the city table failed.", error)
            } else {
                console.log("Creation of the city table was successful.")
            }
        })
    }

    async creatTableStreet() {
        const sql = `
            create table if not exists street 
                (id int not null auto_increment,
                state_id int not null,
                name varchar(255) not null,
                primary key(id),
                foreign key (state_id) references state(id))`;

        this.databaseConnector.query(sql, (error) => {
            if(error) {
                console.log("Creation of the street table failed.", error)
            } else {
                console.log("Creation of the street table was successful.")
            }
        })
    }

    async creatTableUser() {
        const sql = `
            create table if not exists user 
                (id int not null auto_increment,
                street_id int not null,
                name varchar(255) not null,
                phone bigint,
                cell_phone bigint,
                email varchar(255) not null,
                cpf bigint not null, 
                cnpj bigint,
                primary key(id),
                foreign key (street_id) references street(id))`;

        this.databaseConnector.query(sql, (error) => {
            if(error) {
                console.log("Creation of the user table failed.", error)
            } else {
                console.log("Creation of the user table was successful.")
            }
        })
    }
}

module.exports = new tables();