create database Mundoverde;

use Mundoverde;

create table produtos(
id int primary key auto_increment, 
descricao varchar(60) not null,
categoria int not null, 
preco float not null,
quantidade int not null, 
url varchar (255)
);

/*
	categoria:
    
    0 = cereais
    1 = suplementos
    2 = temperos 
    */
    insert into produtos values (1, 'granola com castanha 1kg', 0, 40.18, 10, 'cereais.png');
    
	insert into produtos values (2, 'whey protein 907g', 1, 379.20, 10, 'suplementos.png');
    
	insert into produtos values (3, 'alho em po', 2, 5.19, 10, 'temperos.png');
    
    select * from produtos;